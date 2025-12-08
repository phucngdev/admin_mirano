import { CloseOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal } from 'antd';
import { useEffect } from 'react';
import {
  createVocab,
  getAllVocab,
  updateVocab,
} from '#/src/redux/thunk/vocab.thunk';
import { useAppDispatch } from '#/src/redux/store/store';
import { useParams } from 'react-router-dom';
import { TopicVocabEntity } from '#/api/requests';

interface ModalCreateProps {
  open: boolean;
  onClose: (prev: boolean) => void;
  itemUpdate?: TopicVocabEntity;
}
const ModalCreateUpdateVocabulary = ({
  open,
  onClose,
  itemUpdate,
}: ModalCreateProps) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (itemUpdate) {
      form.setFieldsValue({
        originText: itemUpdate.originText,
        japanesePronounce: itemUpdate.japanesePronounce,
        vietnamesePronounce: itemUpdate.vietnamesePronounce,
      });
    } else {
      form.resetFields();
    }
  }, [itemUpdate]);

  const handleClose = () => {
    onClose(false);
    if (!itemUpdate) {
      form.resetFields();
    }
  };

  const handleUpdate = async () => {
    if (!itemUpdate || !id) return;
    const values = await form.validateFields();
    const result = await dispatch(
      updateVocab({
        id: itemUpdate.id,
        data: {
          originText: values.originText,
          japanesePronounce: values.japanesePronounce,
          vietnamesePronounce: values.vietnamesePronounce,
        },
      }),
    );
    if (result.payload.statusCode === 200) {
      handleClose();
      await dispatch(getAllVocab({ id: id, limit: 20, offset: 0 }));
      message.success('Chỉnh sửa thành công');
    } else if (result.payload.response.data.statusCode === 400) {
      message.warning('Đã tồn tại từ vựng');
    } else {
      message.error('Lỗi khi chỉnh sửa từ vựng');
    }
  };

  const handleCreate = async () => {
    if (!id) return;
    const values = await form.validateFields();
    const result = await dispatch(
      createVocab({
        topicId: id,
        originText: values.originText,
        japanesePronounce: values.japanesePronounce,
        vietnamesePronounce: values.vietnamesePronounce,
      }),
    );
    if (result.payload.statusCode === 201) {
      handleClose();
      await dispatch(getAllVocab({ id: id, limit: 20, offset: 0 }));
      message.success('Tạo thành công');
    } else if (result.payload.response.data.statusCode === 400) {
      message.warning('Đã tồn tại từ vựng');
    } else {
      message.error('Lỗi khi tạo từ vựng');
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
          <Button key="cancel" onClick={handleClose}>
            Hủy
          </Button>,
          <Button key="submit" onClick={handleSubmit} type="primary">
            Lưu từ vựng
          </Button>,
        ]}
        onCancel={handleClose}
        open={open}
        style={{ top: 20, right: 20 }}
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
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          validateTrigger={['onBlur', 'onSubmit']}
        >
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

          <Form.Item
            validateTrigger={['onBlur', 'onChange']}
            name="japanesePronounce"
            label="Phát âm tiếng Nhật:"
            style={{
              width: '100%',
            }}
            rules={[
              { required: true, message: 'Vui lòng nhập phát âm tiếng Nhật' },
            ]}
          >
            <Input
              className="custom-input"
              placeholder="Phát âm tiếng Nhật"
              name="japanesePronounce"
            />
          </Form.Item>
          <Form.Item
            validateTrigger={['onBlur', 'onChange']}
            name="vietnamesePronounce"
            label="Phát âm tiếng Việt:"
            style={{
              width: '100%',
            }}
            rules={[
              { required: true, message: 'Vui lòng nhập phát âm tiếng Việt' },
            ]}
          >
            <Input
              className="custom-input"
              placeholder="Phát âm tiếng Việt"
              name="vietnamesePronounce"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateUpdateVocabulary;
