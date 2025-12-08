import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import '../styles/index.css';

function PublicLayout() {
  return (
    // <Layout className="layout-container" style={{ minHeight: '100vh' }}>
    //   <Layout
    //     style={{
    //       backgroundColor: 'rgba(249, 250, 251, 1)',
    //       padding: '0',
    //       margin: '0 auto',
    //     }}
    //   >
    <Outlet />
    //   </Layout>
    // </Layout>
  );
}

export default PublicLayout;
