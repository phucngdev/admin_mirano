import { RootState, useAppDispatch } from '#/src/redux/store/store';
import {
  CarryOutOutlined,
  FieldTimeOutlined,
  FileDoneOutlined,
  FlagOutlined,
  ReadOutlined,
  ReconciliationOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Calendar,
  Card,
  Col,
  Radio,
  Row,
  Select,
  Tabs,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import dayLocaleData from 'dayjs/plugin/localeData';
import star from '#/assets/images/user/star.png';
import rank from '#/assets/images/user/rank.png';
import { useEffect, useMemo, useState } from 'react';
import { ClassEntity } from '#/api/requests';
import { getClassStudentDetail } from '#/src/redux/thunk/class.thunk';
import { useParams } from 'react-router-dom';
dayjs.extend(dayLocaleData);

const OverviewStudent = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { student, classStudent } = useSelector(
    (state: RootState) => state.users,
  );
  const [activeClass, setActiveClass] = useState<ClassEntity | null>(null);

  const fetchData = async () => {
    if (!activeClass || !id) return;
    await dispatch(
      getClassStudentDetail({
        classId: activeClass.id,
        studentId: id,
      }),
    );
  };

  useEffect(() => {
    fetchData();
  }, [activeClass, id]);

  useEffect(() => {
    if (student) {
      setActiveClass(student.classes[0]);
    }
  }, [student]);

  const startDate = useMemo(() => {
    if (!activeClass) return;
    const findClass = student?.classes.find(c => c.id === activeClass.id);
    return findClass && dayjs(findClass.startDate);
  }, [activeClass]);

  const endDate = useMemo(() => {
    if (!activeClass) return;
    const findClass = student?.classes.find(c => c.id === activeClass.id);
    return findClass && dayjs(findClass.endDate);
  }, [activeClass]);

  return (
    classStudent &&
    activeClass && (
      <>
        <Card className="student-detail-page">
          <div className="student-detail-overview">
            <div className="data-table">
              <div className="item-data-table">
                <span className="title-item-data">Số khoá học</span>
                <div className="number-item-data">
                  <span className="number-data">
                    {classStudent.courseCount < 10 && '0'}
                    {classStudent.courseCount}
                  </span>
                  <div className="icon-data">
                    <ReadOutlined className="text-3xl" />
                  </div>
                </div>
              </div>
              <div className="item-data-table">
                <span className="title-item-data">Khoá học hoàn thành</span>
                <div className="number-item-data">
                  <span className="number-data">
                    {classStudent.finishedCourseCount < 10 && '0'}
                    {classStudent.finishedCourseCount}
                  </span>
                  <div className="icon-data">
                    <FileDoneOutlined className="text-3xl" />
                  </div>
                </div>
              </div>
              <div className="item-data-table">
                <span className="title-item-data">Khoá đang học</span>
                <div className="number-item-data">
                  <span className="number-data">
                    {classStudent.inProgressCourseCount < 10 && '0'}
                    {classStudent.inProgressCourseCount}
                  </span>
                  <div className="icon-data">
                    <FlagOutlined className="text-3xl" />
                  </div>
                </div>
              </div>
              <div className="item-data-table">
                <span className="title-item-data">Số bài học</span>
                <div className="number-item-data">
                  <span className="number-data">
                    {classStudent.sessonCount < 10 && '0'}
                    {classStudent.sessonCount}
                  </span>
                  <div className="icon-data">
                    <ReconciliationOutlined className="text-3xl" />
                  </div>
                </div>
              </div>
              <div className="item-data-table">
                <span className="title-item-data">Bài hoàn thành</span>
                <div className="number-item-data">
                  <span className="number-data">
                    {classStudent.finishedSessonCount < 10 && '0'}
                    {classStudent.finishedSessonCount}
                  </span>
                  <div className="icon-data">
                    <CarryOutOutlined className="text-3xl" />
                  </div>
                </div>
              </div>
              <div className="item-data-table">
                <span className="title-item-data">Bài quá hạn</span>
                <div className="number-item-data">
                  <span className="number-data">
                    {classStudent.overdueSessonCount < 10 && '0'}
                    {classStudent.overdueSessonCount}
                  </span>
                  <div className="icon-data">
                    <FieldTimeOutlined className="text-3xl" />
                  </div>
                </div>
              </div>
              <div className="item-data-table">
                <span className="title-item-data">Thông tin lớp</span>
                <Tabs
                  defaultActiveKey="1"
                  tabPosition="left"
                  className="w-full"
                  items={
                    student?.classes?.map(cls => ({
                      key: cls.id.toString(),
                      label: cls.name,
                      children: (
                        <div className="flex items-center justify-between w-full py-2">
                          <div className="">{cls.name}</div> |
                          <div className="">
                            Ngày bắt đầu:{' '}
                            {dayjs(cls.startDate).format('DD/MM/YYYY')}
                          </div>{' '}
                          |
                          <div className="">
                            Ngày kết thúc:{' '}
                            {dayjs(cls.endDate).format('DD/MM/YYYY')}
                          </div>
                        </div>
                      ),
                    })) || []
                  }
                  onChange={key => {
                    const findClass = student?.classes.find(c => c.id === key);
                    if (findClass) setActiveClass(findClass);
                  }}
                />
              </div>
            </div>
            <div className="student-checkin">
              {/* <div className="progress-col">
              <div className="progress-row">
                <span className="progress-label">Điểm danh: 8/10</span>
                <Progress percent={80} size="small" strokeColor="#52c41a" />
              </div>
              <div className="progress-row">
                <span className="progress-label">Vắng mặt: 1</span>
                <Progress percent={10} size="small" strokeColor="#ff4d4e" />
              </div>
              <div className="progress-row">
                <span className="progress-label">Muộn: 1</span>
                <Progress percent={10} size="small" strokeColor="#2b9dcb" />
              </div>
            </div> */}
              <div className="ranking">
                <img src={rank} alt="start" className="background-rank" />
                <div className="rank-info">
                  <div className="top-rank">1</div>
                  <Avatar
                    size={40}
                    style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}
                  >
                    {student?.student.fullName[0]}
                  </Avatar>
                  <span className="rank-fullname">
                    {student?.student.fullName}
                  </span>
                </div>
                <div className="rank-star">
                  <img src={star} alt="star" />
                  <span className="number-star">Chưa có</span>
                </div>
              </div>
              <Calendar
                fullscreen={false}
                headerRender={({ value, type, onChange, onTypeChange }) => {
                  const start = 0;
                  const end = 12;
                  const monthOptions = [];

                  let current = value.clone();
                  const localeData = value.localeData();
                  const months = [];
                  for (let i = 0; i < 12; i++) {
                    current = current.month(i);
                    months.push(localeData.monthsShort(current));
                  }

                  for (let i = start; i < end; i++) {
                    monthOptions.push(
                      <Select.Option key={i} value={i} className="month-item">
                        {months[i]}
                      </Select.Option>,
                    );
                  }

                  const year = value.year();
                  const month = value.month();
                  const options = [];
                  for (let i = year - 10; i < year + 10; i += 1) {
                    options.push(
                      <Select.Option key={i} value={i} className="year-item">
                        {i}
                      </Select.Option>,
                    );
                  }
                  return (
                    <div
                      style={{
                        padding: 8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography.Title level={4} style={{ margin: '0' }}>
                        Lịch học
                      </Typography.Title>
                      <Row gutter={8}>
                        <Col>
                          <Radio.Group
                            size="small"
                            onChange={e => onTypeChange(e.target.value)}
                            value={type}
                          >
                            <Radio.Button value="month">Month</Radio.Button>
                            <Radio.Button value="year">Year</Radio.Button>
                          </Radio.Group>
                        </Col>
                        <Col>
                          <Select
                            size="small"
                            popupMatchSelectWidth={false}
                            className="my-year-select"
                            value={year}
                            onChange={newYear => {
                              const now = value.clone().year(newYear);
                              onChange(now);
                            }}
                          >
                            {options}
                          </Select>
                        </Col>
                        <Col>
                          <Select
                            size="small"
                            popupMatchSelectWidth={false}
                            value={month}
                            onChange={newMonth => {
                              const now = value.clone().month(newMonth);
                              onChange(now);
                            }}
                          >
                            {monthOptions}
                          </Select>
                        </Col>
                      </Row>
                    </div>
                  );
                }}
                disabledDate={current =>
                  current.isBefore(startDate) || current.isAfter(endDate)
                }
              />
              {/* <div className="title-list-recent">
              <span className="">Bài học gần đây</span>
            </div>
            <div className="list-recent">
              {Array.from({ length: 2 }).map((item, index) => (
                <div className="item-recent" key={index}>
                  <span className="title-recent">Ngữ pháp</span>
                  <div className="rank-star">
                    <img src={star} alt="star" />
                    <span className="number-star">21</span>
                  </div>
                </div>
              ))}
              <div className="load-more">
                <Button type="primary" className="bg-[#f4b64a]">
                  Xem thêm
                </Button>
              </div>
            </div> */}
            </div>
          </div>
        </Card>
      </>
    )
  );
};

export default OverviewStudent;
