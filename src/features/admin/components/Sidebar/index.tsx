import {
  BarChartOutlined,
  BookOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  FundProjectionScreenOutlined,
  GlobalOutlined,
  RobotOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import logo from '/src/assets/images/login/logoMankai.png';

const { Sider } = Layout;

const menuItems = [
  {
    children: [
      { key: 'courses', label: 'Khóa học' },
      { key: 'combos', label: 'Combo khóa học' },
      { key: 'memberships', label: 'Membership' },
    ],
    icon: <BookOutlined />,
    key: 'content',
    label: 'Quản lý nội dung',
  },
  {
    icon: <UserOutlined />,
    key: 'accounts',
    label: 'Quản lý tài khoản',
  },
  {
    icon: <ShoppingCartOutlined />,
    key: 'sales',
    label: 'Quản lý bán hàng',
  },
  {
    icon: <FundProjectionScreenOutlined />,
    key: 'marketing',
    label: 'Marketing',
  },
  {
    icon: <TeamOutlined />,
    key: 'affiliate',
    label: 'Quản lý Affiliate',
  },
  {
    icon: <RobotOutlined />,
    key: 'automation',
    label: 'Tự động hóa',
  },
  {
    icon: <BarChartOutlined />,
    key: 'reports',
    label: 'Báo cáo',
  },
  {
    icon: <SafetyCertificateOutlined />,
    key: 'certificates',
    label: 'Chứng chỉ khóa học',
  },
  {
    icon: <CustomerServiceOutlined />,
    key: 'support',
    label: 'Hỗ trợ khách hàng',
  },
  {
    icon: <GlobalOutlined />,
    key: 'website',
    label: 'Xem website',
  },
  {
    icon: <FileTextOutlined />,
    key: 'blog',
    label: 'Quản lý Blog',
  },
  {
    children: [
      { key: 'display', label: 'Cài đặt hiển thị' },
      { key: 'system', label: 'Cài đặt hệ thống' },
    ],
    icon: <SettingOutlined />,
    key: 'settings',
    label: 'Cài đặt',
  },
];

export function Sidebar() {
  const navigate = useNavigate();

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(`/admin/${key}`);
  };

  return (
    <Sider className="min-h-screen" theme="dark" width={250}>
      <div className="h-16 flex items-center justify-center">
        <img alt="Logo" className="h-8" src={logo} />
      </div>
      <Menu
        defaultSelectedKeys={['courses']}
        items={menuItems}
        mode="inline"
        onClick={handleMenuClick}
        theme="dark"
      />
    </Sider>
  );
}
