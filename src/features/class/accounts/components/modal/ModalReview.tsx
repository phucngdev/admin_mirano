import { UserEntity } from '#/api/requests';
import { useAppDispatch } from '#/src/redux/store/store';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Form, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';

interface ModalReviewProps {
  open: boolean;
  onClose: () => void;
  student: UserEntity;
}

const ModalReview = ({ open, onClose, student }: ModalReviewProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {};

  const handleCancel = () => {
    onClose();
    form.resetFields();
  };

  return (
    <Modal
      closeIcon={<CloseOutlined />}
      className=""
      footer={[
        <Button onClick={handleCancel}>Huỷ</Button>,
        <Button onClick={handleSubmit} type="primary">
          Lưu
        </Button>,
      ]}
      onCancel={handleCancel}
      open={open}
      title={
        <>
          <span
            style={{
              color: 'rgba(16, 24, 40, 1)',
              fontSize: '30px',
              fontWeight: '500',
            }}
          >
            Nhận xét
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
          name="review"
          label="Nhận xét:"
          style={{
            width: '100%',
          }}
        >
          <TextArea rows={4} maxLength={6} placeholder="Nhận xét" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalReview;
