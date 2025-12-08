import { useAppDispatch } from '#/src/redux/store/store';
import {
  createVocabLesson,
  deleteVocabLesson,
  updateVocabLesson,
} from '#/src/redux/thunk/vocab-lesson.thunk';
import {
  CloseOutlined,
  LoadingOutlined,
  PlusOutlined,
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
import { uploadFileToS3 } from '#/api/services/uploadS3';
import { beforeUploadImage } from '#/shared/props/beforeUpload';
import { CourseVocabEntity } from '#/api/requests';

interface ModalCreateProps {
  open: boolean;
  onClose: () => void;
  itemUpdate?: CourseVocabEntity | null;
  lessonId: string;
}
const ModalCreateUpdateVocabulary = ({
  open,
  onClose,
  itemUpdate,
  lessonId,
}: ModalCreateProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (itemUpdate) {
      form.setFieldsValue({
        imageUrl: itemUpdate.imageUrl,
        originText: itemUpdate.originText,
        mean: itemUpdate.mean,
        kanji: itemUpdate.kanji,
        sinoVietNamese: itemUpdate.sinoVietNamese,
        example: itemUpdate.example,
      });
      setFileList([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: itemUpdate.imageUrl,
        },
      ]);
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [itemUpdate, open]);

  const handleClose = () => {
    onClose();
  };

  const handleDelete = async () => {
    if (!itemUpdate) return;
    const result = await dispatch(deleteVocabLesson(itemUpdate.id));
    if (result.payload.statusCode === 200) {
      message.success('Xoá thành công');
      onClose();
      form.resetFields();
    } else {
      message.error('Xoá thất bại');
    }
  };

  const handleUpdate = async () => {
    if (!itemUpdate) return;
    const values = await form.validateFields();
    const result = await dispatch(
      updateVocabLesson({
        id: itemUpdate.id,
        data: {
          ...values,
          pos: itemUpdate.pos,
        },
      }),
    );
    if (result.payload.statusCode === 200) {
      message.success('Chỉnh sửa thành công');
      onClose();
      form.resetFields();
    } else {
      message.error('Chỉnh sửa thất bại');
    }
  };

  const handleCreate = async () => {
    const values = await form.validateFields();
    const result = await dispatch(
      createVocabLesson({
        ...values,
        lessonId: lessonId,
      }),
    );
    if (result.payload.statusCode === 201) {
      message.success('Thêm thành công');
      onClose();
      form.resetFields();
    } else {
      message.error('Thêm thất bại');
    }
  };

  const handleSubmit = async () => {
    if (itemUpdate) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  return (
    <>
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
            Lưu từ vựng
          </Button>,
        ]}
        onCancel={handleClose}
        open={open}
        style={{ top: 20 }}
        title={
          <>
            <span
              style={{
                color: 'rgba(16, 24, 40, 1)',
                fontSize: '30px',
                fontWeight: '500',
              }}
            >
              {itemUpdate ? 'Chỉnh sửa từ vựng' : 'Thêm từ vựng'}
            </span>
          </>
        }
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          validateTrigger={['onBlur', 'onSubmit']}
        >
          <Form.Item
            validateTrigger={['onBlur', 'onChange']}
            name="imageUrl"
            label="Ảnh:"
            style={{
              width: '100%',
            }}
            rules={[{ required: true, message: 'Vui lòng cung cấp ảnh' }]}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              beforeUpload={beforeUploadImage}
              customRequest={async ({ file, onSuccess, onError }) => {
                if (!file) return;
                setLoading(true);
                try {
                  const { publicUrl } = await uploadFileToS3(file as File);
                  setFileList([
                    {
                      uid: Date.now().toString(),
                      name: (file as File).name,
                      status: 'done',
                      url: publicUrl,
                    },
                  ]);
                  form.setFieldValue('imageUrl', publicUrl);
                  onSuccess?.({}, new XMLHttpRequest());
                } catch (error) {
                  onError?.(error as Error);
                  message.error('Tải ảnh lên thất bại');
                } finally {
                  setLoading(false);
                }
              }}
              onRemove={() => {
                form.setFieldsValue({ descriptionImageUrl: '' });
                setFileList([]);
              }}
            >
              {fileList.length < 1 && (
                <button style={{ border: 0, background: 'none' }} type="button">
                  {loading ? <LoadingOutlined /> : <PlusOutlined />}
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              )}
            </Upload>
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                validateTrigger={['onBlur', 'onChange']}
                name="originText"
                label="Từ vựng:"
                style={{
                  width: '100%',
                }}
                rules={[{ required: true, message: 'Vui lòng nhập từ vựng' }]}
              >
                <Input
                  className="custom-input"
                  placeholder="Từ vựng"
                  name="originText"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                validateTrigger={['onBlur', 'onChange']}
                name="mean"
                label="Nghĩa:"
                style={{
                  width: '100%',
                }}
                rules={[{ required: true, message: 'Vui lòng nhập nghĩa' }]}
              >
                <Input className="custom-input" placeholder="Nghĩa" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                validateTrigger={['onBlur', 'onChange']}
                name="kanji"
                label="Kanji:"
                style={{
                  width: '100%',
                }}
                rules={[{ required: true, message: 'Vui lòng nhập kanji' }]}
              >
                <Input className="custom-input" placeholder="Kanji" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                validateTrigger={['onBlur', 'onChange']}
                name="sinoVietNamese"
                label="Âm hán:"
                style={{
                  width: '100%',
                }}
                rules={[{ required: true, message: 'Vui lòng nhập âm hán' }]}
              >
                <Input className="custom-input" placeholder="Ấm hán" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            validateTrigger={['onBlur', 'onChange']}
            name="example"
            label="Ví dụ"
            style={{
              width: '100%',
            }}
            rules={[{ required: true, message: 'Vui lòng nhập ví dụ' }]}
          >
            <Input className="custom-input" placeholder="Ví dụ" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateUpdateVocabulary;
