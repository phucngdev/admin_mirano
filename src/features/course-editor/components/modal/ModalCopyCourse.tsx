import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { getAllCourse } from '#/src/redux/thunk/course.thunk';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

interface ModalCopyCourseProps {
  open: boolean;
  onClose: () => void;
}

const ModalCopyCourse = ({ open, onClose }: ModalCopyCourseProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { data } = useSelector((state: RootState) => state.course);

  const [loading, setLoading] = useState(false);
  const [courseSelected, setCourseSeelcted] = useState('');
  const [query, setQuery] = useState('');

  const fetchData = async () => {
    setLoading(true);
    await dispatch(
      getAllCourse({
        limit: 10,
        offset: 0,
        query: query,
      }),
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  const courseOptions = useMemo(() => {
    return data?.items?.map(course => ({
      label: course.title,
      value: course.id,
    }));
  }, [data]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
  };

  const handleCancel = () => {
    onClose();
    setCourseSeelcted('');
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
        title={
          <>
            <span
              style={{
                color: 'rgba(16, 24, 40, 1)',
                fontSize: '30px',
                fontWeight: '500',
              }}
            >
              Nhân bản khoá học
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
            name="query"
            label="Tìm kiếm:"
            style={{
              width: '100%',
            }}
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn khoá học',
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Lớp học"
              optionFilterProp="label"
              onChange={value => setCourseSeelcted(value)}
              onSearch={value => setQuery(value)}
              options={courseOptions}
              loading={loading}
            />
          </Form.Item>
          <Form.Item
            name="name"
            label="Tên khoá học mới:"
            rules={[{ required: true, message: 'Không được để trống' }]}
          >
            <Input placeholder="Tên khoá học" className="custom-input" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCopyCourse;
