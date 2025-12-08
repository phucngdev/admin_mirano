import { ExamEntity } from '#/api/requests';
import {
  createExamService,
  updateExamService,
} from '#/api/services/examService';
import { useAppDispatch } from '#/src/redux/store/store';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal } from 'antd';
import React, { useEffect } from 'react';

interface ModalCreateExamProps {
  open: boolean;
  onClose: () => void;
  itemUpdate?: ExamEntity | null;
}

const ModalCreateExam = ({
  open,
  onClose,
  itemUpdate,
}: ModalCreateExamProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (itemUpdate) {
      form.setFieldsValue({
        name: itemUpdate.name,
      });
    } else {
      form.resetFields();
    }
  }, [open, itemUpdate]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (itemUpdate) {
      const result = await updateExamService(itemUpdate.id, {
        name: values.name,
        questionIds: itemUpdate.questions.map(item => item.id),
      });
      if (result.data.statusCode === 200) {
        message.success('Cập nhật thành công');
        onClose();
        form.resetFields();
      } else {
        message.error('Cập nhật thất bại');
      }
    } else {
      const result = await createExamService({
        name: values.name,
      });
      if (result.data.statusCode === 201) {
        message.success('Tạo thành công');
        onClose();
        form.resetFields();
      } else {
        message.error('Tạo thất bại');
      }
    }
  };

  return (
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
            {itemUpdate ? 'Cập nhật' : 'Thêm bộ đề'}
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
          name="name"
          label="Tên bộ đề:"
          style={{
            width: '100%',
          }}
          rules={[{ required: true, message: 'Không được để trống' }]}
        >
          <Input className="custom-input" placeholder="Tên bộ đề" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCreateExam;
