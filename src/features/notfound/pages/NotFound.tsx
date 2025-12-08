import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Xin lỗi, trang bạn đã truy cập không tồn tại."
        extra={
          <Link to="/auth/login">
            <Button type="primary">Quay lại</Button>
          </Link>
        }
      />
    </>
  );
};

export default NotFound;
