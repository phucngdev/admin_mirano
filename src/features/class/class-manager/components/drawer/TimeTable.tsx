import {
  LessonEntity,
  SessonEntity,
  SessonScheduleEntity,
} from '#/api/requests';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { getOneClass } from '#/src/redux/thunk/class.thunk';
import { getSessonSchedule } from '#/src/redux/thunk/sesson-schedule.thunk';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import {
  Drawer,
  Empty,
  Space,
  Spin,
  Tabs,
  Tag,
  Timeline,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
const { Title, Text } = Typography;
import './index.scss';

interface TimeTableProps {
  open: boolean;
  onClose: () => void;
}

const TimeTable = ({ open, onClose }: TimeTableProps) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { setup, classEdit } = useSelector((state: RootState) => state.class);

  const [tabActive, setTabActive] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (classEdit && classEdit.courses.length) {
      setTabActive(classEdit.courses[0].id);
    }
  }, [classEdit]);

  const fetchData = async () => {
    if (!id || !tabActive) return;
    setLoading(true);
    await dispatch(
      getSessonSchedule({
        classId: id,
        courseId: tabActive,
      }),
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id, tabActive]);

  const sortedData =
    setup &&
    [...setup].sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    );

  const getSessonTitle = (sessonId: string): string => {
    for (const course of classEdit?.courses || []) {
      const foundSesson = course.sessons?.find(
        (sess: SessonEntity) => sess.id === sessonId,
      );
      if (foundSesson) {
        return foundSesson.title;
      }
    }
    return 'Không rõ';
  };

  const getLessonTitle = (lessonId: string): string => {
    let result = 'Bài học';

    classEdit?.courses?.some(course =>
      course.sessons?.some((session: SessonEntity) =>
        session.lessons?.some((lesson: LessonEntity) => {
          if (lesson.id === lessonId) {
            result = lesson.title;
            return true;
          }
          return false;
        }),
      ),
    );

    return result;
  };

  return (
    <Drawer
      title={<span>TimeLine lộ trình lớp học</span>}
      placement="right"
      width={600}
      onClose={onClose}
      open={open}
      className="drawer-timeline"
    >
      {classEdit && classEdit.courses.length ? (
        <Tabs
          tabPosition="top"
          size="large"
          tabBarGutter={24}
          style={{ paddingBottom: '1rem' }}
          activeKey={tabActive}
          onChange={key => setTabActive(key)}
        >
          {(classEdit?.courses || []).map(course => {
            return (
              <Tabs.TabPane
                tab={<div className="">{course.title}</div>}
                key={course.id}
              >
                {loading ? (
                  <>
                    <div className="mt-10 flex items-center justify-center">
                      <Spin></Spin>
                    </div>
                  </>
                ) : (
                  <Timeline mode="left" style={{ marginTop: '30px' }}>
                    {sortedData?.map((item: any) => {
                      const isPast =
                        new Date(item.dueDate).getTime() <
                        new Date().setHours(0, 0, 0, 0);

                      return (
                        <Timeline.Item
                          key={item.id}
                          dot={
                            isPast ? (
                              <CheckCircleOutlined
                                style={{ fontSize: 16, color: 'green' }}
                              />
                            ) : (
                              <ClockCircleOutlined
                                style={{ fontSize: 16, color: '#1890ff' }}
                              />
                            )
                          }
                          color={isPast ? 'green' : 'blue'}
                          label={
                            <Tag
                              color={isPast ? 'green' : 'blue'}
                              style={{ fontSize: 14 }}
                            >
                              {new Date(item.dueDate).toLocaleDateString(
                                'vi-VN',
                                {
                                  weekday: 'short',
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                },
                              )}
                            </Tag>
                          }
                        >
                          <Space direction="vertical" size={4}>
                            <Title level={5} style={{ margin: 0 }}>
                              {getLessonTitle(item.lessonId)}
                            </Title>
                            <Text type="secondary">
                              Chương:{' '}
                              <strong>{getSessonTitle(item.sessonId)}</strong>
                            </Text>
                          </Space>
                        </Timeline.Item>
                      );
                    })}

                    {setup?.length === 0 && (
                      <Text type="secondary">Không có buổi học nào.</Text>
                    )}
                  </Timeline>
                )}
              </Tabs.TabPane>
            );
          })}
        </Tabs>
      ) : (
        <>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Chưa có khoá học"
          />
        </>
      )}
    </Drawer>
  );
};

export default TimeTable;
