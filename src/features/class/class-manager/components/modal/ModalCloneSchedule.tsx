import { CourseEntity } from '#/api/requests';
import { getOneClassService } from '#/api/services/classService';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { getAllClass, getOneClass } from '#/src/redux/thunk/class.thunk';
import { cloneSessonSchedule } from '#/src/redux/thunk/sesson-schedule.thunk';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Form, message, Modal, Select, Tag } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

interface ModalCloneScheduleProps {
  open: boolean;
  onClose: () => void;
}

const ModalCloneSchedule = ({ open, onClose }: ModalCloneScheduleProps) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { data, classEdit } = useSelector((state: RootState) => state.class);
  const [classSelected, setClassSelected] = useState('');
  const [courseSelected, setCourseSeelcted] = useState([]);
  const [courses, setCourses] = useState<CourseEntity[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    limit: 15,
    offset: 0,
    current: 1,
  });

  const classOptions = useMemo(() => {
    return data.items.map(cls => ({
      label: cls.name,
      value: cls.id,
    }));
  }, [data]);

  const courseOptions = useMemo(() => {
    return courses?.map(course => ({
      label: course.title,
      value: course.id,
    }));
  }, [courses]);

  const fetchDataClass = async () => {
    await dispatch(
      getAllClass({
        limit: pagination.limit,
        offset: pagination.offset,
        query: query,
        fromDate: classEdit?.startDate.toString(),
        toDate: classEdit?.endDate.toString(),
      }),
    );
  };

  const fetchDataClassDetail = async () => {
    const result = await getOneClassService(classSelected);
    setCourses(result.data.data.courses);
  };

  useEffect(() => {
    fetchDataClass();
    setCourseSeelcted([]);
  }, [query]);

  useEffect(() => {
    fetchDataClassDetail();
  }, [classSelected]);

  const handleSubmit = async () => {
    if (!id) return;
    setLoading(true);
    const result = await dispatch(
      cloneSessonSchedule({
        targetClassId: id,
        sourceClassId: classSelected,
        courseIds: courseSelected,
      }),
    );
    setLoading(false);
    if (result.payload.statusCode === 201) {
      message.success('Sao chép thành công');
      await dispatch(getOneClass(id));
      onClose();
    } else {
      message.error('Sao chép thất bại');
    }
  };

  return (
    <Modal
      closeIcon={<CloseOutlined />}
      className=""
      footer={[
        <Button onClick={onClose}>Huỷ</Button>,
        <Button
          disabled={loading}
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
            Sao chép lịch học
          </span>
        </>
      }
      width={600}
    >
      <Form layout="vertical" validateTrigger={['onBlur', 'onSubmit']}>
        <Form.Item
          validateTrigger={['onBlur', 'onChange']}
          name="date"
          label="Thời gian áp dụng:"
          style={{
            width: '100%',
          }}
        >
          <Tag color="blue">
            Từ {dayjs(classEdit?.startDate).format('YYYY/MM/DD')}
          </Tag>
          <Tag color="blue">-</Tag>
          <Tag color="blue">
            Đến {dayjs(classEdit?.endDate).format('YYYY/MM/DD')}
          </Tag>
        </Form.Item>
        <Form.Item
          validateTrigger={['onBlur', 'onChange']}
          name="query"
          label="Tên lớp học:"
          style={{
            width: '100%',
          }}
        >
          <Select
            showSearch
            placeholder="Lớp học"
            optionFilterProp="label"
            onChange={value => setClassSelected(value)}
            onSearch={value => setQuery(value)}
            options={classOptions}
          />
        </Form.Item>
        <Form.Item
          validateTrigger={['onBlur', 'onChange']}
          name="items"
          label="Danh sách khoá học:"
          style={{
            width: '100%',
          }}
        >
          <Select
            showSearch
            mode="multiple"
            placeholder="Khoá học"
            optionFilterProp="label"
            onChange={value => setCourseSeelcted(value)}
            // onSearch={value => setQuery(value)}
            options={courseOptions}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCloneSchedule;
