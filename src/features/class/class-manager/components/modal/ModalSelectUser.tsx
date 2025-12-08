import { UpsertUserDto, UserEntity } from '#/api/requests';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import {
  addTeacherToClass,
  addUserToClass,
} from '#/src/redux/thunk/class.thunk';
import { getAllUser } from '#/src/redux/thunk/user.thunk';
import { CloseOutlined, DeleteTwoTone } from '@ant-design/icons';
import { Button, Image, Input, message, Modal, Table, Tag } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

interface ModalSelectUserProps {
  open: boolean;
  onClose: () => void;
  role: 'TEACHER' | 'STUDENT';
}
const ModalSelectUser = ({ open, onClose, role }: ModalSelectUserProps) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { data } = useSelector((state: RootState) => state.users);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
    current: 1,
    query: '',
  });
  const [loading, setLoading] = useState<'user' | 'create' | ''>('');

  const fetchData = async () => {
    setLoading('user');
    if (role === 'STUDENT') {
      await dispatch(
        getAllUser({
          limit: pagination.limit,
          offset: pagination.offset,
          query: pagination.query,
          userProfiles: UpsertUserDto.userProfiles.STUDENT,
        }),
      );
    } else {
      await dispatch(
        getAllUser({
          limit: pagination.limit,
          offset: pagination.offset,
          query: pagination.query,
          userProfiles: UpsertUserDto.userProfiles.TEACHER,
        }),
      );
    }
    setLoading('');
  };

  useEffect(() => {
    fetchData();
  }, [pagination, open]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
    preserveSelectedRowKeys: true,
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

  const handleSubmit = async () => {
    if (!id) return;
    setLoading('create');
    if (role === 'STUDENT') {
      const result = await dispatch(
        addUserToClass({
          classId: id,
          studentIds: selectedRowKeys.map(String),
        }),
      );
      if (result.payload.statusCode === 201) {
        message.success('Thêm thành công');
        setSelectedRowKeys([]);
        onClose();
      } else {
        message.error('Thêm thất bại');
      }
    } else {
      const result = await dispatch(
        addTeacherToClass({
          classId: id,
          teacherIds: selectedRowKeys.map(String),
        }),
      );
      if (result.payload.statusCode === 201) {
        message.success('Thêm thành công');
        setSelectedRowKeys([]);
        onClose();
      } else {
        message.error('Thêm thất bại');
      }
    }
    setLoading('');
  };

  const handleCancel = () => {
    onClose();
    setSelectedRowKeys([]);
  };

  const columns: ColumnsType<UserEntity> = [
    {
      dataIndex: 'avatarUrl',
      key: 'avatarUrl',
      render: (avatarUrl: string) => (
        <Image
          className="w-16 h-16 object-cover rounded"
          src={avatarUrl}
          fallback="data:image/png;base64,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"
        />
      ),
      title: 'Ảnh',
      width: 100,
    },
    {
      dataIndex: 'fullName',
      key: 'fullName',
      render: fullName => {
        return (
          <span style={{ cursor: 'pointer', color: '#1890ff' }}>
            {fullName}
          </span>
        );
      },
      title: 'Tên học viên',
    },

    {
      dataIndex: 'email',
      key: 'email',
      render: email => {
        return (
          <span style={{ cursor: 'pointer', color: '#1890ff' }}>{email}</span>
        );
      },
      title: 'Email',
    },

    {
      dataIndex: 'userType',
      key: 'userType',
      render: (userType: string) =>
        role === 'TEACHER' ? (
          <Tag>Giảng viên</Tag>
        ) : (
          <Tag
            color={
              userType === UserEntity.userType.NEW_USER ? 'success' : 'error'
            }
          >
            {userType === UserEntity.userType.NEW_USER ? 'Miễn phí' : 'Trả phí'}
          </Tag>
        ),
      title: 'Trạng thái',
    },
  ];

  return (
    <>
      <Modal
        closeIcon={<CloseOutlined />}
        className=""
        footer={[
          <Button onClick={handleCancel}>Huỷ</Button>,
          <Button
            loading={loading === 'create'}
            disabled={loading === 'create'}
            onClick={handleSubmit}
            type="primary"
          >
            Lưu
          </Button>,
        ]}
        onCancel={handleCancel}
        open={open}
        style={{ top: 20 }}
        title={
          <>
            <span
              style={{
                color: 'rgba(16, 24, 40, 1)',
                fontSize: '30px',
                fontWeight: '500',
              }}
            >
              {role === 'STUDENT' ? 'Thêm học viên' : 'Thêm giảng viên'}
            </span>
          </>
        }
        width={800}
      >
        <Input
          className="custom-input"
          placeholder="Tìm kiếm"
          value={pagination.query}
          onChange={e =>
            setPagination({
              ...pagination,
              query: e.target.value,
            })
          }
        />
        <br />
        <br />
        <div className="title-list-question">
          Danh sách khoá học:{'   '}
          {selectedRowKeys.length > 0 && (
            <>
              <Tag color="blue">Đã chọn {selectedRowKeys.length}</Tag>{' '}
              <Tag
                closable={{
                  closeIcon: <DeleteTwoTone twoToneColor="#cf1322" />,
                  'aria-label': 'Close Button',
                }}
                onClose={() => setSelectedRowKeys([])}
                color="red"
              >
                Bỏ chọn
              </Tag>
            </>
          )}
        </div>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={data?.items || []}
          loading={loading === 'user'}
          scroll={{ y: 340 }}
          pagination={{
            pageSize: pagination.limit,
            showSizeChanger: true,
            showTotal: total => `Tổng số ${total} học viên`,
            total: data?.meta?.total,
          }}
          onChange={handleTableChange}
          rowSelection={rowSelection}
        />
      </Modal>
    </>
  );
};

export default ModalSelectUser;
