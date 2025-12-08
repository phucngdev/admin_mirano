import { deleteTestService } from '#/api/services/testService';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { getAllTest } from '#/src/redux/thunk/test.thunk';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Button, Card, Input, message, Modal, Space } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ModalCreateUpdateTest from '../components/modal/ModalCreateUpdateTests';
import { getOneTestCategory } from '#/src/redux/thunk/test-category.thunk';
import { TestCategoryEntity, TestEntity } from '#/api/requests';
import DrawerClass from '../components/drawer/DrawerClass';

const TestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { dataTest, testEdit } = useSelector((state: RootState) => state.test);

  const [itemUpdate, setItemUpdate] = useState<TestEntity | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
    current: 1,
  });

  const fetchData = async () => {
    if (!id) return;
    setLoading(true);
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
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id, pagination]);

  const handleEdit = (course: TestEntity) => {
    setItemUpdate(course);
    setIsFormOpen(true);
  };

  const handleDelete = (record: TestEntity) => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa đề thi "${record.name}"?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        const result = await deleteTestService(record.id);
        if (result.data.statusCode === 200) {
          message.success('Xóa đề thi thành công!');
          if (!id) return;
          await dispatch(
            getAllTest({
              categoryId: id,
              limit: pagination.limit,
              offset: pagination.offset,
            }),
          );
        } else {
          message.error('Xoá thất bại');
        }
      },
      title: 'Xác nhận xóa',
    });
  };

  const columns: ColumnsType<TestEntity> = [
    {
      dataIndex: 'name',
      key: 'name',
      render: (_, record: TestEntity) => {
        return (
          <span style={{ cursor: 'pointer', color: '#1890ff' }}>
            {record.name}
          </span>
        );
      },
      title: 'Tên đề thi',
    },
    {
      dataIndex: 'setting',
      width: 190,
      key: 'setting',
      render: (_, record: TestEntity) => {
        return (
          <>
            <Space direction="vertical">
              <span style={{ cursor: 'pointer', color: '#1890ff' }}>
                Trộn đáp án: {record.randomAnswer ? '✅' : '❌'}
              </span>
              <span style={{ cursor: 'pointer', color: '#1890ff' }}>
                Hiện đ.án & gthich: {record.showSolution ? '✅' : '❌'}
              </span>
            </Space>
          </>
        );
      },
      title: 'Cài đặt',
    },
    {
      dataIndex: 'testType',
      key: 'testType',
      width: 140,
      render: (_, record: TestEntity) => {
        return (
          <span style={{ cursor: 'pointer', color: '#1890ff' }}>
            {record.testType === TestEntity.testType.REAL
              ? 'Bài thi thật'
              : 'Bài thi thử'}
          </span>
        );
      },
      title: 'Loại bài thi',
    },
    {
      dataIndex: 'description',
      key: 'description',
      render: (_, record: TestEntity) => {
        return (
          <span style={{ cursor: 'pointer', color: '#1890ff' }}>
            {record.description}
          </span>
        );
      },
      title: 'Mô tả',
    },

    {
      dataIndex: 'duration',
      key: 'duration',
      render: (_, record: TestEntity) => {
        return (
          <span style={{ cursor: 'pointer', color: '#1890ff' }}>
            {record.duration}
          </span>
        );
      },
      title: 'Thời gian làm bài',
    },

    {
      key: 'action',
      width: 200,
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
              handleDelete(record);
            }}
            type="text"
          >
            Xóa
          </Button>
        </Space>
      ),
      title: 'Hành động',
    },
  ];

  const handleTableChange = (pagination: any) => {
    const { current, pageSize } = pagination;

    setPagination(prev => ({
      ...prev,
      current,
      limit: pageSize,
      offset: (current - 1) * pageSize,
    }));
  };

  return (
    <>
      <DrawerClass
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
      />
      <ModalCreateUpdateTest
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
        }}
        itemUpdate={itemUpdate}
      />
      <div className="test-page">
        <Card style={{ height: '100%' }}>
          <div className="flex justify-between items-center mb-4">
            <Breadcrumb
              items={[
                {
                  title: 'Quản lý thi thử',
                },
                {
                  title: <Link to="/test">Chi tiết bài thi</Link>,
                },
                {
                  title: <span>{testEdit?.name}</span>,
                },
              ]}
            />
            <Space>
              <Input
                allowClear
                onChange={e => {
                  e.preventDefault();
                  setSearchText(e.target.value);
                }}
                placeholder="Tìm kiếm đề thi"
                prefix={<SearchOutlined />}
                value={searchText}
              />
              {testEdit?.spesifictUser ===
                TestCategoryEntity.spesifictUser.USERS && (
                <Button type="primary" ghost>
                  Danh sách học viên
                </Button>
              )}
              {testEdit?.spesifictUser ===
                TestCategoryEntity.spesifictUser.CLASS && (
                <Button
                  type="primary"
                  ghost
                  onClick={() => setOpenDrawer(true)}
                >
                  Danh sách lớp học
                </Button>
              )}
              <Button
                icon={<PlusOutlined />}
                onClick={() => setIsFormOpen(true)}
                type="primary"
              >
                Thêm đề thi
              </Button>
            </Space>
          </div>
          <br />
          <Table
            loading={loading}
            columns={columns}
            dataSource={dataTest.items}
            pagination={{
              pageSize: pagination.limit,
              showSizeChanger: true,
              showTotal: total => `Tổng số ${total} đề thi`,
              total: dataTest.meta.total,
            }}
            onChange={handleTableChange}
            rowKey="id"
            onRow={record => ({
              onClick: () => navigate(`/test-exam/${record.id}`),
              style: { cursor: 'pointer' },
            })}
          />
        </Card>
      </div>
    </>
  );
};

export default TestDetail;
