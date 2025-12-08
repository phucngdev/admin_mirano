import { useAppDispatch } from '#/src/redux/store/store';
import {
  CloseOutlined,
  LoadingOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Upload,
  UploadFile,
} from 'antd';
import { useEffect, useState } from 'react';
import './index.scss';
import { uploadFileToS3 } from '#/api/services/uploadS3';
import { UpdateUserDto, UpsertUserDto, UserEntity } from '#/api/requests';
import { beforeUploadImage } from '#/shared/props/beforeUpload';
import {
  createUserService,
  updateUserService,
} from '#/api/services/userService';
import { AxiosError } from 'axios';
import { PHONE_NUMBER_REGEX } from '#/shared/constants';
import dayjs from 'dayjs';

interface ModalAccountProps {
  open: boolean;
  onClose: () => void;
  itemUpdate?: UserEntity | null;
}
const ModalCreateUpdateAccount = ({
  open,
  onClose,
  itemUpdate,
}: ModalAccountProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const UserProfiles = Form.useWatch('userProfiles', form);
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState<'submid' | 'image' | ''>('');

  useEffect(() => {
    if (itemUpdate) {
      form.setFieldsValue({
        fullName: itemUpdate.fullName,
        email: itemUpdate.email,
        phoneNumber: itemUpdate.phoneNumber,
        avatarUrl: itemUpdate.avatarUrl,
        birthday: dayjs(itemUpdate.birthday),
        address: itemUpdate.address,
        userProfiles: itemUpdate.userProfiles?.[0],
      });
      if (itemUpdate.avatarUrl) {
        setImageFileList([
          {
            uid: Date.now().toString(),
            name: 'Click xem tại đây',
            status: 'done',
            url: itemUpdate.avatarUrl,
          },
        ]);
        form.setFieldValue('avatarUrl', itemUpdate.avatarUrl);
      }
    } else {
      form.resetFields();
      setLoading('');
    }
  }, [itemUpdate, open]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    setLoading('submid');
    if (itemUpdate) {
      try {
        const data: UpsertUserDto = {
          fullName: values.fullName,
          phoneNumber: values.phoneNumber,
          email: values.email,
          userProfiles: values.userProfiles,
          isActive: true,
        };
        if (values.avatarUrl) {
          data.avatarUrl = values.avatarUrl;
        }
        await updateUserService(itemUpdate.id, {
          ...data,
        });
        message.success('Cập nhật thành công');
        form.resetFields();
        onClose();
      } catch (error) {
        const err = error as AxiosError;
        message.error('Cập nhật thất bại');
        console.log('🚀 ~ handleSubmit ~ err:', err);
      }
    } else {
      try {
        const result = await createUserService({
          ...values,
          isActive: true,
        });
        if (result.data.statusCode === 201) {
          message.success('Thêm thành công');
          form.resetFields();
          onClose();
        } else {
          message.error('Thêm thất bại');
        }
      } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
          const data = err.response.data as any;
          if (data.messageCode === 'PHONE_NUMBER_EXISTS') {
            message.error('Số điện thoại đã tồn tại');
          }
          if (data.messageCode === 'EMAIL_EXISTS') {
            message.error('Email đã tồn tại');
          }
        } else {
          message.error('Không nhận được phản hồi từ server');
        }
      } finally {
        setLoading('');
      }
    }
    setLoading('');
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
          <Button
            disabled={loading !== ''}
            onClick={handleSubmit}
            type="primary"
          >
            {loading && <LoadingOutlined />}
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
              {itemUpdate ? 'Cập nhật tài khoản' : 'Thêm tài khoản'}
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
            name="avatarUrl"
            label="Ảnh đại diện:"
            style={{
              width: '100%',
            }}
          >
            <Upload
              fileList={imageFileList}
              beforeUpload={beforeUploadImage}
              listType="picture"
              customRequest={async ({ file }) => {
                if (!file) return;
                try {
                  const { publicUrl } = await uploadFileToS3(file as File);
                  setImageFileList([
                    {
                      uid: Date.now().toString(),
                      name: (file as File).name,
                      status: 'done',
                      url: publicUrl,
                    },
                  ]);
                  form.setFieldsValue({ avatarUrl: publicUrl });
                } catch (error) {
                  console.log('🚀 ~ customRequest={ ~ error:', error);
                  message.error('Tải lên thất bại');
                }
              }}
              onRemove={() => {
                setImageFileList([]);
                form.setFieldsValue({ avatarUrl: null });
              }}
              showUploadList={{
                showPreviewIcon: false,
                showRemoveIcon: true,
              }}
            >
              {imageFileList.length === 0 && (
                <Button
                  icon={
                    loading === 'image' ? (
                      <LoadingOutlined />
                    ) : (
                      <UploadOutlined />
                    )
                  }
                >
                  Upload
                </Button>
              )}
            </Upload>
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                validateTrigger={['onBlur', 'onChange']}
                name="fullName"
                label="Họ và tên:"
                style={{
                  width: '100%',
                }}
                rules={[{ required: true, message: 'Không được để trống' }]}
              >
                <Input className="custom-input" placeholder="Họ và tên" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                validateTrigger={['onBlur', 'onChange']}
                name="phoneNumber"
                label="Số điện thoại:"
                style={{ width: '100%' }}
                rules={[
                  { required: true, message: 'Không được để trống' },
                  {
                    pattern: PHONE_NUMBER_REGEX,
                    message: 'Số điện thoại không hợp lệ',
                  },
                ]}
              >
                <Input className="custom-input" placeholder="Số điện thoại" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                validateTrigger={['onBlur', 'onChange']}
                name="email"
                label="Email:"
                style={{
                  width: '100%',
                }}
                rules={[{ required: true, message: 'Không được để trống' }]}
              >
                <Input
                  disabled={itemUpdate ? true : false}
                  className="custom-input"
                  placeholder="Email"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                validateTrigger={['onBlur', 'onChange']}
                name="birthday"
                label="Ngày sinh:"
                style={{
                  width: '100%',
                }}
                // rules={[{ required: true, message: 'Không được để trống' }]}
              >
                <DatePicker className="custom-datepicker" disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                validateTrigger={['onBlur', 'onChange']}
                name="address"
                label="Địa chỉ:"
                style={{
                  width: '100%',
                }}
                // rules={[{ required: true, message: 'Không được để trống' }]}
              >
                <Input className="custom-input" disabled placeholder="Email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                validateTrigger={['onBlur', 'onChange']}
                name="userProfiles"
                label="Loại tài khoản:"
                style={{
                  width: '100%',
                }}
                rules={[{ required: true, message: 'Không được để trống' }]}
              >
                <Select
                  // onChange={handleChange}
                  placeholder="Loại tài khoản"
                  // defaultValue={UpsertUserDto.userProfiles.STUDENT}
                  className="h-10"
                  options={[
                    {
                      value: UpsertUserDto.userProfiles.SYSTEM_ADMIN,
                      label: 'Admin',
                    },
                    {
                      value: UpsertUserDto.userProfiles.STUDENT,
                      label: 'Học viên',
                    },
                    {
                      value: UpsertUserDto.userProfiles.TEACHER,
                      label: 'Giảng viên',
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateUpdateAccount;
