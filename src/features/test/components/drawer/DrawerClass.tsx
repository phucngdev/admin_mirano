import React, { useEffect, useState } from 'react';
import {
  Drawer,
  Table,
  Button,
  Space,
  Typography,
  TablePaginationConfig,
  Divider,
  Modal,
  message,
} from 'antd';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { getAllClass } from '#/src/redux/thunk/class.thunk';
import { DeleteOutlined } from '@ant-design/icons';
import {
  getOneTestCategory,
  updateTestCategory,
} from '#/src/redux/thunk/test-category.thunk';
import { getAllTest } from '#/src/redux/thunk/test.thunk';
import { useParams } from 'react-router-dom';

const { Title } = Typography;

interface DrawerClassProps {
  open: boolean;
  onClose: () => void;
}

const DrawerClass = ({ open, onClose }: DrawerClassProps) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { data } = useSelector((state: RootState) => state.class);
  const { testEdit } = useSelector((state: RootState) => state.test);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState<'class' | 'add' | ''>('');
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
    current: 1,
  });

  useEffect(() => {
    setSelectedRowKeys([]);
  }, []);

  const fetchData = async () => {
    setLoading('class');
    await dispatch(
      getAllClass({
        limit: pagination.limit,
        offset: pagination.offset,
        query: query,
      }),
    );
    setLoading('');
  };

  useEffect(() => {
    fetchData();
  }, [query, pagination]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current = 1, pageSize = 10 } = pagination;

    setPagination(prev => ({
      ...prev,
      current,
      limit: pageSize,
      offset: (current - 1) * pageSize,
    }));
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
    preserveSelectedRowKeys: true,
  };

  const handleDeleleClass = (id: string) => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa lớp học?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        if (!testEdit) return;
        const reuslt = await dispatch(
          updateTestCategory({
            id: testEdit.id,
            data: {
              name: testEdit.name,
              imageUrl: testEdit.imageUrl,
              spesifictUser: testEdit.spesifictUser,
              classIds: testEdit.classIds.filter(t => t !== id),
            },
          }),
        );
        if (reuslt.payload.statusCode === 200) {
          message.success('Xoá thành công');
        } else {
          message.error('Xoá thất bại');
        }
      },
      title: 'Xác nhận xóa',
    });
  };

  const handleSubmitClass = () => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn thêm các lớp học đã chọn?`,
      okText: 'Thêm',
      okType: 'danger',
      onOk: async () => {
        if (!testEdit) return;
        const reuslt = await dispatch(
          updateTestCategory({
            id: testEdit.id,
            data: {
              name: testEdit.name,
              imageUrl: testEdit.imageUrl,
              spesifictUser: testEdit.spesifictUser,
              classIds: [
                ...testEdit.classIds,
                ...(selectedRowKeys as string[]),
              ],
            },
          }),
        );
        if (reuslt.payload.statusCode === 200) {
          message.success('Thêm thành công');
          if (!id) return;
          await Promise.all([
            dispatch(
              getAllTest({
                categoryId: id,
                limit: pagination.limit,
                offset: pagination.offset,
              }),
            ),
            dispatch(getOneTestCategory(id)),
          ]);
          setSelectedRowKeys([]);
        } else {
          message.error('Thêm thất bại');
        }
      },
      title: 'Xác nhận thêm',
    });
  };

  return (
    <Drawer
      title="Chọn lớp học"
      open={open}
      onClose={onClose}
      width={600}
      footer={
        <div className="p-4">
          <div className="flex items-center gap-4">
            <Button onClick={onClose} className="flex-1">
              Huỷ
            </Button>
            <Button
              type="primary"
              className="flex-1"
              onClick={handleSubmitClass}
            >
              Thêm
            </Button>
          </div>
        </div>
      }
    >
      <Title level={5}>Lớp học đã thêm</Title>
      <Table
        size="small"
        columns={[
          { title: 'Tên lớp', dataIndex: 'name', key: 'name' },
          {
            title: '',
            key: 'action',
            width: 20,
            render: (__: any, record: any) => {
              return (
                <>
                  <Button
                    icon={<DeleteOutlined />}
                    danger
                    onClick={() => handleDeleleClass(record.id)}
                  ></Button>
                </>
              );
            },
          },
        ]}
        dataSource={testEdit?.classes}
        pagination={false}
        rowKey="id"
      />
      <Divider />

      <Table
        rowSelection={rowSelection}
        columns={[{ title: 'Tên lớp', dataIndex: 'name', key: 'name' }]}
        dataSource={data.items}
        pagination={{
          pageSize: pagination.limit,
          showSizeChanger: true,
          showTotal: total => `Tổng số ${total} lớp học`,
          total: data?.meta.total,
        }}
        onChange={handleTableChange}
        rowKey="id"
        scroll={{ x: 'max-content' }}
        loading={loading === 'class'}
      />
    </Drawer>
  );
};

export default DrawerClass;
