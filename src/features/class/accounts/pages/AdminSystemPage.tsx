import { useEffect, useState } from 'react';
import './AccountPage.scss';
import {
  Breadcrumb,
  Button,
  Card,
  Input,
  message,
  Modal,
  Popover,
  Space,
  Table,
  TableColumnsType,
  TablePaginationConfig,
} from 'antd';
import ms_excel from '#/assets/images/icon_button/ms_excel.png';
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { getAllUser } from '#/src/redux/thunk/user.thunk';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UpsertUserDto, UserEntity } from '#/api/requests';
import ModalCreateUpdateAccount from '../components/modal/ModalCreateUpdateAccount';
import { deleteUserService } from '#/api/services/userService';

const columns = (
  handleEdit: (record: UserEntity) => void,
  handleNavigate: (id: string) => void,
  handleDelele: (record: UserEntity) => void,
): TableColumnsType<UserEntity> => [
  {
    title: 'Mã tài khoản',
    dataIndex: 'userCode',
    width: 110,
    render: text => (
      <span
        style={{
          color: 'rgba(16, 24, 40, 1)',
          fontWeight: '500',
          fontSize: '14px',
        }}
      >
        {text}
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
    title: 'Họ và tên',
    dataIndex: 'fullName',
    width: 130,
    render: (_, record) => (
      <span onClick={() => handleNavigate(record.id)} className="span-table">
        {record.fullName}
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
    title: 'Email',
    dataIndex: 'email',
    width: 220,
    render: text => (
      <span
        style={{
          color: 'rgba(102, 112, 133, 1)',
          fontWeight: '400',
          fontSize: '14px',
        }}
      >
        {text}
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
    title: 'Số điện thoại',
    dataIndex: 'phoneNumber',
    width: 100,
    render: text => (
      <span
        style={{
          color: 'rgba(102, 112, 133, 1)',
          fontWeight: '400',
          fontSize: '14px',
        }}
      >
        {text}
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
    width: 108,
    render: (_, record) => (
      <Space size="middle">
        <Button
          icon={<EditOutlined />}
          onClick={e => {
            e.stopPropagation();
            handleEdit(record);
          }}
          type="text"
        >
          Sửa
        </Button>
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={e => {
            e.stopPropagation();
            handleDelele(record);
          }}
          type="text"
        >
          Xóa
        </Button>
      </Space>
    ),
    onHeaderCell: () => ({
      style: {
        fontSize: '12px',
        color: 'rgba(102, 112, 133, 1)',
        fontWeight: '500',
      },
    }),
  },
];

const AdminSystemPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((state: RootState) => state.users);
  const [openModalAccount, setOpenModalAccount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [itemUpdate, setItemUpdate] = useState<UserEntity | null>(null);
  const [query, setQuery] = useState('');
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
    current: 1,
  });

  const fetchData = async () => {
    setLoading(true);
    await dispatch(
      getAllUser({
        limit: pagination.limit,
        offset: pagination.offset,
        query: query,
        userProfiles: UpsertUserDto.userProfiles.SYSTEM_ADMIN,
      }),
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [pagination, query]);

  const handleEdit = (record: UserEntity) => {
    setItemUpdate(record);
    setOpenModalAccount(true);
  };

  const handleNavigate = (id: string) => {
    // navigate(`/accounts/teachers/${id}`);
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current = 1, pageSize = 10 } = pagination;

    setPagination(prev => ({
      ...prev,
      current,
      limit: pageSize,
      offset: (current - 1) * pageSize,
    }));
  };

  const handleDelele = (record: UserEntity) => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa tài khoản "${record.fullName}"?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        try {
          await deleteUserService(record.id);
          message.success('Xóa tài khoản thành công!');
          fetchData();
        } catch (error) {
          message.error('Bạn không có quyền');
        }
      },
      title: 'Xác nhận xóa',
    });
  };

  return (
    <>
      <ModalCreateUpdateAccount
        open={openModalAccount}
        itemUpdate={itemUpdate}
        onClose={() => {
          setOpenModalAccount(false);
          setItemUpdate(null);
          fetchData();
        }}
      />
      <Card>
        <div className="account-page">
          <Breadcrumb
            items={[
              {
                title: <span>Quản lý lớp học</span>,
              },
              {
                title: <span>Tài khoản</span>,
              },
              {
                title: <span>Danh sách admin system</span>,
              },
            ]}
          />
          <header className="header-account-page">
            <span className="span-title">Danh sách Admin system</span>

            <div className="group-btn">
              <Input
                placeholder="Tìm kiếm"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <Popover
                title="Menu"
                trigger="click"
                placement="bottomRight"
                content={
                  <div className="flex flex-col items-start gap-2">
                    <Button
                      type="primary"
                      icon={<DownloadOutlined />}
                      className="w-full"
                    >
                      Tải file mẫu
                    </Button>
                    <Button icon={<UploadOutlined />} className="w-full">
                      Import danh sách
                    </Button>
                  </div>
                }
              >
                <Button>
                  <img src={ms_excel} alt="icon-excel" />
                  Tải danh sách
                </Button>
              </Popover>
              <Button
                type="primary"
                onClick={() => setOpenModalAccount(true)}
                icon={<PlusOutlined />}
              >
                Thêm tài khoản
              </Button>
            </div>
          </header>
          <div className="table-account">
            <Table<UserEntity>
              columns={columns(handleEdit, handleNavigate, handleDelele)}
              dataSource={data?.items || []}
              pagination={{
                pageSize: pagination.limit,
                showSizeChanger: true,
                showTotal: total => `Tổng số ${total} khóa học`,
                total: data?.meta?.total || 0,
              }}
              onChange={handleTableChange}
              rowKey="id"
              rowSelection={{ type: 'checkbox' }}
              scroll={{ x: 'max-content' }}
              loading={loading}
              // onRow={record => ({
              //   onClick: () => handleNavigate(record.id),
              //   style: { cursor: 'pointer' },
              // })}
            />
          </div>
        </div>
      </Card>
    </>
  );
};

export default AdminSystemPage;
