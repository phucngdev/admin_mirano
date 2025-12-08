import { CreateTestDto, TestEntity } from '#/api/requests';
import { useAppDispatch } from '#/src/redux/store/store';
import {
  createTest,
  getAllTest,
  updateTest,
} from '#/src/redux/thunk/test.thunk';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface ModalCreateUpdateTestProps {
  open: boolean;
  onClose: () => void;
  itemUpdate: TestEntity | null;
}
const ModalCreateUpdateTest = ({
  open,
  onClose,
  itemUpdate,
}: ModalCreateUpdateTestProps) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (itemUpdate) {
      form.setFieldsValue({
        name: itemUpdate.name,
        description: itemUpdate.description,
        randomAnswer: itemUpdate.randomAnswer,
        showSolution: itemUpdate.showSolution,
        testType: itemUpdate.testType,
      });
    }
  }, [itemUpdate, open]);

  const handleCreate = async () => {
    if (!id) return;
    const values = await form.validateFields();
    const result = await dispatch(
      createTest({
        ...values,
        duration: +values.duration,
        categoryId: id,
      }),
    );
    if (result.payload.statusCode === 201) {
      message.success('Thêm thành công');
      await dispatch(
        getAllTest({
          categoryId: id,
          limit: 20,
          offset: 0,
        }),
      );
      form.resetFields();
      onClose();
    } else {
      message.error('Thêm thất bại');
    }
  };

  const handleUpdate = async () => {
    if (!itemUpdate) return;
    const values = await form.validateFields();
    const result = await dispatch(
      updateTest({
        id: itemUpdate.id,
        data: {
          ...values,
        },
      }),
    );
    if (result.payload.statusCode === 200) {
      message.success('Cập nhật thành công');
      form.resetFields();
      onClose();
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
              Thêm bài thi thử
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
            name="name"
            label="Tên đề thi:"
            rules={[{ required: true, message: 'Không được để trống' }]}
          >
            <Input placeholder="Tên đề thi" />
          </Form.Item>
          <Form.Item
            validateTrigger={['onBlur', 'onChange']}
            name="testType"
            label="Loại bài thi:"
            style={{
              width: '100%',
            }}
            rules={[{ required: true, message: 'Không được để trống' }]}
          >
            <Select
              placeholder="Loại bài thi"
              onChange={value => {
                form.setFieldValue('testType', value);
              }}
              className="h-10"
              options={[
                {
                  value: CreateTestDto.testType.REAL,
                  label: 'Thi thật',
                },
                {
                  value: CreateTestDto.testType.TRY,
                  label: 'Thi thử',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            validateTrigger={['onBlur', 'onChange']}
            name="randomAnswer"
            label="Trộn đáp án:"
            style={{
              width: '100%',
            }}
          >
            <Select
              placeholder="Trộn đáp án"
              onChange={value => {
                form.setFieldValue('randomAnswer', value);
              }}
              className="h-10"
              options={[
                {
                  value: true,
                  label: 'Có',
                },
                {
                  value: false,
                  label: 'Không',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            validateTrigger={['onBlur', 'onChange']}
            name="showSolution"
            label="Hiện đáp án & giải thích:"
            style={{
              width: '100%',
            }}
          >
            <Select
              placeholder="Hiện đáp án & giải thích"
              onChange={value => {
                form.setFieldValue('showSolution', value);
              }}
              className="h-10"
              options={[
                {
                  value: true,
                  label: 'Có',
                },
                {
                  value: false,
                  label: 'Không',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả:"
            // rules={[{ required: true, message: 'Không được để trống' }]}
          >
            <TextArea placeholder="Mô tả" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateUpdateTest;
