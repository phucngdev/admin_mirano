import { RootState } from '#/src/redux/store/store';
import { KeyOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Input, MenuProps, Space } from 'antd';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ModalChangePassword from '../Modal/ModalChangePassword';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Cập nhật',
    disabled: true,
  },
  {
    type: 'divider',
  },
  {
    key: '2',
    label: 'Profile',
    extra: '⌘P',
    disabled: true,
  },
  {
    key: '3',
    label: 'Billing',
    extra: '⌘B',
    disabled: true,
  },
  {
    key: '4',
    label: 'Đổi mật khẩu',
    icon: <KeyOutlined />,
  },
  {
    key: '5',
    label: 'Settings',
    icon: <SettingOutlined />,
    extra: '⌘S',
    disabled: true,
  },
];

const Header = () => {
  const userStr = Cookies.get('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const [openModal, setOpenModal] = useState(false);

  const handleMenuClick: MenuProps['onClick'] = info => {
    if (info.key === '4') {
      setOpenModal(true);
    }
  };

  return (
    <>
      <ModalChangePassword
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
      <Space className="w-full justify-between">
        <Input placeholder="Tìm kiếm" className="w-[250px]" />
        <Space>
          <span>Trang quản trị Mirano</span>
          <span>|</span>
          <span>{user?.fullName}</span>
          <Dropdown
            menu={{ items, onClick: handleMenuClick }}
            placement="bottomRight"
            arrow
          >
            <Avatar
              style={{
                backgroundColor: '#fde3cf',
                color: '#f56a00',
                cursor: 'pointer',
              }}
            >
              {user?.fullName[0]}
            </Avatar>
          </Dropdown>
        </Space>
      </Space>
    </>
  );
};

export default Header;
