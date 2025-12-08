import { uploadFileToS3 } from '#/api/services/uploadS3';
import BaseCKEditor from '#/shared/components/ckeditor/BaseCKEditor';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import {
  createDocumentTextLesson,
  deleteDocumentTextLesson,
  getTextLesson,
} from '#/src/redux/thunk/text-lesson.thunk';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  FormInstance,
  message,
  Modal,
  Upload,
  UploadFile,
} from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { beforeUploadPdf } from '#/shared/props/beforeUpload';
import { LessonDetailEntity } from '#/api/requests/interfaces/LessonDetailEntity';

interface TextTypeProps {
  form: FormInstance;
  lesson: LessonDetailEntity;
}

const TextType = ({ form, lesson }: TextTypeProps) => {
  const dispatch = useAppDispatch();
  const { lessonEdit } = useSelector((state: RootState) => state.lesson);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const fetchData = async () => {
    await dispatch(getTextLesson(lesson.id));
  };

  useEffect(() => {
    if (lesson) {
      fetchData();
    }
  }, [lesson]);

  useEffect(() => {
    if (lessonEdit && lessonEdit.text) {
      form.setFieldsValue({
        contentText: lessonEdit.text?.content,
        descriptionText: lessonEdit.text?.description,
      });
      const fileDocs: UploadFile[] = lessonEdit.text.documents.map(docs => {
        return {
          uid: docs.id,
          name: docs.name,
          status: 'done',
          url: docs.url,
        };
      });
      setFileList(fileDocs);
    } else {
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
        if (!lessonEdit || !lessonEdit.text) return;
        const result = await dispatch(
          deleteDocumentTextLesson({
            id: lessonEdit.text.id,
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
          name="contentText"
          label="Nội dung:"
          style={{
            width: '100%',
          }}
          rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
        >
          <BaseCKEditor
            changeData={(value: string) => {
              form.setFieldsValue({ contentText: value });
            }}
            value={form.getFieldValue('contentText')}
          />
        </Form.Item>
        <Form.Item
          validateTrigger={['onBlur', 'onChange']}
          name="descriptionText"
          label="Mô tả:"
          style={{
            width: '100%',
          }}
          rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
        >
          <BaseCKEditor
            changeData={(value: string) => {
              form.setFieldsValue({ descriptionText: value });
            }}
            value={form.getFieldValue('descriptionText')}
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
                setLoading(true);
                const { publicUrl } = await uploadFileToS3(file as File);
                if (!lessonEdit || !lessonEdit.text) return;
                const typedFile = file as File;
                await dispatch(
                  createDocumentTextLesson({
                    id: lessonEdit.text.id,
                    data: {
                      name: typedFile.name || publicUrl,
                      url: publicUrl,
                    },
                  }),
                );
                onSuccess?.({}, new XMLHttpRequest());
              } catch (error) {
                onError?.(error as Error);
                message.error('Tải ảnh lên thất bại');
              } finally {
                setLoading(false);
              }
            }}
            onRemove={file => {
              handleDelete(file.uid);
              return true;
            }}
          >
            <Button icon={loading ? <LoadingOutlined /> : <UploadOutlined />}>
              Thêm tài liệu
            </Button>
          </Upload>
        </div>
      </div>
    </>
  );
};

export default TextType;
