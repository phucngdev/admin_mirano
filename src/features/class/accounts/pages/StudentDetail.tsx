import { RootState, useAppDispatch } from '#/src/redux/store/store';
import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Dropdown,
  MenuProps,
  message,
  Popover,
  Steps,
  StepsProps,
  Tabs,
  TabsProps,
} from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './StudentDetail.scss';
import { Link } from 'react-router-dom';
import { MoreOutlined, SettingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import OverviewStudent from '../components/student-detail/OverviewStudent';
import StudentScoreTable from '../components/student-detail/StudentScoreTable';
import UserLearningProgress from '../components/tab/UserLearningProgress';
import LearningScheduleTable from '../components/tab/LearningScheduleTab';
import { getStudentDetail } from '#/src/redux/thunk/class.thunk';
import Loading from '#/shared/components/loading/Loading';
import dayjs from 'dayjs';
import { exportReportService } from '#/api/services/userService';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Chỉnh sửa',
  },
  {
    type: 'divider',
  },
  {
    key: '2',
    label: 'Xuất file điểm danh',
    // extra: '⌘P',
  },
  {
    key: '4',
    label: 'Cài đặt',
    icon: <SettingOutlined />,
    // extra: '⌘S',
  },
];

const itemsTab: TabsProps['items'] = [
  {
    key: '1',
    label: 'Lịch học',
    children: <LearningScheduleTable />,
  },
  {
    key: '2',
    label: 'Kết quả học tập',
    children: <UserLearningProgress />,
  },
];

const customDot: StepsProps['progressDot'] = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }
  >
    {dot}
  </Popover>
);

const StudentDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { student } = useSelector((state: RootState) => state.users);
  const [openScore, setOpenScore] = useState(false);
  const [loading, setLoading] = useState<'student' | 'export' | ''>('');

  const fetchData = async () => {
    if (!id) return;
    setLoading('student');
    await dispatch(getStudentDetail(id));
    setLoading('');
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleExport = async () => {
    if (!id) return;
    try {
      setLoading('export');
      const res = await exportReportService(id);

      const blob = new Blob([res.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      link.download = `Báo cáo học viên - ${student?.student.fullName}.xlsx`;
      link.click();
      window.URL.revokeObjectURL(url);

      message.success('Xuất báo cáo thành công!');
    } catch (err) {
      console.log('🚀 ~ handleExport ~ err:', err);
      message.error('Xuất báo cáo thất bại!');
    } finally {
      setLoading('');
    }
  };

  if (loading === 'student') return <Loading />;

  return (
    student && (
      <>
        <Card className="student-detail-page">
          <Breadcrumb
            items={[
              {
                title: <span>Quản lý lớp học</span>,
              },
              {
                title: <span>Tài khoản</span>,
              },
              {
                title: <Link to="/accounts/students">Danh sách học viên</Link>,
              },
              {
                title: <span>{student.student.fullName}</span>,
              },
            ]}
          />
          <div className="header-info">
            <div className="left-info">
              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}
              >
                {student.student.fullName[0]}
              </Avatar>
              <div className="infomation">
                <span className="title-name">{student.student.fullName}</span>
                <div className="information-grid">
                  <div className="info-item">
                    <div className="title">Mã học viên</div>
                    <div className="value">{student.student.userCode}</div>
                  </div>
                  <div className="partition"></div>
                  <div className="info-item">
                    <div className="title">Email</div>
                    <div className="value">{student.student.email}</div>
                  </div>
                  <div className="partition"></div>
                  <div className="info-item">
                    <div className="title">Số điện thoại</div>
                    <div className="value">{student.student.phoneNumber}</div>
                  </div>
                  <div className="partition"></div>
                  <div className="info-item">
                    <div className="title">Ngày sinh</div>
                    <div className="value">
                      {dayjs(student.student.birthday).format('DD/MM/YYYY') ||
                        'trống'}
                    </div>
                  </div>
                  <div className="partition"></div>
                  <div className="info-item">
                    <div className="title">Địa chỉ</div>
                    <div className="value">
                      {student.student.address || 'trống'}
                    </div>
                  </div>
                  <div className="partition"></div>
                </div>
              </div>
            </div>
            <div className="right-info">
              <Dropdown menu={{ items }}>
                <Button icon={<MoreOutlined />}></Button>
              </Dropdown>
              <Button onClick={() => setOpenScore(true)}>Bảng điểm</Button>
              <Button>Gửi mail</Button>
              <Button
                type="primary"
                loading={loading === 'export'}
                ghost
                onClick={handleExport}
              >
                Xuất báo cáo
              </Button>
            </div>
          </div>
        </Card>

        {openScore && (
          <>
            <br />
            <StudentScoreTable onClose={() => setOpenScore(false)} />
          </>
        )}
        <br />
        <OverviewStudent />
        <br />
        {/* <Card>
          <Steps
            current={1}
            progressDot={customDot}
            items={[
              {
                title: 'Kết thúc',
                description: 'N5 - Chương 1',
              },
              {
                title: 'Đang thực hiện',
                description: 'N5 - Chương 2',
              },
              {
                title: 'Waiting',
                description: 'N5 - Chương 3',
              },
              {
                title: 'Waiting',
                description: 'N5 - Chương 4',
              },
              {
                title: 'Waiting',
                description: 'N5 - Chương 5',
              },
              {
                title: 'Waiting',
                description: 'N5 - Chương 5',
              },
              {
                title: 'Waiting',
                description: 'N5 - Chương 5',
              },
              {
                title: 'Waiting',
                description: 'N5 - Chương 5',
              },
              {
                title: 'Waiting',
                description: 'N5 - Chương 5',
              },
              {
                title: 'Waiting',
                description: 'N5 - Chương 5',
              },
              {
                title: 'Waiting',
                description: 'N5 - Chương 5',
              },
              {
                title: 'Waiting',
                description: 'N5 - Chương 5',
              },
              {
                title: 'Waiting',
                description: 'N5 - Chương 5',
              },
              {
                title: 'Waiting',
                description: 'N5 - Chương 5',
              },
              {
                title: 'Waiting',
                description: 'N5 - Chương 5',
              },
              {
                title: 'Waiting',
                description: 'N5 - Chương 5',
              },
            ]}
          />
        </Card> */}
        <Card>
          <Tabs defaultActiveKey="1" items={itemsTab} />
        </Card>
        <br />
        {/* <TableStudentCourse /> */}
      </>
    )
  );
};

export default StudentDetail;
