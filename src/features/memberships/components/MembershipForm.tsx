import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Radio,
  Space,
  Upload,
  message,
} from 'antd';
import type { RcFile } from 'antd/es/upload';
import { useEffect } from 'react';
import { z } from 'zod';

const { TextArea } = Input;

export interface MembershipFormData {
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  duration: number;
  benefits: string[];
  status: 'active' | 'inactive';
}

const membershipSchema = z.object({
  benefits: z.array(z.string()).min(1, 'Vui lòng thêm ít nhất 1 quyền lợi'),
  description: z.string().min(1, 'Vui lòng nhập mô tả'),
  duration: z.number().min(1, 'Thời hạn phải lớn hơn 0'),
  price: z.number().min(0, 'Giá không được âm'),
  status: z.enum(['active', 'inactive']),
  thumbnail: z.string().min(1, 'Vui lòng tải lên ảnh'),
  title: z.string().min(1, 'Vui lòng nhập tên gói'),
});

interface MembershipFormProps {
  initialValues?: Partial<MembershipFormData>;
  onSubmit: (data: MembershipFormData) => void;
  onCancel: () => void;
}

export function MembershipForm({
  initialValues,
  onSubmit,
  onCancel,
}: MembershipFormProps) {
  const [form] = Form.useForm<MembershipFormData>();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues]);

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
      message.error('Chỉ chấp nhận file JPG/PNG!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error('Kích thước ảnh phải nhỏ hơn 2MB!');
    }

    return isJpgOrPng && isLt2M;
  };

  const handleSubmit = async (values: MembershipFormData) => {
    try {
      await membershipSchema.parseAsync(values);
      onSubmit(values);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach(err => {
          message.error(err.message);
        });
      }
    }
  };

  return (
    <Form
      form={form}
      initialValues={{ benefits: [''], status: 'active' }}
      layout="vertical"
      onFinish={handleSubmit}
    >
      <Form.Item
        label="Tên gói"
        name="title"
        rules={[{ message: 'Vui lòng nhập tên gói', required: true }]}
      >
        <Input placeholder="Nhập tên gói membership" />
      </Form.Item>

      <Form.Item
        label="Mô tả"
        name="description"
        rules={[{ message: 'Vui lòng nhập mô tả', required: true }]}
      >
        <TextArea
          placeholder="Nhập mô tả chi tiết về gói membership"
          rows={4}
        />
      </Form.Item>

      <Form.Item
        label="Ảnh"
        name="thumbnail"
        rules={[{ message: 'Vui lòng tải lên ảnh', required: true }]}
      >
        <Upload
          accept="image/png,image/jpeg"
          beforeUpload={beforeUpload}
          listType="picture-card"
          maxCount={1}
          name="thumbnail"
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải lên</div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item
        label="Giá (VNĐ)"
        name="price"
        rules={[{ message: 'Vui lòng nhập giá', required: true }]}
      >
        <InputNumber
          className="w-full"
          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          min={0}
          parser={(value: string | undefined): number => Number(value!.replace(/\$\s?|(,*)/g, ''))}
          step={1000}
        />
      </Form.Item>

      <Form.Item
        label="Thời hạn (tháng)"
        name="duration"
        rules={[{ message: 'Vui lòng nhập thời hạn', required: true }]}
      >
        <InputNumber className="w-full" max={36} min={1} />
      </Form.Item>

      <Form.List
        name="benefits"
        rules={[
          {
            validator: async (_, benefits) => {
              if (!benefits || benefits.length < 1) {
                return Promise.reject(
                  new Error('Vui lòng thêm ít nhất 1 quyền lợi'),
                );
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                key={field.key}
                label={index === 0 ? 'Quyền lợi' : ''}
                required={false}
              >
                <Form.Item
                  {...field}
                  noStyle
                  rules={[
                    {
                      message: 'Vui lòng nhập quyền lợi hoặc xóa trường này',
                      required: true,
                      whitespace: true,
                    },
                  ]}
                  validateTrigger={['onChange', 'onBlur']}
                >
                  <Input
                    placeholder="Nhập quyền lợi"
                    style={{ width: '90%' }}
                  />
                </Form.Item>
                {fields.length > 1 && (
                  <MinusCircleOutlined
                    className="ml-2"
                    onClick={() => remove(field.name)}
                  />
                )}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                icon={<PlusOutlined />}
                onClick={() => add()}
                style={{ width: '90%' }}
                type="dashed"
              >
                Thêm quyền lợi
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item
        label="Trạng thái"
        name="status"
        rules={[{ message: 'Vui lòng chọn trạng thái', required: true }]}
      >
        <Radio.Group>
          <Radio value="active">Hoạt động</Radio>
          <Radio value="inactive">Ngừng hoạt động</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item>
        <Space>
          <Button htmlType="submit" type="primary">
            {initialValues ? 'Cập nhật' : 'Thêm mới'}
          </Button>
          <Button onClick={onCancel}>Hủy</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
