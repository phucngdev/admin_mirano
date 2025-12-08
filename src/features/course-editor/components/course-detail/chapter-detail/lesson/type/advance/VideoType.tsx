import { uploadFileToS3 } from '#/api/services/uploadS3';
import BaseCKEditor from '#/shared/components/ckeditor/BaseCKEditor';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import {
  createDocumentVideoLesson,
  deleteDocumentVideoLesson,
  getVideoLesson,
} from '#/src/redux/thunk/video-lesson.thunk';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  FormInstance,
  Input,
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

interface VideoTypeProps {
  form: FormInstance;
  lesson: LessonDetailEntity;
}
const VideoType = ({ form, lesson }: VideoTypeProps) => {
  const dispatch = useAppDispatch();
  const { lessonEdit } = useSelector((state: RootState) => state.lesson);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const fetchData = async () => {
    if (lesson) {
      await dispatch(getVideoLesson(lesson.id));
    }
  };

  useEffect(() => {
    if (lesson) {
      fetchData();
    }
  }, [lesson, dispatch]);

  useEffect(() => {
    if (lessonEdit && lessonEdit.video) {
      form.setFieldsValue({
        videoUrlType: lessonEdit.video.videoUrl,
        descriptionVideo: lessonEdit.video.description,
        allowPreview: lessonEdit.video.allowPreview,
        videoRewindLock: lessonEdit.video.videoRewindLock,
        allowDiscussion: lessonEdit.video.allowDiscussion,
      });
      const fileDocs: UploadFile[] = lessonEdit.video.documents.map(docs => {
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
        if (!lessonEdit || !lessonEdit.video) return;
        const result = await dispatch(
          deleteDocumentVideoLesson({
            id: lessonEdit.video.id,
            data: {
              documentId: id,
            },
          }),
        );
        if (result.payload.statusCode === 200) {
          message.success('Xóa thành công!');
          setFileList(prev => prev.filter(f => f.uid !== id));
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
          name="videoUrlType"
          label="Video url:"
          style={{
            width: '100%',
          }}
          rules={[{ required: true, message: 'Vui lòng nhập video url' }]}
        >
          <Input className="custom-input" placeholder="Video url" />
        </Form.Item>
        <Form.Item
          validateTrigger={['onBlur', 'onChange']}
          name="descriptionVideo"
          label="Mô tả:"
          style={{
            width: '100%',
          }}
          rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
        >
          <BaseCKEditor
            changeData={(value: string) => {
              form.setFieldsValue({ descriptionVideo: value });
            }}
            value={form.getFieldValue('descriptionVideo')}
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
                if (!lessonEdit || !lessonEdit.video) return;
                const typedFile = file as File;
                await dispatch(
                  createDocumentVideoLesson({
                    id: lessonEdit.video.id,
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
      <div className="form-group hidden">
        <div className="form-group_labelbtn">
          <p className="p-title">Thiết lập bài giảng</p>
        </div>
        <div className="toggle">
          <Form.Item
            validateTrigger={['onBlur', 'onChange']}
            name="allowPreview"
            label="Cho phép xem trước"
            style={{ width: '100%', marginBottom: '0px' }}
          >
            <Switch />
          </Form.Item>
          <Form.Item
            validateTrigger={['onBlur', 'onChange']}
            name="videoRewindLock"
            label="Khoá tua video"
            style={{ width: '100%', marginBottom: '0px' }}
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name="allowDiscussion"
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

export default VideoType;
