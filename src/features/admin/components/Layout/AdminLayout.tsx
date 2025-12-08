import { Card, Layout, message, Spin } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from '../../../../shared/components/Sidebar/Sidebar';
import { isLogin } from '#/src/utils/auth';
import Header from './Header';
import { useEffect, useState } from 'react';

const { Content } = Layout;

export function AdminLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const result = await isLogin();
      if (!result) {
        navigate('/auth/login');
      } else {
        setLoading(false);
      }
    };

    checkLogin();
  }, [navigate]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 700) {
        message.info(
          'Màn hình quá nhỏ, hãy tải app để có trải nghiệm tốt hơn!',
        );
        navigate('/down-app');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [navigate]);

  if (loading) {
    // ✅ loading hoặc kiểm tra đăng nhập => hiển thị spinner
    return (
      <div className="h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout className="min-h-screen">
      <Sidebar />
      <Layout>
        <Card>
          <Header />
        </Card>
        <Content className="p-4 m-0 min-h-[280px] bg-[#f0f2f5]">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
