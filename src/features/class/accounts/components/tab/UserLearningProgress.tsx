import React, { useEffect, useState } from 'react';
import { Tabs, Progress, List, Card, Col, Row, Button, message } from 'antd';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  getOneClass,
  getResultCourseDetail,
} from '#/src/redux/thunk/class.thunk';
import { ClassEntity, SessonProgressOfStudentEntity } from '#/api/requests';
import Loading from '#/shared/components/loading/Loading';

const { TabPane } = Tabs;

const UserLearningProgress: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { result_course, student } = useSelector(
    (state: RootState) => state.users,
  );
  const { classEdit } = useSelector((state: RootState) => state.class);

  const [activeClass, setActiveClass] = useState<string>('');
  const [activeCourse, setActiveCourse] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (student) {
      setActiveClass(student.classes?.[0]?.id);
    }
  }, [student]);

  useEffect(() => {
    if (classEdit) {
      setActiveCourse(classEdit.courses?.[0]?.id);
    }
  }, [classEdit]);

  const fetchData = async () => {
    if (!activeClass || !id || !activeCourse) return;
    setLoading(true);
    await dispatch(
      getResultCourseDetail({
        classId: activeClass,
        studentId: id,
        courseId: activeCourse,
      }),
    );
    setLoading(false);
  };

  const fetchDataClass = async () => {
    if (!activeClass) return;
    await dispatch(getOneClass(activeClass));
  };

  useEffect(() => {
    fetchData();
  }, [id, activeClass]);

  useEffect(() => {
    fetchDataClass();
  }, [activeClass]);

  if (loading) return <Loading />;

  return activeClass && classEdit ? (
    <Card title="Kết quả học tập theo khóa">
      <Tabs
        defaultActiveKey={activeClass}
        onChange={key => setActiveClass(key)}
        tabPosition="left"
      >
        {student?.classes.map(cls => (
          <TabPane tab={cls.name} key={cls.id}>
            <Tabs
              defaultActiveKey={cls.id}
              onChange={key => setActiveCourse(key)}
            >
              {classEdit?.courses.map(course => {
                if (!result_course) return;
                const progressPercent = Math.round(
                  (result_course.finishedSessonCount /
                    result_course.sessonCount) *
                    100,
                );

                return (
                  <TabPane tab={course.title} key={course.id}>
                    <Tabs defaultActiveKey="overview" type="card">
                      <TabPane tab="Tổng quan" key="overview">
                        <br />
                        <p>
                          Tiến độ hoàn thành:{' '}
                          {result_course?.finishedSessonCount}/
                          {result_course?.sessonCount} chương
                        </p>
                        <Progress percent={progressPercent} />
                      </TabPane>

                      <TabPane tab="Chi tiết chương" key="chapters">
                        <List
                          dataSource={result_course.sessons || []}
                          renderItem={(
                            sesson: SessonProgressOfStudentEntity,
                          ) => (
                            <List.Item>
                              <List.Item.Meta
                                title={sesson.title}
                                description={`Hoàn thành ${sesson.progress}%`}
                              />
                            </List.Item>
                          )}
                        />
                      </TabPane>

                      <TabPane tab="Điểm số" key="scores">
                        <Row gutter={[16, 16]}>
                          {result_course.examResults.map((quiz, index) => {
                            const color =
                              quiz.point >= 8
                                ? 'green'
                                : quiz.point >= 5
                                  ? 'orange'
                                  : 'red';

                            return (
                              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                                <Card
                                  title={
                                    <div className="flex items-center justify-between">
                                      {quiz.examName}
                                      <Button
                                        onClick={() =>
                                          message.info('Chưa yêu cầu chức năng')
                                        }
                                      >
                                        Nhận xét
                                      </Button>
                                    </div>
                                  }
                                  bordered={false}
                                >
                                  <Progress
                                    percent={quiz.point * 10}
                                    strokeColor={color}
                                    status="active"
                                  />
                                  <p style={{ marginTop: 8 }}>
                                    <strong>Điểm:</strong> {quiz.point}
                                  </p>
                                </Card>
                              </Col>
                            );
                          })}
                        </Row>
                      </TabPane>
                    </Tabs>
                  </TabPane>
                );
              })}
            </Tabs>
          </TabPane>
        ))}
      </Tabs>
    </Card>
  ) : (
    <Card title="Học viên chưa có lớp"></Card>
  );
};

export default UserLearningProgress;
