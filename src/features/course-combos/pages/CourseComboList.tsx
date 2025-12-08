import {
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
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

interface CourseCombo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  courses: string[];
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

const mockData: CourseCombo[] = [
  {
    courses: ['1', '2', '3'],
    createdAt: '2024-03-20',
    description: 'Trở thành lập trình viên Fullstack chỉ trong 6 tháng',
    id: '1',
    price: 4990000,
    status: 'active',
    thumbnail: 'https://via.placeholder.com/150',
    title: 'Combo Fullstack Developer',
    updatedAt: '2024-03-20',
  },
  {
    courses: ['4', '5'],
    createdAt: '2024-03-20',
    description: 'Làm chủ Digital Marketing từ cơ bản đến nâng cao',
    id: '2',
    price: 3990000,
    status: 'active',
    thumbnail: 'https://via.placeholder.com/150',
    title: 'Combo Digital Marketing',
    updatedAt: '2024-03-20',
  },
];

export function CourseComboList() {
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('all');
  const [combos, setCombos] = useState<CourseCombo[]>(mockData);

  const handleDelete = (combo: CourseCombo) => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa combo "${combo.title}"?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: () => {
        setCombos(prev => prev.filter(item => item.id !== combo.id));
        message.success('Xóa combo thành công!');
      },
      title: 'Xác nhận xóa',
    });
  };

  const columns: ColumnsType<CourseCombo> = [
    {
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (thumbnail: string) => (
        <img
          alt="thumbnail"
          className="w-16 h-16 object-cover rounded"
          src={thumbnail}
        />
      ),
      title: 'Ảnh',
      width: 100,
    },
    {
      dataIndex: 'title',
      key: 'title',
      title: 'Tên combo',
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
      dataIndex: 'courses',
      key: 'courses',
      render: (courses: string[]) => courses.length,
      title: 'Số khóa học',
    },
    {
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'success' : 'error'}>
          {status === 'active' ? 'Hoạt động' : 'Ngừng hoạt động'}
        </Tag>
      ),
      title: 'Trạng thái',
    },
    {
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: string) =>
        new Date(date).toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
      title: 'Chỉnh sửa lần cuối',
    },
    {
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => message.info('Tính năng đang phát triển')}
            type="text"
          >
            Sửa
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            type="text"
          >
            Xóa
          </Button>
        </Space>
      ),
      title: 'Hành động',
    },
  ];

  const filteredCombos = combos.filter(combo => {
    const matchesSearch = combo.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesStatus = filter === 'all' ? true : combo.status === filter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex justify-between items-center mb-4">
          <div className="space-x-4">
            <Radio.Group
              onChange={e => setFilter(e.target.value)}
              value={filter}
            >
              <Radio.Button value="all">Tất cả</Radio.Button>
              <Radio.Button value="active">Hoạt động</Radio.Button>
              <Radio.Button value="inactive">Ngừng hoạt động</Radio.Button>
            </Radio.Group>
          </div>
          <Space>
            <Input
              allowClear
              onChange={e => setSearchText(e.target.value)}
              placeholder="Tìm kiếm combo"
              prefix={<SearchOutlined />}
              value={searchText}
            />
            <Button
              icon={<PlusOutlined />}
              onClick={() => message.info('Tính năng đang phát triển')}
              type="primary"
            >
              Thêm combo
            </Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={filteredCombos}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: total => `Tổng số ${total} combo`,
            total: filteredCombos.length,
          }}
          rowKey="id"
        />
      </Card>
    </div>
  );
}
