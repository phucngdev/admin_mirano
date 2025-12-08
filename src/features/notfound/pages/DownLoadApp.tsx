import { Button, Result } from 'antd';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DownLoadApp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 700) {
        navigate('/auth/login');
      }
    };

    window.addEventListener('resize', handleResize);

    // Gọi một lần khi mount
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Result
        // status="404"
        title="Mankai"
        subTitle="Xin lỗi, vui lòng tải app để sử dụng."
        extra={
          <Link to="#">
            <Button type="primary">Tải App</Button>
          </Link>
        }
      />
    </>
  );
};

export default DownLoadApp;
