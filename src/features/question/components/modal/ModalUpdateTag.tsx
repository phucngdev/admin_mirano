import { updateTagMultipleQuestionService } from '#/api/services/questionService';
import { useAppDispatch } from '#/src/redux/store/store';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

interface ModalUpdateTagProps {
  open: boolean;
  onClose: () => void;
  selectedRowKeys: React.Key[];
  setSelectedRowKeys: (value: React.Key[]) => void;
}

const ModalUpdateTag = ({
  open,
  onClose,
  selectedRowKeys,
  setSelectedRowKeys,
}: ModalUpdateTagProps) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.resetFields();
  }, [open]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    const ids = JSON.stringify(selectedRowKeys);
    setLoading(true);
    const result = await updateTagMultipleQuestionService(ids, values.tag);
    if (result.data.statusCode === 200) {
      message.success('Chỉnh sửa thành công');
      onClose();
      setSelectedRowKeys([]);
    } else {
      message.error('Chỉnh sửa thất bại');
    }
    setLoading(false);
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
          <Button
            key="submit"
            loading={loading}
            onClick={handleSubmit}
            type="primary"
          >
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
              Chỉnh sửa tag
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
            name="tag"
            label="Tag:"
            style={{
              width: '100%',
            }}
            rules={[{ required: true, message: 'Không được để trống' }]}
          >
            <Input className="custom-input" placeholder="Tag" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalUpdateTag;
