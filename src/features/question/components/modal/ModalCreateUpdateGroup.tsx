import { RootState, useAppDispatch } from '#/src/redux/store/store';
import {
  createQuestionGroup,
  deleteQuestionGroup,
  updateQuestionGroup,
} from '#/src/redux/thunk/question-group.thunk';
import {
  CloseOutlined,
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Upload,
  UploadFile,
} from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { uploadFileToS3 } from '#/api/services/uploadS3';
import {
  beforeUploadAudio,
  beforeUploadImage,
} from '#/shared/props/beforeUpload';
import { QuestionGroupEntity } from '#/api/requests';
import BaseCKEditor from '#/shared/components/ckeditor/BaseCKEditor';
import PreviewGroupQuestion from '../preview/PreviewGroupQuestion';

interface ModalCreateProps {
  open: boolean;
  onClose: () => void;
  itemUpdate?: QuestionGroupEntity | null;
}

const ModalCreateUpdateGroup = ({
  open,
  onClose,
  itemUpdate,
}: ModalCreateProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [audioFileList, setAudioFileList] = useState<UploadFile[]>([]);
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState<'image' | 'audio' | ''>('');

  useEffect(() => {
    if (itemUpdate) {
      form.setFieldsValue({
        content: itemUpdate.content,
        tag: itemUpdate.tag,
        audioUrl: itemUpdate.audioUrl,
        imageUrl: itemUpdate.imageUrl,
      });
      if (itemUpdate.questions && itemUpdate.questions?.length) {
        form.setFieldValue('questions', itemUpdate.questions);
      }
      if (itemUpdate.audioUrl) {
        setAudioFileList([
          {
            uid: '-2',
            name: itemUpdate.audioUrl,
            status: 'done',
            url: itemUpdate.audioUrl,
          },
        ]);
      }
      if (itemUpdate.imageUrl) {
        setImageFileList([
          {
            uid: '-1',
            name: itemUpdate.imageUrl,
            status: 'done',
            url: itemUpdate.imageUrl,
          },
        ]);
      }
    } else {
      form.resetFields();
      setAudioFileList([]);
      setImageFileList([]);
    }
  }, [itemUpdate, open]);

  const handleUpdate = async () => {
    if (!itemUpdate) return;
    const values = await form.validateFields();

    const result = await dispatch(
      updateQuestionGroup({
        id: itemUpdate.id,
        data: { ...values },
      }),
    );
    if (result.payload.statusCode === 200) {
      message.success('Cập nhật thành công');
      onClose();
    } else {
      message.error('Cập nhật thất bại');
    }
  };

  const handleCreate = async () => {
    const values = await form.validateFields();
    const result = await dispatch(createQuestionGroup(values));
    if (result.payload.statusCode === 201) {
      message.success('Thêm thành công');
      onClose();
    } else {
      message.error('Lỗi khi thêm mới');
    }
  };

  const handleSubmit = async () => {
    if (itemUpdate) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  const handleDelete = async () => {
    if (!itemUpdate) return;
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa nhóm câu hỏi?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        const result = await dispatch(deleteQuestionGroup(itemUpdate.id));
        if (result.payload.statusCode === 200) {
          message.success('Xoá thành công');
          onClose();
        } else {
          message.error('Xoá thất bại');
        }
      },
      title: 'Xác nhận xóa',
    });
  };

  const handleClose = () => {
    form.resetFields();
    setAudioFileList([]);
    setImageFileList([]);
    onClose();
  };

  return (
    <Modal
      closeIcon={<CloseOutlined />}
      className="modal-create-update-vocabulary"
      footer={[
        itemUpdate && (
          <Button key="delete" danger onClick={handleDelete}>
            Xoá
          </Button>
        ),
        <Button key="cancel" onClick={handleClose}>
          Hủy
        </Button>,
        <Button key="submit" onClick={handleSubmit} type="primary">
          {itemUpdate ? 'Lưu thay đổi' : 'Lưu nhóm câu hỏi'}
        </Button>,
      ]}
      onCancel={handleClose}
      open={open}
      style={{ top: 20 }}
      title={
        <span
          style={{
            color: 'rgba(16, 24, 40, 1)',
            fontSize: '30px',
            fontWeight: '500',
          }}
        >
          {itemUpdate ? 'Chỉnh sửa nhóm câu hỏi' : 'Thêm nhóm câu hỏi'}
        </span>
      }
      width={1000}
    >
      {/* <PreviewGroupQuestion form={form} /> */}

      <Form
        form={form}
        layout="vertical"
        validateTrigger={['onBlur', 'onSubmit']}
      >
        <Form.Item
          name="questions"
          style={{ width: '100%' }}
          hidden
        ></Form.Item>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              name="imageUrl"
              label="Ảnh nhóm câu hỏi:"
              style={{ width: '100%' }}
            >
              <Upload
                listType="picture-card"
                fileList={imageFileList}
                beforeUpload={beforeUploadImage}
                customRequest={async ({ file, onSuccess, onError }) => {
                  if (!file) return;
                  try {
                    setLoading('image');
                    const { publicUrl } = await uploadFileToS3(file as File);
                    setImageFileList([
                      {
                        uid: Date.now().toString(),
                        name: (file as File).name,
                        status: 'done',
                        url: publicUrl,
                      },
                    ]);
                    form.setFieldsValue({ imageUrl: publicUrl });
                    onSuccess?.({}, new XMLHttpRequest());
                  } catch (error) {
                    onError?.(error as Error);
                    message.error('Tải ảnh lên thất bại');
                  } finally {
                    setLoading('');
                  }
                }}
                onRemove={() => {
                  setImageFileList([]);
                }}
              >
                {imageFileList.length < 1 && (
                  <button
                    style={{ border: 0, background: 'none' }}
                    type="button"
                  >
                    {loading === 'image' ? (
                      <LoadingOutlined />
                    ) : (
                      <PlusOutlined />
                    )}
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </button>
                )}
              </Upload>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="audioUrl"
              label="Audio nhóm câu hỏi:"
              style={{ width: '100%' }}
            >
              <Upload
                fileList={audioFileList}
                listType="picture"
                beforeUpload={beforeUploadAudio}
                customRequest={async ({ file, onSuccess }) => {
                  if (!file) return;
                  try {
                    setLoading('audio');
                    const { publicUrl } = await uploadFileToS3(file as File);
                    setAudioFileList([
                      {
                        uid: Date.now().toString(),
                        name: (file as File).name,
                        status: 'done',
                        url: publicUrl,
                      },
                    ]);
                    form.setFieldsValue({ audioUrl: publicUrl });
                    onSuccess?.({}, new XMLHttpRequest());
                  } catch (error) {
                    message.error('Tải file lên thất bại');
                  } finally {
                    setLoading('');
                  }
                }}
                onRemove={() => {
                  setAudioFileList([]);
                }}
                showUploadList={{
                  showPreviewIcon: false,
                  showRemoveIcon: true,
                }}
              >
                <Button
                  icon={
                    loading === 'audio' ? (
                      <LoadingOutlined />
                    ) : (
                      <UploadOutlined />
                    )
                  }
                >
                  Tải audio lên
                </Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="tag" label="Tag:" style={{ width: '100%' }}>
              <Input className="custom-input" placeholder="Tag" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="content"
          label="Nội dung câu hỏi:"
          style={{ width: '100%' }}
          // rules={[{ required: true, message: 'Vui lòng nhập câu hỏi' }]}
        >
          <BaseCKEditor
            changeData={(value: string) => {
              form.setFieldsValue({ content: value });
            }}
            value={form.getFieldValue('content')}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCreateUpdateGroup;
