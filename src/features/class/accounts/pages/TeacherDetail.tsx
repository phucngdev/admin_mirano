import { RootState, useAppDispatch } from '#/src/redux/store/store';
import {
  CopyTwoTone,
  EditOutlined,
  EnvironmentTwoTone,
  MailTwoTone,
  PhoneTwoTone,
  SettingOutlined,
} from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Card,
  Image,
  MenuProps,
  Table,
  TableColumnsType,
  Tag,
} from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import './TeacherDetail.scss';
import { fallback } from '#/shared/constants/fallback';
import dayjs from 'dayjs';
import { ClassEntity } from '#/api/requests';

const columns = (): TableColumnsType<ClassEntity> => [
  {
    title: 'Tên khoá học',
    dataIndex: 'name',
    render: (_, record) => <span className="span-table">{record.name}</span>,
    onHeaderCell: () => ({
      style: {
        fontSize: '12px',
        color: 'rgba(102, 112, 133, 1)',
        fontWeight: '500',
      },
    }),
  },
  {
    title: 'Ngày khai giảng',
    dataIndex: 'startDate',
    width: 220,
    render: text => (
      <span
        style={{
          color: 'rgba(102, 112, 133, 1)',
          fontWeight: '400',
          fontSize: '14px',
        }}
      >
        {dayjs(text).format('YYYY/MM/DD')}
      </span>
    ),
    onHeaderCell: () => ({
      style: {
        fontSize: '12px',
        color: 'rgba(102, 112, 133, 1)',
        fontWeight: '500',
      },
    }),
  },
  {
    title: 'Ngày kết thúc',
    dataIndex: 'endDate',
    width: 220,
    render: text => (
      <span
        style={{
          color: 'rgba(102, 112, 133, 1)',
          fontWeight: '400',
          fontSize: '14px',
        }}
      >
        {dayjs(text).format('YYYY/MM/DD')}
      </span>
    ),
    onHeaderCell: () => ({
      style: {
        fontSize: '12px',
        color: 'rgba(102, 112, 133, 1)',
        fontWeight: '500',
      },
    }),
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    width: 220,
    render: (_, record) => {
      const isCompleted = dayjs().isAfter(dayjs(record.endDate), 'day');

      return (
        <Tag color={isCompleted ? 'green' : 'blue'}>
          {isCompleted ? 'Hoàn thành' : 'Đang diễn ra'}
        </Tag>
      );
    },
    onHeaderCell: () => ({
      style: {
        fontSize: '12px',
        color: 'rgba(102, 112, 133, 1)',
        fontWeight: '500',
      },
    }),
  },
];

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

const TeacherDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => state.users.teacehrFakeData);
  const fetchData = async () => {
    if (!id) return;
    // await dispatch(getOneUser(id));
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="teacher-detail-page">
      <Card className="">
        <Breadcrumb
          items={[
            {
              title: <span>Quản lý lớp học</span>,
            },
            {
              title: <span>Tài khoản</span>,
            },
            {
              title: <Link to="/accounts/teachers">Danh sách giảng viên</Link>,
            },
            {
              title: <Link to="">{data.fullName}</Link>,
            },
          ]}
        />
        {/* <div className="header-info">
          <div className="left-info">
            <Avatar
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
              style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}
            >
              {userFakeData.fullName[0]}
            </Avatar>
            <div className="infomation">
              <span className="title-name">{userFakeData.fullName}</span>
              <div className="information-grid">
                <div className="info-item">
                  <div className="title">Mã giảng viên</div>
                  <div className="value">{userFakeData.userCode}</div>
                </div>
                <div className="partition"></div>
                <div className="info-item">
                  <div className="title">Email</div>
                  <div className="value">{userFakeData.email}</div>
                </div>
                <div className="partition"></div>
                <div className="info-item">
                  <div className="title">Số điện thoại</div>
                  <div className="value">{userFakeData.phoneNumber}</div>
                </div>
                <div className="partition"></div>
                <div className="info-item">
                  <div className="title">Ngày sinh</div>
                  <div className="value">{userFakeData.birthday}</div>
                </div>
                <div className="partition"></div>
                <div className="info-item">
                  <div className="title">Địa chỉ</div>
                  <div className="value">{userFakeData.address}</div>
                </div>
                <div className="partition"></div>
                <div className="info-item">
                  <div className="title">Ngày cấp tài khoản</div>
                  <div className="value">{userFakeData.createdAt}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="right-info">
            <Button>Gửi mail</Button>
            <Dropdown menu={{ items }}>
              <Button icon={<MoreOutlined />}></Button>
            </Dropdown>
          </div>
        </div> */}
      </Card>
      <br />
      <div className="content-profile">
        <div className="teacher-left-profile">
          <Card className="teacher-profile">
            <Image
              width={'100%'}
              height={100}
              src="error"
              fallback={fallback}
            />
            <div className="teacher-name">{data.fullName}</div>
            <button className="teacher-usercode">
              ID: {data.userCode} <CopyTwoTone />
            </button>
            <Button icon={<EditOutlined />} className="w-full" type="primary">
              Chỉnh sửa thông tin
            </Button>
          </Card>
          <br />
          <Card className="teacher-contact">
            <span className="title-contact">Thông tin liên hệ</span>
            <div className="contact-item">
              <span className="title-contact-item">Địa chỉ:</span>
              <div className="contact-item-detail">
                <EnvironmentTwoTone twoToneColor="" className="text-xl" />{' '}
                {data.address}
              </div>
            </div>
            <div className="contact-item">
              <span className="title-contact-item">Số điện thoại:</span>
              <div className="contact-item-detail">
                <PhoneTwoTone twoToneColor="" className="text-xl" />{' '}
                {data.phoneNumber}
              </div>
            </div>
            <div className="contact-item">
              <span className="title-contact-item">Email:</span>
              <div className="contact-item-detail">
                <MailTwoTone twoToneColor="" className="text-xl" /> {data.email}
              </div>
            </div>
          </Card>
        </div>
        <Card className="teacher-mission">
          <div className="title-table-class">Danh sách lớp học</div>
          <Table<ClassEntity>
            columns={columns()}
            dataSource={data?.class}
            rowKey="id"
            // rowSelection={{ type: 'checkbox' }}
            scroll={{ x: 'max-content' }}
          />
        </Card>
      </div>
    </div>
  );
};

export default TeacherDetail;
