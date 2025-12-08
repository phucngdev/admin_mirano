import { uploadFileToS3 } from '#/api/services/uploadS3';
import BaseCKEditor from '#/shared/components/ckeditor/BaseCKEditor';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import {
  createDocumentPdfLesson,
  deleteDocumentPdfLesson,
  getPdfLesson,
} from '#/src/redux/thunk/pdf-lesson.thunk';
import {
  InboxOutlined,
  LoadingOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  Button,
  Form,
  FormInstance,
  message,
  Modal,
  Switch,
  Upload,
  UploadFile,
} from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { beforeUploadPdf } from '#/shared/props/beforeUpload';
import { LessonDetailEntity } from '#/api/requests/interfaces/LessonDetailEntity';

const { Dragger } = Upload;

interface PdfTypeProps {
  form: FormInstance;
  lesson: LessonDetailEntity;
}

const PdfType = ({ form, lesson }: PdfTypeProps) => {
  const dispatch = useAppDispatch();
  const { lessonEdit } = useSelector((state: RootState) => state.lesson);
  const [loading, setLoading] = useState<'pdf' | 'docs' | ''>('');
  const [pdfileList, setPdfileList] = useState<UploadFile[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const fetchData = async () => {
    if (lesson) {
      await dispatch(getPdfLesson(lesson.id));
    }
  };

  useEffect(() => {
    if (lesson) {
      fetchData();
    }
  }, [lesson]);

  useEffect(() => {
    if (lessonEdit && lessonEdit.pdfFile) {
      form.setFieldsValue({
        slideUrl: lessonEdit.pdfFile.slideUrl,
        descriptionPdf: lessonEdit.pdfFile.description,
        lockRightClickAndCopy: lessonEdit.pdfFile.lockRightClickAndCopy,
        allowContentDownloads: lessonEdit.pdfFile.allowContentDownloads,
        allowDiscussion: lessonEdit.pdfFile.allowDiscussion,
      });
      setPdfileList([
        {
          uid: '-1',
          name: lessonEdit.pdfFile.slideUrl,
          status: 'done',
          url: lessonEdit.pdfFile.slideUrl,
        },
      ]);
      const fileDocs: UploadFile[] = lessonEdit.pdfFile.documents.map(docs => {
        return {
          uid: docs.id,
          name: docs.name,
          status: 'done',
          url: docs.url,
        };
      });
      setFileList(fileDocs);
    } else {
      setPdfileList([]);
      form.resetFields();
      setFileList([]);
    }
  }, [lessonEdit]);

  const handleDelete = (id: string) => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa tài liệu?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        if (!lessonEdit || !lessonEdit.pdfFile) return;
        const result = await dispatch(
          deleteDocumentPdfLesson({
            id: lessonEdit.pdfFile.id,
            data: {
              documentId: id,
            },
          }),
        );
        if (result.payload.statusCode === 200) {
          message.success('Xóa thành công!');
        } else {
          message.error('Xoá thất bại');
        }
      },
      title: 'Xác nhận xóa',
    });
  };

  return (
    <>
      <div className="form-lesson-video">
        <Form.Item
          validateTrigger={['onBlur', 'onChange']}
          name="slideUrl"
          label="File slide/pdf:"
          style={{
            width: '100%',
          }}
          rules={[{ required: true, message: 'Vui lòng chọn file' }]}
        >
          <Dragger
            fileList={pdfileList}
            listType="picture"
            beforeUpload={beforeUploadPdf}
            customRequest={async ({ file, onSuccess, onError }) => {
              if (!file) return;
              try {
                setLoading('pdf');
                const { publicUrl } = await uploadFileToS3(file as File);
                setPdfileList([
                  {
                    uid: Date.now().toString(),
                    name: (file as File).name,
                    status: 'done',
                    url: publicUrl,
                  },
                ]);
                form.setFieldsValue({
                  slideUrl: publicUrl,
                });
                onSuccess?.({}, new XMLHttpRequest());
              } catch (error) {
                onError?.(error as Error);
                message.error('Tải ảnh lên thất bại');
              } finally {
                setLoading('');
              }
            }}
            onRemove={() => {
              setPdfileList([]);
            }}
          >
            <p className="ant-upload-drag-icon">
              {loading === 'pdf' ? <LoadingOutlined /> : <InboxOutlined />}
            </p>
            <p className="ant-upload-text">Click hoặc kéo thả file</p>
            <p className="ant-upload-hint">Hỗ trợ tải định dạng file .pdf</p>
          </Dragger>
        </Form.Item>

        <Form.Item
          validateTrigger={['onBlur', 'onChange']}
          name="descriptionPdf"
          label="Mô tả:"
          style={{
            width: '100%',
          }}
          rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
        >
          <BaseCKEditor
            changeData={(value: string) => {
              form.setFieldsValue({ descriptionPdf: value });
            }}
            value={form.getFieldValue('descriptionPdf') || ''}
          />
        </Form.Item>
        <div className="document-content">
          <p className="p-title mb-4">Danh sách tài liệu</p>

          <Upload
            beforeUpload={beforeUploadPdf}
            listType="picture"
            fileList={fileList}
            customRequest={async ({ file, onSuccess, onError }) => {
              if (!file) return;
              try {
                setLoading('docs');
                const { publicUrl } = await uploadFileToS3(file as File);
                if (!lessonEdit || !lessonEdit.pdfFile) return;
                const typedFile = file as File;
                await dispatch(
                  createDocumentPdfLesson({
                    id: lessonEdit.pdfFile.id,
                    data: {
                      name: typedFile.name,
                      url: publicUrl,
                    },
                  }),
                );
                onSuccess?.({}, new XMLHttpRequest());
              } catch (error) {
                onError?.(error as Error);
                message.error('Tải ảnh lên thất bại');
              } finally {
                setLoading('');
              }
            }}
            onRemove={file => {
              handleDelete(file.uid);
              return true;
            }}
          >
            <Button
              icon={
                loading === 'docs' ? <LoadingOutlined /> : <UploadOutlined />
              }
            >
              Thêm tài liệu
            </Button>
          </Upload>
        </div>
      </div>
      <div className="form-group">
        <div className="toggle">
          <Form.Item
            validateTrigger={['onBlur', 'onChange']}
            name="lockRightClickAndCopyPdf"
            label="Khoá nhấp chuột phải và sao chép"
            style={{ width: '100%', marginBottom: '0px' }}
            hidden
          >
            <Switch />
          </Form.Item>
          <Form.Item
            validateTrigger={['onBlur', 'onChange']}
            name="allowContentDownloadsPdf"
            label="cho phép tải xuống nội dung"
            style={{ width: '100%', marginBottom: '0px' }}
            hidden
          >
            <Switch />
          </Form.Item>
          <Form.Item
            hidden
            name="allowDiscussionPdf"
            valuePropName="checked"
            label="Cho phép thảo luận"
            style={{ width: '100%', marginBottom: '-25px' }}
          >
            <Switch />
          </Form.Item>
        </div>
      </div>
    </>
  );
};

export default PdfType;
