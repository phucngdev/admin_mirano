import { PlusOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tag } from 'antd';
import { useState } from 'react';
import type { MembershipFormData } from '../components/MembershipForm';
import { MembershipModal } from '../components/MembershipModal';

// TODO: Replace with actual API types
interface Membership extends MembershipFormData {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export function MembershipsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMembership, setSelectedMembership] =
    useState<Membership | null>(null);

  const handleAdd = () => {
    setSelectedMembership(null);
    setIsModalOpen(true);
  };

  const handleEdit = (record: Membership) => {
    setSelectedMembership(record);
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setSelectedMembership(null);
  };

  const handleModalOk = async (data: MembershipFormData) => {
    try {
      if (selectedMembership) {
      } else {
      }

      setIsModalOpen(false);
      setSelectedMembership(null);
    } catch (error) {
      console.error('Failed to save membership:', error);
    }
  };

  const columns = [
    {
      dataIndex: 'title',
      key: 'title',
      title: 'Title',
    },
    {
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toFixed(2)}`,
      title: 'Price',
    },
    {
      dataIndex: 'duration',
      key: 'duration',
      title: 'Duration (months)',
    },
    {
      dataIndex: 'status',
      key: 'status',
      render: (status: 'active' | 'inactive') => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
      title: 'Status',
    },
    {
      key: 'actions',
      render: (_: unknown, record: Membership) => (
        <Space>
          <Button onClick={() => handleEdit(record)} type="link">
            Edit
          </Button>
          {/* TODO: Add delete button with confirmation */}
        </Space>
      ),
      title: 'Actions',
    },
  ];

  // TODO: Replace with actual API data
  const mockData: Membership[] = [
    {
      benefits: ['Access to basic features', 'Email support'],
      // Add empty string as default
      createdAt: '2024-03-20T00:00:00Z',

      description: 'Basic features for starters',

      duration: 1,

      id: '1',

      price: 9.99,

      status: 'active',

      thumbnail: '',
      title: 'Basic Membership',
      updatedAt: '2024-03-20T00:00:00Z',
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button icon={<PlusOutlined />} onClick={handleAdd} type="primary">
          Add Membership
        </Button>
      </div>

      <Table columns={columns} dataSource={mockData} rowKey="id" />

      <MembershipModal
        initialValues={selectedMembership || undefined}
        onCancel={handleModalCancel}
        onOk={handleModalOk}
        open={isModalOpen}
        title={selectedMembership ? 'Edit Membership' : 'Add Membership'}
      />
    </div>
  );
}
