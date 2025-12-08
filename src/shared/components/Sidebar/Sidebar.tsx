import {
  BarChartOutlined,
  BookOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  FundProjectionScreenOutlined,
  GlobalOutlined,
  GroupOutlined,
  ProfileOutlined,
  ReadOutlined,
  RobotOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { SignOut } from '@phosphor-icons/react';
import { Button, Layout, Menu, Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.scss';
import logo from '/src/assets/images/header/logo_mirano.png';
import Cookies from 'js-cookie';

const { Sider } = Layout;

const menuItems = [
  {
    children: [
      { key: 'courses', label: 'Khóa học' },
      { key: 'questions', label: 'Bộ câu hỏi' },
    ],
    icon: <BookOutlined />,
    key: 'content',
    label: 'Quản lý nội dung',
  },
  {
    icon: <ReadOutlined />,
    key: 'minna',
    label: 'Chủ đề Minna',
  },
  {
    icon: <ProfileOutlined />,
    key: 'test',
    label: 'Thi thử',
  },
  {
    icon: <UserOutlined />,
    key: 'accounts',
    label: 'Tài khoản',
    children: [
      { key: 'students', label: 'Học viên' },
      { key: 'teachers', label: 'Giảng viên' },
      { key: 'partner', label: 'Đối tác' },
      { key: 'admin-system', label: 'Admin system' },
    ],
  },
  {
    icon: <GroupOutlined />,
    key: 'class-manager',
    label: 'Quản lý lớp học',
    children: [
      { key: 'class-room', label: 'Lớp học' },
      { key: 'class-room-dashboard', label: 'Báo cáo chung', disabled: true },
    ],
  },
];

export function Sidebar() {
  const navigate = useNavigate();

  const handleMenuClick = ({ keyPath }: { keyPath: string[] }) => {
    const path = keyPath.reverse().join('/');
    navigate(`/${path}`);
  };

  const handleLogout = () => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có muốn đăng xuất?`,
      okText: 'Đăng xuất',
      okType: 'danger',
      onOk: async () => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        navigate('/auth/login');
      },
      title: 'Xác nhận đăng xuất',
    });
  };

  return (
    <Sider className="sidebar min-h-screen" width={250}>
      <div className="logo-container h-24 flex items-center justify-center">
        <img alt="Logo" style={{ width: '164px', height: '60px' }} src={logo} />
      </div>
      <div className="menu-container">
        <Menu
          defaultOpenKeys={['content']}
          defaultSelectedKeys={['courses']}
          items={menuItems}
          mode="inline"
          onClick={handleMenuClick}
        />
        <div className="flex flex-col gap-4 items-center p-4 rounded-lg shadow-md">
          <Button
            danger
            block
            icon={<SignOut size={15} />}
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <p className="text-sm font-medium">Đăng xuất</p>
          </Button>
        </div>
      </div>
    </Sider>
  );
}
