import { updatePasswordService } from '#/api/services/userService';
import { PASSWORD_REGEX } from '#/shared/constants';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal } from 'antd';
import { AxiosError } from 'axios';
import React, { useEffect } from 'react';

interface ModalChangePasswordProps {
  open: boolean;
  onClose: () => void;
}

const ModalChangePassword = ({ open, onClose }: ModalChangePasswordProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [open]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    try {
      const result = await updatePasswordService({
        password: values.password,
        oldPassword: values.oldPassword,
      });
      if (result.data.statusCode === 200) {
        message.success('Cập nhật thành công');
        onClose();
        form.resetFields();
      }
    } catch (error) {
      const err = error as AxiosError;
      console.log('🚀 ~ handleSubmit ~ err:', err);
      if (err.response) {
        const data = err.response.data as any;
        if (data.messageCode === 'INVALID_PASSWORD') {
          message.error('Mật khẩu không chính xác');
        }
      } else {
        message.error('Không nhận được phản hồi từ server');
      }
    }
  };

  return (
    <>
      <Modal
        closeIcon={<CloseOutlined />}
        className="modal-select-question"
        footer={[
          <Button key="cancel" onClick={onClose}>
            Hủy
          </Button>,
          <Button key="submit" onClick={handleSubmit} type="primary">
            Lưu
          </Button>,
        ]}
        onCancel={onClose}
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
              Cập nhật mật khẩu
            </span>
          </>
        }
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          validateTrigger={['onBlur', 'onSubmit']}
        >
          <Form.Item
            validateTrigger={['onBlur', 'onChange']}
            name="oldPassword"
            label="Mật khẩu cũ:"
            style={{
              width: '100%',
            }}
            rules={[{ required: true, message: 'Không được để trống' }]}
          >
            <Input.Password
              className="custom-input"
              placeholder="Mật khẩu cũ"
            />
          </Form.Item>
          <Form.Item
            validateTrigger={['onBlur', 'onChange']}
            name="password"
            label="Mật khẩu mới:"
            style={{
              width: '100%',
            }}
            rules={[
              { required: true, message: 'Không được để trống' },
              { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' },
              {
                pattern: PASSWORD_REGEX,
                message:
                  'Mật khẩu phải có các ký tự gồm chữ hoa, chữ thường, số và ký tự đặc biệt.',
              },
            ]}
          >
            <Input.Password
              className="custom-input"
              placeholder="Mật khẩu mới"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalChangePassword;
