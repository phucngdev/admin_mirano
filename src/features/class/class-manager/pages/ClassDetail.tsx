import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { getOneClass } from '#/src/redux/thunk/class.thunk';
import {
  Badge,
  Breadcrumb,
  Button,
  Card,
  message,
  Popover,
  Progress,
} from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import TableStudent from '../components/table/TableStudent';
import { Link } from 'react-router-dom';
import './index.scss';
import SidebarClassDetail from '../components/sidebar/SidebarClassDetail';
import {
  CalendarOutlined,
  CarryOutOutlined,
  ClockCircleOutlined,
  ExportOutlined,
  FieldTimeOutlined,
  FilePdfTwoTone,
  FireOutlined,
  MenuOutlined,
  QuestionCircleOutlined,
  ReadOutlined,
  ReconciliationOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import ms_excel from '#/assets/images/icon_button/ms_excel.png';
import TimeTable from '../components/drawer/TimeTable';
import Loading from '#/shared/components/loading/Loading';
import DrawerExport from '../components/drawer/DrawerExport';

const ClassDetail = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const data = useSelector((state: RootState) => state.class.classEdit);

  const [openTimeTable, setOpenTimeTable] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loading, setLoading] = useState<'class' | ''>('');
  const fetchData = async () => {
    if (!id) return;
    setLoading('class');
    await dispatch(getOneClass(id));
    setLoading('');
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const calcProgress = (
    startDateStr: string | Date,
    endDateStr: string | Date,
  ): number => {
    const now = new Date();
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);

    const total = end.getTime() - start.getTime();
    const passed = now.getTime() - start.getTime();

    if (now < start) return 0;
    if (now > end) return 100;

    const progress = (passed / total) * 100;
    return Math.round(progress);
  };

  if (loading === 'class') return <Loading />;

  return (
    <>
      <DrawerExport open={openDrawer} onClose={() => setOpenDrawer(false)} />
      <TimeTable open={openTimeTable} onClose={() => setOpenTimeTable(false)} />
      <Card className="class-detail-page">
        <div className="header-page">
          <Breadcrumb
            items={[
              {
                title: 'Quản lý lớp học',
              },
              {
                title: <Link to="/class-manager/class-room">Lớp học</Link>,
              },
              {
                title: <span>{data?.name}</span>,
              },
            ]}
          />
          <div className="group-btn">
            <Popover
              title="Menu"
              trigger="click"
              placement="bottomRight"
              open={openPopover}
              onOpenChange={setOpenPopover}
              content={
                <div className="flex items-start gap-4">
                  <div className="flex flex-col gap-3 items-start">
                    <Button
                      onClick={() => {
                        message.info('Chưa yêu cầu phát triển');
                        return;
                        navigate(`/class-manager/class-room/attendances/${id}`);
                      }}
                      className="w-full"
                    >
                      Điểm danh
                    </Button>
                    <Button
                      className="w-full"
                      onClick={() => {
                        setOpenTimeTable(true);
                        setOpenPopover(false);
                      }}
                    >
                      TimeLine lộ trình
                    </Button>
                    <Button
                      className="w-full"
                      onClick={() =>
                        navigate(`/class-manager/class-room/exam-result/${id}`)
                      }
                    >
                      Kết quả làm bài tập
                    </Button>
                  </div>
                  <div className="h-20 w-[1px] bg-[#c5c5c5]"></div>
                  <div className="flex flex-col gap-3 items-start">
                    <Button
                      onClick={() => {
                        setOpenPopover(false);
                        setOpenDrawer(true);
                      }}
                      icon={<ExportOutlined />}
                      className="w-full"
                    >
                      Xuất báo cáo
                    </Button>
                    {/* <Button
                      icon={<FilePdfTwoTone twoToneColor="#E2231A" />}
                      className="w-full"
                    >
                      Xuất báo cáo (PDF)
                    </Button> */}
                  </div>
                </div>
              }
            >
              <Button icon={<MenuOutlined />}></Button>
            </Popover>
            <Button
              icon={<CalendarOutlined />}
              onClick={() =>
                navigate(`/class-manager/class-room/setup-schedule/${id}`)
              }
              type="primary"
            >
              Lịch học
            </Button>
          </div>
        </div>
        <div className="content-class-detail">
          <div className="content-left-class-detail">
            <SidebarClassDetail />
          </div>
          <div className="content-right-class-detail">
            <div className="overview-class">
              <div className="overview-item">
                <span className="span-title-item">Hiệu suất lớp học</span>
                <span className="span-sub-title-item">
                  Tỉ lệ hoàn thành khóa học{' '}
                  <Popover
                    content={
                      <div
                        style={{
                          maxWidth: '400px',
                        }}
                      >
                        Tỉ lệ hoàn thành khóa học, hay còn gọi là Course
                        Completion Rate, là số lượng học viên đã hoàn thành khóa
                        học thành công chia cho tổng số học viên
                      </div>
                    }
                  >
                    <QuestionCircleOutlined />
                  </Popover>
                </span>
                <div className="progress-percent">
                  <Progress
                    type="dashboard"
                    // steps={10}
                    percent={data?.performance}
                    strokeWidth={20}
                    strokeColor={{
                      '0%': '#87d068',
                      '50%': '#ffe58f',
                      '100%': '#ffccc7',
                    }}
                  />
                </div>
              </div>
              <div className="overview-item">
                <div className="row-overview-percent">
                  <div className="row-title">
                    <div className="icon-row bg-[#dcffed]">
                      <ReadOutlined className="text-2xl text-green-600" />
                    </div>
                    <span className="span-title-row-overview">
                      Tổng số khoá học
                    </span>
                  </div>
                  <Badge
                    className="site-badge-count-109"
                    count={data?.courses.length || data?.totalCourse || 0}
                    showZero
                    style={{
                      backgroundColor: '#16a34a',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                </div>
                <div className="row-overview-percent">
                  <div className="row-title">
                    <div className="icon-row bg-[#e7f2ff]">
                      <CarryOutOutlined className="text-2xl text-blue-400" />
                    </div>
                    <span className="span-title-row-overview">
                      Khoá học đã hoàn thành
                    </span>
                  </div>
                  <Badge
                    className="site-badge-count-109"
                    count={data?.totalCourseDone || 0}
                    showZero
                    style={{
                      backgroundColor: '#60a5fa',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                </div>
                <div className="row-overview-percent">
                  <div className="row-title">
                    <div className="icon-row bg-[#fbffe7]">
                      <ReconciliationOutlined className="text-2xl text-yellow-600" />
                    </div>
                    <span className="span-title-row-overview">
                      Tổng số bài học
                    </span>
                  </div>
                  <Badge
                    className="site-badge-count-109"
                    count={
                      data?.courses.reduce(
                        (sum, course) => sum + (course.sessons?.length || 0),
                        0,
                      ) || 0
                    }
                    showZero
                    style={{
                      backgroundColor: '#ca8a04',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                </div>
              </div>
              <div className="overview-item">
                <div className="row-overview-percent">
                  <div className="row-title">
                    <div className="icon-row bg-[#ffe2dc]">
                      <ClockCircleOutlined className="text-2xl text-red-600" />
                    </div>
                    <span className="span-title-row-overview">
                      Ngày bắt đầu
                    </span>
                  </div>
                  <span> {dayjs(data?.startDate).format('YYYY/MM/DD')}</span>
                </div>
                <div className="row-overview-percent">
                  <div className="row-title">
                    <div className="icon-row bg-[#ffe2dc]">
                      <FieldTimeOutlined className="text-2xl text-red-600" />
                    </div>
                    <span className="span-title-row-overview">
                      Ngày kết thúc
                    </span>
                  </div>
                  <span> {dayjs(data?.endDate).format('YYYY/MM/DD')}</span>
                </div>
                <div className="row-overview-percent">
                  <div className="row-title">
                    <div className="icon-row bg-[#f4dcff]">
                      <FireOutlined className="text-2xl text-purple-600" />
                    </div>
                    <span className="span-title-row-overview">Tiến độ</span>
                  </div>
                  {data && (
                    <Progress
                      type="circle"
                      percent={calcProgress(data.startDate, data.endDate)}
                      size={40}
                      strokeWidth={14}
                    />
                  )}
                </div>
              </div>
            </div>
            <TableStudent />
          </div>
        </div>
      </Card>
    </>
  );
};

export default ClassDetail;
