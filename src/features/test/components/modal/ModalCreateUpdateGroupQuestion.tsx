import BaseCKEditor from '#/shared/components/ckeditor/BaseCKEditor';
import { useAppDispatch } from '#/src/redux/store/store';
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
  message,
  Modal,
  Row,
  Upload,
  UploadFile,
} from 'antd';
import { useEffect, useState } from 'react';
import { uploadFileToS3 } from '#/api/services/uploadS3';
import {
  beforeUploadAudio,
  beforeUploadImage,
} from '#/shared/props/beforeUpload';
import { QuestionGroupEntity } from '#/api/requests';

interface ModalCreateProps {
  open: boolean;
  testDetailId: string | undefined;
  onClose: () => void;
  itemUpdate?: QuestionGroupEntity | null;
}

const ModalCreateUpdateGroupQuestion = ({
  open,
  onClose,
  itemUpdate,
  testDetailId,
}: ModalCreateProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [audioFileList, setAudioFileList] = useState<UploadFile[]>([]);
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (itemUpdate) {
        form.setFieldsValue({
          content: itemUpdate.content,
          audioUrl: itemUpdate.audioUrl,
          imageUrl: itemUpdate.imageUrl,
        });
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
              name: 'image.png',
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
    }
  }, [itemUpdate, open]);

  const handleUpdate = async () => {
    if (!itemUpdate) return;
    const values = await form.validateFields();
    setLoading(true);
    // const result = await dispatch(
    //   updateQuestionGroup({
    //     id: itemUpdate.id,
    //     data: {
    //       content: values.content,
    //       audioUrl: values.audioUrl,
    //       imageUrl: values.imageUrl,
    //       pos: itemUpdate.pos,
    //       type: QuestionGroupEntity.type.TEST_DETAIL,
    //     },
    //   }),
    // );
    // setLoading(false);
    // if (result.payload.statusCode === 200) {
    //   message.success('Cập nhật thành công');
    //   onClose();
    // } else {
    //   message.error('Cập nhật thất bại');
    // }
  };

  const handleCreate = async () => {
    if (!testDetailId) return;
    const values = await form.validateFields();
    setLoading(true);
    // const result = await dispatch(
    //   createQuestionGroup({
    //     content: values.content,
    //     imageUrl: values.imageUrl,
    //     audioUrl: values.audioUrl,
    //     testDetailId: testDetailId,
    //     type: QuestionGroupEntity.QuestionGroupType.TEST_DETAIL,
    //   }),
    // );
    // setLoading(false);
    // if (result.payload.statusCode === 201) {
    //   message.success('Thêm thành công');
    //   onClose();
    // } else {
    //   message.error('Lỗi khi thêm mới');
    // }
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
        // const result = await dispatch(deleteQuestionGroup(itemUpdate.id));
        // if (result.payload.statusCode === 200) {
        //   message.success('Xoá thành công');
        //   onClose();
        // } else {
        //   message.error('Xoá thất bại');
        // }
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
      <Form
        form={form}
        layout="vertical"
        validateTrigger={['onBlur', 'onSubmit']}
      >
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
                  setLoading(true);
                  try {
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
                    setLoading(false);
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
                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
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
                beforeUpload={beforeUploadAudio}
                customRequest={async ({ file, onSuccess }) => {
                  if (!file) return;
                  try {
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
                    console.log('🚀 ~ customRequest={ ~ error:', error);
                    message.error('Tải file lên thất bại');
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
                <Button icon={<UploadOutlined />}>Tải audio lên</Button>
              </Upload>
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

export default ModalCreateUpdateGroupQuestion;
