import { CourseEntity } from '#/api/requests';
import { uploadFileToS3 } from '#/api/services/uploadS3';
import { beforeUploadImage } from '#/shared/props/beforeUpload';
import { useAppDispatch } from '#/src/redux/store/store';
import {
  createCourse,
  getAllCourse,
  updateCourse,
} from '#/src/redux/thunk/course.thunk';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Upload,
  message,
} from 'antd';
import type { RcFile, UploadFile } from 'antd/es/upload';
import { useEffect, useState } from 'react';

interface CourseFormProps {
  initialValues?: Partial<CourseEntity>;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pagination: { limit: number; offset: number };
}

export function CourseForm({
  initialValues,
  isOpen,
  onClose,
  title,
  pagination,
}: CourseFormProps) {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const [listFile, setListFile] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState<'table' | 'img' | ''>('');

  useEffect(() => {
    if (!isOpen) return;

    if (initialValues) {
      form.setFieldsValue({
        title: initialValues.title,
        thumbnailUrl: initialValues.thumbnailUrl,
        description: initialValues.description,
        status: initialValues.status,
        price: initialValues.price,
        type: initialValues.type,
      });
      setListFile([
        {
          uid: '-1',
          name: initialValues.thumbnailUrl || 'Image thumbnail',
          status: 'done',
          url: initialValues.thumbnailUrl,
        },
      ]);
    } else {
      // reset rõ ràng
      form.resetFields();
      setListFile([]);
    }
  }, [initialValues, isOpen]);

  const handleCreate = async () => {
    const values = await form.validateFields();

    const result = await dispatch(
      createCourse({
        title: values.title,
        thumbnailUrl: values.thumbnailUrl,
        description: values.description,
        price: values.price.toString(),
        type: values.type,
        status: values.status,
      }),
    );
    if (result.payload.statusCode === 201) {
      await dispatch(
        getAllCourse({
          limit: pagination.limit,
          offset: pagination.offset,
          query: '',
        }),
      ); //
      message.success('Lưu khóa học thành công!');
      form.resetFields();
      onClose();
    } else if (result.payload.response.status === 400) {
      message.error('Có lỗi xảy ra khi lưu khóa học!');
    } else {
      message.error('Có lỗi xảy ra khi lưu khóa học!');
    }
  };

  const handleUpdate = async () => {
    const values = await form.validateFields();
    if (!initialValues || !initialValues.id) return;
    const result = await dispatch(
      updateCourse({
        id: initialValues.id,
        data: {
          title: values.title,
          thumbnailUrl: values.thumbnailUrl,
          description: values.description,
          price: values.price.toString(),
          status: values.status,
        },
      }),
    );
    if (result.payload.statusCode === 200) {
      await dispatch(
        getAllCourse({
          limit: pagination.limit,
          offset: pagination.offset,
          query: '',
        }),
      );
      message.success('Chỉnh sửa khóa học thành công!');
      form.resetFields();
      onClose();
    } else if (result.payload.response.status === 400) {
      message.error('Có lỗi xảy ra khi chỉnh sửa khóa học!');
    } else {
      message.error('Có lỗi xảy ra khi chỉnh sửa khóa học!');
    }
  };

  const handleSubmit = async () => {
    setLoading('table');
    if (initialValues) {
      handleUpdate();
    } else {
      handleCreate();
    }
    setLoading('');
  };

  return (
    <Modal
      footer={null}
      onCancel={() => {
        onClose();
        form.resetFields();
      }}
      open={isOpen}
      title={title}
      width={800}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Tên khóa học"
          name="title"
          rules={[{ message: 'Vui lòng nhập tên khóa học!', required: true }]}
        >
          <Input placeholder="Nhập tên khóa học" />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ message: 'Vui lòng nhập mô tả khóa học!', required: true }]}
        >
          <Input.TextArea placeholder="Nhập mô tả khóa học" rows={4} />
        </Form.Item>

        <Form.Item
          label="Ảnh đại diện"
          name="thumbnailUrl"
          rules={[{ message: 'Vui lòng chọn ảnh đại diện!', required: true }]}
        >
          <Upload
            beforeUpload={beforeUploadImage}
            listType="picture"
            fileList={listFile}
            customRequest={async ({ file, onError }) => {
              if (!file) return;

              try {
                setLoading('img');
                const { publicUrl } = await uploadFileToS3(file as File);
                form.setFieldValue('thumbnailUrl', publicUrl);
                setListFile([
                  {
                    uid: Date.now().toString(),
                    name: (file as File).name,
                    status: 'done',
                    url: publicUrl,
                  },
                ]);
              } catch (error) {
                onError?.(error as Error);
                message.error('Tải ảnh lên thất bại');
              } finally {
                setLoading('');
              }
            }}
            onRemove={() => {
              form.setFieldsValue({ thumbnailUrl: '' });
              setListFile([]);
            }}
          >
            <Button
              icon={loading === 'img' ? <LoadingOutlined /> : <PlusOutlined />}
            >
              Tải ảnh lên
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Giá"
          name="price"
          rules={[{ message: 'Vui lòng nhập giá khóa học!', required: true }]}
        >
          <InputNumber<number>
            className="w-full"
            formatter={value =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            min={0}
            parser={value => {
              const parsed = value?.replace(/[^\d]/g, '');
              return parsed ? parseInt(parsed, 10) : 0;
            }}
            placeholder="Nhập giá khóa học"
          />
        </Form.Item>

        <Form.Item
          label="Danh mục"
          name="type"
          rules={[{ message: 'Vui lòng chọn danh mục!', required: true }]}
        >
          <Select
            placeholder="Chọn danh mục"
            disabled={initialValues ? true : false}
          >
            <Select.Option value={CourseEntity.type.BASIC}>
              Sơ cấp
            </Select.Option>
            <Select.Option value={CourseEntity.type.ADVANCED}>
              Nâng cao
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Trạng thái"
          name="status"
          rules={[{ message: 'Vui lòng chọn trạng thái!', required: true }]}
        >
          <Select placeholder="Chọn trạng thái">
            <Select.Option value="ACTIVE">Hoạt động</Select.Option>
            <Select.Option value="INACTIVE">Ngừng hoạt động</Select.Option>
          </Select>
        </Form.Item>

        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>Hủy</Button>
          <Button
            htmlType="submit"
            loading={loading === 'table'}
            type="primary"
          >
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
