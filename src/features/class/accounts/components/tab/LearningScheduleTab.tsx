import { Card, Table, Tabs, Tag } from 'antd';
import dayjs from 'dayjs';
import type { ColumnsType } from 'antd/es/table';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import {
  ClassEntity,
  CourseEntity,
  SessonEntity,
  SessonScheduleEntity,
} from '#/api/requests';
import { getOneClass } from '#/src/redux/thunk/class.thunk';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TabPane from 'antd/es/tabs/TabPane';
import { getSessonSchedule } from '#/src/redux/thunk/sesson-schedule.thunk';
import Loading from '#/shared/components/loading/Loading';

const getStatus = (dueDate: string) => {
  const today = dayjs();
  const date = dayjs(dueDate);
  if (date.isBefore(today, 'day')) return 'done';
  if (date.isSame(today, 'day')) return 'ongoing';
  return 'upcoming';
};

const statusTagMap: Record<string, JSX.Element> = {
  done: <Tag color="green">Đã học</Tag>,
  ongoing: <Tag color="blue">Hôm nay</Tag>,
  upcoming: <Tag color="default">Sắp tới</Tag>,
};

const LearningScheduleTable = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { student } = useSelector((state: RootState) => state.users);
  const { classEdit, setup } = useSelector((state: RootState) => state.class);

  const [activeClass, setActiveClass] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (student) {
      setActiveClass(student.classes?.[0]?.id);
    }
  }, [student]);

  const fetchData = async () => {
    if (!activeClass) return;
    setLoading(true);

    await Promise.all([
      dispatch(getOneClass(activeClass)),
      dispatch(getSessonSchedule(activeClass)),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id, activeClass]);

  const sessonMap = new Map<string, { title: string; courseTitle: string }>();
  classEdit?.courses.forEach(course => {
    course?.sessons?.forEach((sesson: SessonEntity) => {
      sessonMap.set(sesson.id, {
        title: sesson.title,
        courseTitle: course.title,
      });
    });
  });

  const columns: ColumnsType<any> = [
    {
      title: 'Ngày học',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Buổi học',
      dataIndex: 'sessonTitle',
      key: 'sessonTitle',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: status => statusTagMap[status],
    },
  ];

  const courseTabs = classEdit?.courses.map(course => {
    const dataSource = setup
      ?.filter((item: SessonScheduleEntity) => item.courseId === course.id)
      .map((item: SessonScheduleEntity, index: number) => {
        const sessonInfo = sessonMap.get(item.sessonId);
        const status = getStatus(item.dueDate);

        return {
          key: index,
          date: dayjs(item.dueDate).format('DD/MM/YYYY'),
          sessonTitle: sessonInfo?.title || 'Không rõ',
          status,
        };
      });

    return {
      label: `${course.title}`,
      key: course.id,
      children: (
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          bordered
        />
      ),
    };
  });

  if (loading) return <Loading />;

  return activeClass ? (
    <>
      <Tabs
        defaultActiveKey={activeClass}
        onChange={key => setActiveClass(key)}
        tabPosition="left"
      >
        {student?.classes.map(cls => (
          <TabPane tab={cls.name} key={cls.id}>
            <Tabs items={courseTabs} />;
          </TabPane>
        ))}
      </Tabs>
    </>
  ) : (
    <Card title="Học viên chưa có lớp"></Card>
  );
};

export default LearningScheduleTable;
