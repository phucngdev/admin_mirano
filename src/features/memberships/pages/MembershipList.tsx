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

interface Membership {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  duration: number; // Số tháng
  benefits: string[];
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

const mockData: Membership[] = [
  {
    benefits: [
      'Truy cập tất cả khóa học',
      'Chứng chỉ có xác thực',
      'Hỗ trợ 1-1 với giảng viên',
      'Cập nhật khóa học mới',
    ],
    createdAt: '2024-03-20',
    description: 'Truy cập không giới hạn tất cả khóa học',
    duration: 12,
    id: '1',
    price: 999000,
    status: 'active',
    thumbnail: 'https://via.placeholder.com/150',
    title: 'Gói Premium',
    updatedAt: '2024-03-20',
  },
  {
    benefits: [
      'Truy cập khóa học cơ bản',
      'Chứng chỉ có xác thực',
      'Hỗ trợ qua forum',
    ],
    createdAt: '2024-03-20',
    description: 'Truy cập các khóa học cơ bản',
    duration: 6,
    id: '2',
    price: 499000,
    status: 'active',
    thumbnail: 'https://via.placeholder.com/150',
    title: 'Gói Basic',
    updatedAt: '2024-03-20',
  },
];

export function MembershipList() {
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('all');
  const [memberships, setMemberships] = useState<Membership[]>(mockData);

  const handleDelete = (membership: Membership) => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa gói "${membership.title}"?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: () => {
        setMemberships(prev => prev.filter(item => item.id !== membership.id));
        message.success('Xóa gói membership thành công!');
      },
      title: 'Xác nhận xóa',
    });
  };

  const columns: ColumnsType<Membership> = [
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
      title: 'Tên gói',
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
      dataIndex: 'duration',
      key: 'duration',
      render: (duration: number) => `${duration} tháng`,
      title: 'Thời hạn',
    },
    {
      dataIndex: 'benefits',
      key: 'benefits',
      render: (benefits: string[]) => (
        <ul className="list-disc list-inside">
          {benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      ),
      title: 'Quyền lợi',
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

  const filteredMemberships = memberships.filter(membership => {
    const matchesSearch = membership.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesStatus =
      filter === 'all' ? true : membership.status === filter;
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
              placeholder="Tìm kiếm gói membership"
              prefix={<SearchOutlined />}
              value={searchText}
            />
            <Button
              icon={<PlusOutlined />}
              onClick={() => message.info('Tính năng đang phát triển')}
              type="primary"
            >
              Thêm gói membership
            </Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={filteredMemberships}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: total => `Tổng số ${total} gói membership`,
            total: filteredMemberships.length,
          }}
          rowKey="id"
        />
      </Card>
    </div>
  );
}
