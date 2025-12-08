import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Card,
  Input,
  message,
  Modal,
  Space,
  Table,
  TableColumnsType,
  TablePaginationConfig,
} from 'antd';
import { useEffect, useState } from 'react';
import ms_excel from '#/assets/images/icon_button/ms_excel.png';
import ModalCreateUpdateClass from '../components/modal/ModalCreateUpdateClass';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { deleteClass, getAllClass } from '#/src/redux/thunk/class.thunk';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import { ClassDetailEntity, ClassEntity } from '#/api/requests';
import { group } from 'console';

const columns = (
  handleEdit: (record: ClassDetailEntity) => void,
  handleDelele: (id: string) => void,
  handleClick: (id: string) => void,
  handleClickTeacher: (id: string) => void,
): TableColumnsType<ClassDetailEntity> => [
  {
    title: 'Tên khoá học',
    dataIndex: 'name',
    render: (_, record) => (
      <span onClick={() => handleClick(record.id)} className="span-table">
        {record.name}
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
    title: 'Giảng viên',
    dataIndex: 'teachers',
    width: 200,
    render: (_, record) => (
      <span className="span-table">
        {record.teachers &&
          record.teachers.map((t, index) => (
            <div onClick={() => handleClickTeacher(record.id)} key={index}>
              {t.fullName}
            </div>
          ))}
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
  //   title: 'Trợ giảng',
  //   dataIndex: 'teachers',
  //   width: 200,
  //   render: (_, record) => (
  //     <span className="span-table">
  //       {record.teachers &&
  //         record.teachers.map((t, index) => (
  //           <div key={index}>{t.fullName}</div>
  //         ))}
  //     </span>
  //   ),
  //   onHeaderCell: () => ({
  //     style: {
  //       fontSize: '12px',
  //       color: 'rgba(102, 112, 133, 1)',
  //       fontWeight: '500',
  //     },
  //   }),
  // },
  {
    title: 'Học viên',
    dataIndex: 'studentCount',
    width: 150,
    render: (_, record) => (
      <span className="span-table">{record.studentCount}</span>
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
            handleDelele(record.id);
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

const ClassManagerPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const data = useSelector((state: RootState) => state.class.data);
  const [loading, setLoading] = useState(false);
  const [openModalClass, setOpenModalClass] = useState(false);
  const [query, setQuery] = useState('');
  const [itemUpdate, setItemUpdate] = useState<ClassEntity | null>(null);
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
    current: 1,
  });

  const fetchData = async () => {
    setLoading(true);
    await dispatch(
      getAllClass({
        limit: pagination.limit,
        offset: pagination.offset,
        query: query,
      }),
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [pagination, query]);

  const handleEdit = (record: ClassEntity) => {
    setItemUpdate(record);
    setOpenModalClass(true);
  };

  const handleClick = (id: string) => {
    navigate(`/class-manager/class-room/${id}`);
  };

  const handleClickTeacher = (id: string) => {
    navigate(`/class-manager/accounts/teachers/${id}`);
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

  const handleDelele = (id: string) => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa lớp học?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        const result = await dispatch(deleteClass(id));
        if (result.payload.statusCode === 200) {
          message.success('Xóa lớp học thành công!');
          await dispatch(
            getAllClass({
              limit: pagination.limit,
              offset: pagination.offset,
              query: query,
            }),
          );
        } else {
          message.error('Xoá thất bại');
        }
      },
      title: 'Xác nhận xóa',
    });
  };

  return (
    <>
      <ModalCreateUpdateClass
        itemUpdate={itemUpdate}
        open={openModalClass}
        onClose={() => {
          setOpenModalClass(false);
          setItemUpdate(null);
        }}
      />
      <Card>
        <div className="class-manager-page">
          <Breadcrumb
            items={[
              {
                title: 'Quản lý lớp học',
              },
              {
                title: <span>Danh sách lớp học</span>,
              },
            ]}
          />
          <header className="header-class-manager-page">
            <span className="span-title">Danh sách lớp học</span>

            <div className="group-btn">
              <Input
                placeholder="Tìm kiếm"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <Button>
                <img src={ms_excel} alt="icon-excel" />
                Tải danh sách
              </Button>
              <Button
                type="primary"
                onClick={() => setOpenModalClass(true)}
                icon={<PlusOutlined />}
              >
                Thêm lớp học
              </Button>
            </div>
          </header>
          <div className="table-class-manager">
            <Table<ClassEntity>
              columns={columns(
                handleEdit,
                handleDelele,
                handleClick,
                handleClickTeacher,
              )}
              dataSource={data?.items}
              pagination={{
                pageSize: pagination.limit,
                showSizeChanger: true,
                showTotal: total => `Tổng số ${total} lớp học`,
                total: data?.meta.total,
              }}
              onChange={handleTableChange}
              rowKey="id"
              rowSelection={{ type: 'checkbox' }}
              scroll={{ x: 'max-content' }}
              loading={loading}
              onRow={record => ({
                onClick: () => handleClick(record.id),
                style: { cursor: 'pointer' },
              })}
            />
          </div>
        </div>
      </Card>
    </>
  );
};

export default ClassManagerPage;
//
