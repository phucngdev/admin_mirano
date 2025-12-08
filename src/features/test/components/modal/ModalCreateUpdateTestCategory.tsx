import { CreateTestCategoryDto, TestCategoryEntity } from '#/api/requests';
import { uploadFileToS3 } from '#/api/services/uploadS3';
import { beforeUploadImage } from '#/shared/props/beforeUpload';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { getAllClass } from '#/src/redux/thunk/class.thunk';
import {
  createTestCategory,
  getTestCategory,
  updateTestCategory,
} from '#/src/redux/thunk/test-category.thunk';
import {
  CloseOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Spin,
  Upload,
  UploadFile,
} from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

interface ModalCreateUpdateTestCategory {
  open: boolean;
  onClose: () => void;
  itemUpdate: TestCategoryEntity | null;
}

const ModalCreateUpdateTestCategory = ({
  open,
  onClose,
  itemUpdate,
}: ModalCreateUpdateTestCategory) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { data } = useSelector((state: RootState) => state.class);

  const spesifictUser = Form.useWatch('spesifictUser', form);
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState<'image' | 'class' | 'submit' | ''>('');
  const [query, setQuery] = useState('');

  const fetchDataClass = async () => {
    await dispatch(
      getAllClass({
        limit: 10,
        offset: 0,
        query: query,
      }),
    );
  };

  const options = useMemo(() => {
    if (data) {
      return data.items.map((item: any) => ({
        label: item.name,
        value: item.id.toString(),
      }));
    }
  }, [data]);

  useEffect(() => {
    if (itemUpdate) {
      form.setFieldsValue({
        name: itemUpdate.name,
        imageUrl: itemUpdate.imageUrl,
        spesifictUser: itemUpdate.spesifictUser,
        classIds: itemUpdate.classIds,
      });
      setImageFileList([
        {
          uid: '-1',
          name: itemUpdate.imageUrl,
          status: 'done',
          url: itemUpdate.imageUrl,
        },
      ]);
    } else {
      form.resetFields();
      setImageFileList([]);
    }
  }, [itemUpdate, open]);

  useEffect(() => {
    if (spesifictUser === CreateTestCategoryDto.spesifictUser.CLASS) {
      fetchDataClass();
    }
  }, [spesifictUser, query]);

  const handleCreate = async () => {
    const values = await form.validateFields();
    let data_create: any = {
      name: values.name,
      imageUrl: values.imageUrl,
      spesifictUser: values.spesifictUser,
    };
    if (
      values.classIds &&
      values.spesifictUser === CreateTestCategoryDto.spesifictUser.CLASS
    ) {
      data_create.classIds = values.classIds;
    }
    setLoading('submit');
    const result = await dispatch(createTestCategory(data_create));
    if (result.payload.statusCode === 201) {
      message.success('Thêm thành công');
      await dispatch(
        getTestCategory({
          limit: 20,
          offset: 0,
        }),
      );
      form.resetFields();
      onClose();
    } else {
      message.error('Thêm thất bại');
    }
    setLoading('');
  };

  const handleUpdate = async () => {
    if (!itemUpdate) return;
    const values = await form.validateFields();
    setLoading('class');
    const result = await dispatch(
      updateTestCategory({
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
    setLoading('');
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
          <Button
            disabled={loading === 'submit'}
            onClick={handleSubmit}
            type="primary"
          >
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
            name="imageUrl"
            label="Thumbnail bài thi:"
            style={{ width: '100%' }}
          >
            <Upload
              listType="picture-card"
              fileList={imageFileList}
              disabled={loading === 'submit'}
              beforeUpload={beforeUploadImage}
              customRequest={async ({ file, onSuccess, onError }) => {
                if (!file) return;
                setLoading('image');
                try {
                  // const url = await uploadFileToS3(file as File);
                  const { publicUrl } = await uploadFileToS3(file as File);

                  setImageFileList([
                    {
                      uid: Date.now().toString(),
                      name: (file as File).name,
                      status: 'done',
                      url: publicUrl,
                    },
                  ]);
                  form.setFieldsValue({ imageUrl: publicUrl });
                  onSuccess?.({}, new XMLHttpRequest());
                } catch (error) {
                  onError?.(error as Error);
                  message.error('Tải ảnh lên thất bại');
                } finally {
                  setLoading('');
                }
              }}
              onRemove={() => {
                setImageFileList([]);
              }}
            >
              {imageFileList.length < 1 && (
                <button style={{ border: 0, background: 'none' }} type="button">
                  {loading ? <LoadingOutlined /> : <PlusOutlined />}
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            name="name"
            label="Tên bài thi:"
            rules={[{ required: true, message: 'Không được để trống' }]}
          >
            <Input
              disabled={loading === 'submit'}
              className="h-10"
              placeholder="Tên bài thi"
            />
          </Form.Item>
          <Form.Item
            validateTrigger={['onBlur', 'onChange']}
            name="spesifictUser"
            label="Loại bài thi:"
            style={{
              width: '100%',
            }}
            rules={[{ required: true, message: 'Không được để trống' }]}
          >
            <Select
              placeholder="Loại bài thi"
              onChange={value => {
                form.setFieldValue('spesifictUser', value);
              }}
              disabled={loading === 'submit'}
              className="h-10"
              options={[
                {
                  value: CreateTestCategoryDto.spesifictUser.ALL,
                  label: 'Public',
                },
                {
                  value: CreateTestCategoryDto.spesifictUser.CLASS,
                  label: 'Dành Cho lớp học',
                },
                {
                  value: CreateTestCategoryDto.spesifictUser.USERS,
                  label: 'Dành Cho học viên',
                  disabled: true,
                },
                {
                  value: CreateTestCategoryDto.spesifictUser.COURSE,
                  label: 'Dành Cho khoá học',
                  disabled: true,
                },
              ]}
            />
          </Form.Item>
          {spesifictUser === CreateTestCategoryDto.spesifictUser.CLASS && (
            <>
              <Form.Item
                validateTrigger={['onBlur', 'onChange']}
                name="classIds"
                label="Chọn lớp học:"
                style={{
                  width: '100%',
                }}
                rules={[{ required: true, message: 'Không được để trống' }]}
              >
                <Select
                  placeholder="Chọn lớp học"
                  className="h-10"
                  showSearch
                  disabled={loading === 'submit'}
                  mode="multiple"
                  filterOption={false}
                  onSearch={value => setQuery(value)}
                  notFoundContent={
                    loading === 'class' ? <Spin size="small" /> : null
                  }
                  options={options}
                />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateUpdateTestCategory;
