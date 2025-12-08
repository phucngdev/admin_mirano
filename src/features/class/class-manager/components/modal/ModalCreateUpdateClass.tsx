import { useAppDispatch } from '#/src/redux/store/store';
import { CloseOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Row,
} from 'antd';
import React, { useEffect } from 'react';
import './index.scss';
import { createClassService } from '#/api/services/classService';
import { getAllClass, updateClass } from '#/src/redux/thunk/class.thunk';
import dayjs from 'dayjs';
import { ClassEntity } from '#/api/requests';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

interface ModalClassProps {
  open: boolean;
  onClose: () => void;
  itemUpdate: ClassEntity | null;
}

const ModalCreateUpdateClass = ({
  open,
  onClose,
  itemUpdate,
}: ModalClassProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (itemUpdate) {
      form.setFieldsValue({
        name: itemUpdate.name,
        startDate: itemUpdate.startDate ? dayjs(itemUpdate.startDate) : null,
        endDate: itemUpdate.endDate ? dayjs(itemUpdate.endDate) : null,
      });
    } else {
      form.resetFields();
    }
  }, [itemUpdate, open]);

  const handleCreate = async () => {
    const values = await form.validateFields();
    const result = await createClassService({
      name: values.name,
      startDate: dayjs(values.startDate)
        .tz('Asia/Ho_Chi_Minh')
        .hour(7)
        .minute(0)
        .second(0)
        .millisecond(0)
        .toDate()
        .toString(),
      endDate: dayjs(values.endDate)
        .tz('Asia/Ho_Chi_Minh')
        .hour(7)
        .minute(0)
        .second(0)
        .millisecond(0)
        .toDate()
        .toString(),
    });
    if (result.data.statusCode === 201) {
      message.success('Thêm thành công');
      await dispatch(
        getAllClass({
          limit: 20,
          offset: 0,
          query: '',
        }),
      );
      onClose();
      form.resetFields();
    } else {
      message.error('Thêm thất bại');
    }
  };

  const handleUpdate = async () => {
    if (!itemUpdate) return;
    const values = await form.validateFields();
    const result = await dispatch(
      updateClass({
        id: itemUpdate.id,
        data: {
          name: values.name,
          startDate: dayjs(values.startDate)
            .tz('Asia/Ho_Chi_Minh')
            .hour(7)
            .minute(0)
            .second(0)
            .millisecond(0)
            .toDate()
            .toString(),
          endDate: dayjs(values.endDate)
            .tz('Asia/Ho_Chi_Minh')
            .hour(7)
            .minute(0)
            .second(0)
            .millisecond(0)
            .toDate()
            .toString(),
        },
      }),
    );
    if (result.payload.statusCode === 200) {
      message.success('Cập nhật thành công');
      onClose();
      form.resetFields();
    } else {
      message.error('Cập nhật thất bại');
    }
  };

  const handleSubmit = async () => {
    if (itemUpdate) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <>
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
              Thêm lớp học
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
            name="name"
            label="Tên lớp học:"
            style={{
              width: '100%',
            }}
            rules={[{ required: true, message: 'Không được để trống' }]}
          >
            <Input className="custom-input" placeholder="Tên lớp học" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                validateTrigger={['onBlur', 'onChange']}
                name="startDate"
                label="Ngày bắt đầu:"
                style={{
                  width: '100%',
                }}
                rules={[{ required: true, message: 'Không được để trống' }]}
              >
                <DatePicker className="custom-datepicker" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                validateTrigger={['onBlur', 'onChange']}
                name="endDate"
                label="Ngày kết thúc:"
                style={{
                  width: '100%',
                }}
                rules={[{ required: true, message: 'Không được để trống' }]}
              >
                <DatePicker className="custom-datepicker" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateUpdateClass;
