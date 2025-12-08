import {
  CopyOutlined,
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
  Radio,
  Space,
  Table,
  Tag,
  message,
  Dropdown,
  Menu,
  Image,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import arrow from '/src/assets/images/icon/arrow.svg';
import { CourseForm } from '../components/Courses/CourseForm';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { deleteCourse, getAllCourse } from '#/src/redux/thunk/course.thunk';
import { CourseEntity } from '#/api/requests';
import ModalCopyCourse from '../components/modal/ModalCopyCourse';

export function CoursesPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data } = useSelector((state: RootState) => state.course);

  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState<'' | 'INACTIVE' | 'ACTIVE'>('');
  const [isFormOpen, setIsFormOpen] = useState<'course' | 'copy' | ''>('');
  const [selectedCourse, setSelectedCourse] = useState<CourseEntity | null>(
    null,
  );
  const [courses, setCourses] = useState<CourseEntity[]>(data.items);
  const [sortOrder, setSortOrder] = useState<'createdAt' | 'updatedAt' | ''>(
    '',
  );
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
    current: 1,
  });

  const fetchData = async () => {
    setLoading(true);
    await dispatch(
      getAllCourse({
        limit: pagination.limit,
        offset: pagination.offset,
        query: searchText,
        status: filter,
        order: sortOrder,
      }),
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [pagination, searchText, filter, sortOrder]);

  useEffect(() => {
    setCourses(data.items);
  }, [data]);

  const handleAdd = () => {
    setSelectedCourse(null);
    setIsFormOpen('course');
  };

  const handleEdit = (course: CourseEntity) => {
    setSelectedCourse(course);
    setIsFormOpen('course');
  };

  const handleDelete = (course: CourseEntity) => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa khóa học "${course.title}"?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        const result = await dispatch(deleteCourse(course.id));
        if (result.payload.statusCode === 200) {
          message.success('Xóa khóa học thành công!');
          fetchData();
        } else {
          message.error('Xoá thất bại');
        }
      },
      title: 'Xác nhận xóa',
    });
  };

  const handleSortChange = (value: 'createdAt' | 'updatedAt' | '') => {
    setSortOrder(value);
  };

  const columns: ColumnsType<CourseEntity> = [
    {
      dataIndex: 'thumbnailUrl',
      key: 'thumbnailUrl',
      render: (thumbnailUrl: string) => (
        <Image
          className="w-16 h-16 object-cover rounded"
          // width={200}
          // height={200}
          src={thumbnailUrl}
          fallback="data:image/png;base64,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"
        />
      ),
      title: 'Ảnh',
      width: 100,
    },
    {
      dataIndex: 'title',
      key: 'title',
      render: (_, record: CourseEntity) => {
        return (
          <span
            onClick={() => navigate(`/course-manager/${record.id}`)}
            style={{ cursor: 'pointer', color: '#1890ff' }}
          >
            {record.title}
          </span>
        );
      },
      title: 'Tên khóa học',
    },
    {
      dataIndex: 'price',
      key: 'price',
      render: (price: number) =>
        new Intl.NumberFormat('vi-VN', {
          currency: 'VND',
          style: 'currency',
        }).format(price),
      title: 'Giá',
    },
    {
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'ACTIVE' ? 'success' : 'error'}>
          {status === 'ACTIVE' ? 'Hoạt động' : 'Ngừng hoạt động'}
        </Tag>
      ),
      title: 'Trạng thái',
    },
    {
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'BASIC' ? 'success' : 'error'}>
          {type === 'BASIC' ? 'Sơ cấp' : 'Nâng cao'}
        </Tag>
      ),
      title: 'Loại',
    },
    {
      key: 'action',
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
      <ModalCopyCourse
        open={isFormOpen === 'copy'}
        onClose={() => {
          setIsFormOpen('');
        }}
      />
      <CourseForm
        initialValues={selectedCourse || undefined}
        isOpen={isFormOpen === 'course'}
        onClose={() => {
          setSelectedCourse(null);
          setIsFormOpen('');
        }}
        pagination={pagination}
        title={selectedCourse ? 'Chỉnh sửa khóa học' : 'Thêm khóa học mới'}
      />
      <div className="space-y-4">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <div className="space-x-4">
              <Radio.Group
                onChange={e => setFilter(e.target.value)}
                value={filter}
              >
                <Radio.Button value="">Tất cả</Radio.Button>
                <Radio.Button value="ACTIVE">Hoạt động</Radio.Button>
                <Radio.Button value="INACTIVE">Ngừng hoạt động</Radio.Button>
              </Radio.Group>

              {/* Dropdown for sorting */}
              <Dropdown
                overlay={
                  <Menu
                    onClick={e =>
                      handleSortChange(e.key as 'createdAt' | 'updatedAt' | '')
                    }
                  >
                    <Menu.Item key="createdAt">Ngày tạo</Menu.Item>
                    <Menu.Item key="updatedAt">Ngày cập nhật</Menu.Item>
                    {/* <Menu.Item key="title">Tên khóa học</Menu.Item> */}
                  </Menu>
                }
              >
                <Button>
                  {sortOrder === '' ? (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      Sắp xếp mặc định
                      <img
                        style={{ width: '16px', height: '16px' }}
                        alt="reset"
                        src={arrow}
                      />
                    </div>
                  ) : (
                    `Sắp xếp theo ${sortOrder === 'createdAt' ? 'Ngày tạo' : sortOrder === 'updatedAt' ? 'Ngày cập nhật' : 'Tên khóa học'}`
                  )}
                </Button>
              </Dropdown>
            </div>
            <Space>
              <Input
                allowClear
                onChange={e => {
                  e.preventDefault();
                  setSearchText(e.target.value);
                }}
                placeholder="Tìm kiếm khóa học"
                prefix={<SearchOutlined />}
                value={searchText}
              />
              <Button
                icon={<CopyOutlined />}
                onClick={() => setIsFormOpen('copy')}
                type="default"
              >
                Nhân bản khoá học
              </Button>
              <Button
                icon={<PlusOutlined />}
                onClick={handleAdd}
                type="primary"
              >
                Thêm khóa học
              </Button>
              {/* Reset Button */}
            </Space>
          </div>

          <Table
            loading={loading}
            columns={columns}
            dataSource={courses}
            pagination={{
              pageSize: pagination.limit,
              showSizeChanger: true,
              showTotal: total => `Tổng số ${total} khóa học`,
              total: data.meta.total,
            }}
            onChange={handleTableChange}
            rowKey="id"
            onRow={record => ({
              onClick: () => navigate(`/course-manager/${record.id}`),
              style: { cursor: 'pointer' },
            })}
          />
        </Card>
      </div>
    </>
  );
}
