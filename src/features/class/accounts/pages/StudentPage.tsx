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
  Radio,
  Space,
  Table,
  TableColumnsType,
  TablePaginationConfig,
  Upload,
} from 'antd';
import ms_excel from '#/assets/images/icon_button/ms_excel.png';
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import ModalCreateUpdateAccount from '../components/modal/ModalCreateUpdateAccount';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { getAllUser } from '#/src/redux/thunk/user.thunk';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UpsertUserDto, UserEntity } from '#/api/requests';
import {
  deleteUserService,
  importUserService,
} from '#/api/services/userService';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { beforeUploadExcel } from '#/shared/props/beforeUpload';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

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
    title: 'Ngày sinh',
    dataIndex: 'birthday',
    width: 110,
    render: text => (
      <span
        style={{
          color: 'rgba(102, 112, 133, 1)',
          fontWeight: '400',
          fontSize: '14px',
        }}
      >
        {text ? dayjs(text).format('DD/MM/YYYY') : ''}
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
    title: 'Địa chỉ',
    dataIndex: 'address',
    width: 110,
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

  // {
  //   title: 'Loại',
  //   dataIndex: 'userType',
  //   width: 110,
  //   render: text => {
  //     let color = '';
  //     let backgroundColor = '';

  //     if (text === UserEntity.userType.NEW_USER) {
  //       color = 'rgba(2, 122, 72, 1)';
  //       backgroundColor = 'rgba(236, 253, 243, 1)';
  //     } else if (text === UserEntity.userType.PAID_USER) {
  //       color = 'rgba(181, 71, 8, 1)';
  //       backgroundColor = 'rgba(255, 250, 235, 1)';
  //     } else if (text === 'Giảng viên') {
  //       color = 'rgba(193, 21, 116, 1)';
  //       backgroundColor = 'rgba(253, 242, 250, 1)';
  //     }

  //     return (
  //       <span
  //         style={{
  //           color,
  //           backgroundColor,
  //           fontWeight: '500',
  //           fontSize: '12px',
  //           padding: '2px 8px',
  //           borderRadius: '16px',
  //           textAlign: 'center',
  //         }}
  //       >
  //         {text === UserEntity.userType.NEW_USER && 'Miễn phí'}
  //         {text === UserEntity.userType.PAID_USER && 'Trả phí'}
  //       </span>
  //     );
  //   },
  //   onHeaderCell: () => ({
  //     style: {
  //       fontSize: '12px',
  //       color: 'rgba(102, 112, 133, 1)',
  //       fontWeight: '500',
  //     },
  //   }),
  // },
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

const StudentPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state: RootState) => state.users);

  const [filter, setFilter] = useState<'STUDENT' | 'TEACHER' | ''>('');
  const [itemUpdate, setItemUpdate] = useState<UserEntity | null>(null);
  const [loading, setLoading] = useState(false);
  const [openModalAccount, setOpenModalAccount] = useState(false);
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
        userProfiles: UpsertUserDto.userProfiles.STUDENT,
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
    navigate(`/accounts/students/${id}`);
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
          const result = await deleteUserService(record.id);
          message.success('Xóa tài khoản thành công!');
          fetchData();
        } catch (error) {
          message.error('Bạn không có quyền');
        }
      },
      title: 'Xác nhận xóa',
    });
  };

  const downloadStudentExcel = () => {
    const data = [
      {
        STT: 1,
        'Họ và tên': '',
        'Số điện thoại': '',
        Email: '',
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh sách học viên');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'danh_sach_hoc_vien.xlsx');
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
                title: <span>Danh sách học viên</span>,
              },
            ]}
          />
          <header className="header-account-page">
            <div className="space-x-4">
              <Radio.Group
                onChange={e => setFilter(e.target.value)}
                value={filter}
              >
                <Radio.Button value="">Tất cả</Radio.Button>
                <Radio.Button value="STUDENT">Miễn phí</Radio.Button>
                <Radio.Button value="TEACHER">Trả phí</Radio.Button>
              </Radio.Group>
            </div>
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
                      onClick={downloadStudentExcel}
                    >
                      Tải file mẫu
                    </Button>
                    <Upload
                      beforeUpload={beforeUploadExcel}
                      showUploadList={false}
                      customRequest={async ({ file, onError }) => {
                        try {
                          setLoading(true);
                          await importUserService(file as File);
                        } catch (error) {
                          console.log(error);
                          const err = error as AxiosError<{
                            statusCode: number;
                            message: string;
                            messageCode: string;
                          }>;

                          if (err.response?.data?.statusCode === 400) {
                            message.error({
                              content: err.response?.data.messageCode,
                              duration: 7,
                            });
                          }
                        } finally {
                          setLoading(false);
                          fetchData();
                        }
                      }}
                      className="w-full"
                    >
                      <Button icon={<UploadOutlined />} className="w-full">
                        Import danh sách
                      </Button>
                    </Upload>
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
                showTotal: total => `Tổng số ${total} học viên`,
                total: data?.meta?.total,
              }}
              onChange={handleTableChange}
              rowKey="id"
              rowSelection={{ type: 'checkbox' }}
              scroll={{ x: 'max-content' }}
              loading={loading}
              onRow={record => ({
                onClick: () => handleNavigate(record.id),
                style: { cursor: 'pointer' },
              })}
            />
          </div>
        </div>
      </Card>
    </>
  );
};

export default StudentPage;
