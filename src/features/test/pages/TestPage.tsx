import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Input,
  Modal,
  Space,
  Table,
  message,
  Image,
  Breadcrumb,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import ModalCreateUpdateTestCategory from '../components/modal/ModalCreateUpdateTestCategory';
import { getTestCategory } from '#/src/redux/thunk/test-category.thunk';
import { deleteTestCategoryService } from '#/api/services/testCategoryService';
import { TestCategoryEntity } from '#/api/requests';
import { fallback } from '#/shared/constants/fallback';
import img_replace from '#/assets/images/header/logo_mirano.png';

const TestPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data } = useSelector((state: RootState) => state.test);

  const [itemUpdate, setItemUpdate] = useState<TestCategoryEntity | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
    current: 1,
  });

  const fetchData = async () => {
    setLoading(true);
    await dispatch(
      getTestCategory({
        limit: pagination.limit,
        offset: pagination.offset,
      }),
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [pagination, searchText]);

  const handleAdd = () => {
    setItemUpdate(null);
    setIsFormOpen(true);
  };

  const handleEdit = (course: TestCategoryEntity) => {
    setItemUpdate(course);
    setIsFormOpen(true);
  };

  const handleDelete = (record: TestCategoryEntity) => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa bài thi "${record.name}"?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        const result = await deleteTestCategoryService(record.id);
        if (result.data.statusCode === 200) {
          message.success('Xóa bài thi thành công!');
          await dispatch(
            getTestCategory({
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

  const columns: ColumnsType<TestCategoryEntity> = [
    {
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (imageUrl: string) => (
        <Image
          className="w-16 h-16 object-cover rounded"
          src={img_replace}
          fallback={fallback}
        />
      ),
      title: 'Ảnh',
      width: 100,
    },
    {
      dataIndex: 'name',
      key: 'name',
      render: (_, record: TestCategoryEntity) => {
        return (
          <span style={{ cursor: 'pointer', color: '#1890ff' }}>
            {record.name}
          </span>
        );
      },
      title: 'Tên bài thi',
    },
    {
      dataIndex: 'name',
      key: 'name',
      render: (_, record: TestCategoryEntity) => {
        return (
          <span style={{ cursor: 'pointer', color: '#1890ff' }}>
            {record.spesifictUser === TestCategoryEntity.spesifictUser.ALL &&
              'Bài thi Public'}
            {record.spesifictUser === TestCategoryEntity.spesifictUser.CLASS &&
              'Bài thi dành cho lớp học'}
            {record.spesifictUser === TestCategoryEntity.spesifictUser.USERS &&
              'Bài thi dành cho học viên'}
            {record.spesifictUser === TestCategoryEntity.spesifictUser.COURSE &&
              'Bài thi dành cho khoá học'}
          </span>
        );
      },
      title: 'Loại bài thi',
    },
    {
      dataIndex: 'numberOfTests',
      key: 'numberOfTests',
      render: (_, record: TestCategoryEntity) => {
        return (
          <span style={{ cursor: 'pointer', color: '#1890ff' }}>
            {record.numberOfTests}
          </span>
        );
      },
      width: 200,
      title: 'Số phần thi',
    },
    {
      dataIndex: 'numberOfParticipants',
      key: 'numberOfParticipants',
      render: (_, record: TestCategoryEntity) => {
        return (
          <span style={{ cursor: 'pointer', color: '#1890ff' }}>
            {record.numberOfParticipants}
          </span>
        );
      },
      width: 200,
      title: 'Số người đã tham gia',
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
      <ModalCreateUpdateTestCategory
        itemUpdate={itemUpdate}
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
        }}
      />
      <div className="space-y-4">
        <Card>
          <Breadcrumb
            items={[
              {
                title: 'Quản lý thi thử',
              },
              {
                title: <span>Danh sách bài thi thử</span>,
              },
            ]}
          />
          <div className="flex justify-between items-center mb-4 mt-5">
            <div className="space-x-4">
              <h3 style={{ fontSize: '20px' }}>Danh sách bài thi thử</h3>
            </div>
            <Space align="center">
              <Input
                allowClear
                onChange={e => {
                  e.preventDefault();
                  setSearchText(e.target.value);
                }}
                placeholder="Tìm kiếm bài thi thử"
                prefix={<SearchOutlined />}
                value={searchText}
              />
              <Button
                icon={<CalendarOutlined />}
                onClick={() => navigate('/test/test-result')}
              >
                Kết quả
              </Button>
              <Button
                icon={<PlusOutlined />}
                onClick={handleAdd}
                type="primary"
              >
                Thêm bài thi thử
              </Button>
            </Space>
          </div>

          <Table
            loading={loading}
            columns={columns}
            dataSource={data?.items || []}
            pagination={{
              pageSize: pagination.limit,
              showSizeChanger: true,
              showTotal: total => `Tổng số ${total} bài thi`,
              total: data?.meta?.total || 0,
            }}
            onChange={handleTableChange}
            rowKey="id"
            onRow={record => ({
              onClick: () => navigate(`/test/${record.id}`),
              style: { cursor: 'pointer' },
            })}
          />
        </Card>
      </div>
    </>
  );
};

export default TestPage;
