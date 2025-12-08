import { UserEntity } from '#/api/requests';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { getOneClass } from '#/src/redux/thunk/class.thunk';
import { MoreOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Card,
  Dropdown,
  MenuProps,
  message,
  Modal,
  Select,
  Space,
  Table,
  TableColumnsType,
} from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

export type AttendanceEntity = {
  status: AttendanceEntity.StatusType;
};

export namespace AttendanceEntity {
  export enum StatusType {
    ABSENT = 'ABSENT',
    PRESENT = 'PRESENT',
  }
}

const columns = (
  handleChangeStatus: (
    record: UserEntity,
    status: AttendanceEntity.StatusType,
  ) => void,
): TableColumnsType<UserEntity> => [
  {
    title: 'Mã học viên',
    dataIndex: 'userCode',
    width: 120,
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
    title: 'Tên học viên',
    dataIndex: 'name',
    render: (_, record) => (
      <span className="span-table">{record.fullName}</span>
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
        <Select
          defaultValue={AttendanceEntity.StatusType.PRESENT}
          style={{ width: 120 }}
          onChange={(value: AttendanceEntity.StatusType) =>
            handleChangeStatus(record, value)
          }
          options={[
            { value: AttendanceEntity.StatusType.PRESENT, label: 'Có mặt' },
            { value: AttendanceEntity.StatusType.ABSENT, label: 'Vắng' },
          ]}
        />
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

const columnsAbsent = (): TableColumnsType<UserEntity> => [
  {
    title: 'Mã học viên',
    dataIndex: 'userCode',
    width: 120,
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
    title: 'Tên học viên',
    dataIndex: 'fullName',
    render: (_, record) => (
      <span className="span-table">{record.fullName}</span>
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

const Attendance = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const data = useSelector((state: RootState) => state.class.classEdit);
  const [listAbsent, setListAbsent] = useState<UserEntity[]>([]);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to={`/class-manager/class-room/attendances-history/${id}`}>
          Lịch sử điểm danh
        </Link>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: 'Điểm danh bù',
      // extra: '⌘P',
    },
  ];

  const fetchData = async () => {
    if (!id) return;
    await dispatch(getOneClass(id));
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleChangeStatus = (
    record: UserEntity,
    status: AttendanceEntity.StatusType,
  ) => {
    if (status === AttendanceEntity.StatusType.ABSENT) {
      setListAbsent(prev => [...prev, record]);
    } else {
      const newList = listAbsent.filter(i => i.id !== record.id);
      setListAbsent(newList);
    }
  };

  const handleConfirm = () => {
    Modal.confirm({
      cancelText: 'Hủy',
      okText: 'Xác nhận',
      content: `Lưu thông tin điểm danh ngày ${dayjs(new Date()).format('YYYY/MM/DD')}`,
      okType: 'danger',
      onOk: async () => {
        message.success('Lưu thành công!');
      },
      title: 'Xác nhận',
    });
  };

  return (
    <>
      <Card className="attendances-page">
        <div className="header-class-manager-page">
          <Breadcrumb
            items={[
              {
                title: 'Quản lý lớp học',
              },
              {
                title: <Link to="/class-manager/class-room">Lớp học</Link>,
              },
              {
                title: (
                  <Link to={`/class-manager/class-room/${id}`}>
                    {data?.name}
                  </Link>
                ),
              },
              {
                title: <span>Điểm danh</span>,
              },
            ]}
          />
          <div className="group-btn">
            <Dropdown menu={{ items }} placement="bottomRight">
              <Button icon={<MoreOutlined />}></Button>
            </Dropdown>
            <Button type="primary" onClick={handleConfirm}>
              Lưu điển danh
            </Button>
          </div>
        </div>

        <div className="layout-table">
          <div className="table-list-student">
            <span className="span-title">
              Danh sách học viên - {data?.name}{' '}
              <p className="number-total">{data?.students?.length}</p>
            </span>
            <Table<UserEntity>
              columns={columns(handleChangeStatus)}
              dataSource={data?.students as UserEntity[]}
              rowKey="id"
              scroll={{ x: 'max-content' }}
              pagination={false}
            />
          </div>
          <div className="table-absent">
            <span className="span-title">
              Danh sách vắng mặt
              <p className="number-total">{listAbsent.length}</p>
            </span>
            <Table<UserEntity>
              columns={columnsAbsent()}
              dataSource={listAbsent}
              rowKey="id"
              scroll={{ x: 'max-content' }}
              pagination={false}
            />
          </div>
        </div>
      </Card>
    </>
  );
};

export default Attendance;
