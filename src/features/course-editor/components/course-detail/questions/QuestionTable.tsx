import { QuestionEntity } from '#/api/requests';
import {
  practiceTypeColorMap,
  practiceTypeLabelMap,
} from '#/api/requests/interfaces/LabelMap';
import { Tool } from '#/shared/utils';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import {
  deleteQuestion,
  getAllQuestion,
} from '#/src/redux/thunk/question.thunk';
import {
  DeleteOutlined,
  EditOutlined,
  LinkOutlined,
  StopOutlined,
} from '@ant-design/icons';
import {
  Button,
  Input,
  Space,
  Tag,
  Table,
  Image,
  message,
  Modal,
  Empty,
  Select,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const columns = (
  handleEdit: (record: any) => void,
  handleDelete: (acccode: string) => void,
): ColumnsType<any> => [
  {
    dataIndex: 'content',
    key: 'content',
    render: (_, record: any) => {
      return (
        <span style={{ color: '#1890ff' }}>
          {Tool.stripHtml(record.content)}
        </span>
      );
    },
    title: 'Câu hỏi',
  },
  {
    dataIndex: 'imageUrl',
    key: 'imageUrl',
    render: (imageUrl: string) => (
      <Image
        width={80}
        height={80}
        src={imageUrl}
        fallback="data:image/png;base64,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"
      />
    ),
    title: 'Ảnh',
    width: 150,
  },
  {
    dataIndex: 'audioUrl',
    key: 'audioUrl',
    render: (audioUrl: string) =>
      audioUrl ? (
        <a href={audioUrl} target="_blank">
          <Tag icon={<LinkOutlined />} color="blue">
            Click to audio
          </Tag>
        </a>
      ) : (
        <Tag icon={<StopOutlined />} color="blue">
          ----------
        </Tag>
      ),
    title: 'Audio',
    width: 150,
  },
  {
    dataIndex: 'type',
    key: 'type',
    render: (type: QuestionEntity.type) => {
      const label = practiceTypeLabelMap[type] || 'Không xác định';
      const color = practiceTypeColorMap[type] || 'default';

      return <Tag color={color}>{label}</Tag>;
    },
    title: 'Loại',
    width: 180,
  },
  {
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
          type="text"
        >
          Sửa
        </Button>
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.id)}
          type="text"
        >
          Xóa
        </Button>
      </Space>
    ),
    title: 'Hành động',
    width: 250,
  },
];

interface QuestionTableProps {
  setOpenForm: (value: boolean) => void;
  setItemUpdate: (value: QuestionEntity | null) => void;
}

const QuestionTable = ({ setOpenForm, setItemUpdate }: QuestionTableProps) => {
  const dispatch = useAppDispatch();
  const { data } = useSelector((state: RootState) => state.question);

  const [pagination, setPagination] = useState({
    limit: 10, // Số item mỗi trang
    offset: 0, // Vị trí bắt đầu
    current: 1, // Trang hiện tại
    query: '',
  });
  const [selectedQuestionType, setSelectedQuestionType] =
    useState<QuestionEntity.type | null>(null);

  const fetchData = async () => {
    await dispatch(
      getAllQuestion({
        limit: pagination.limit,
        offset: pagination.offset,
        questionGroupId: '',
        query: pagination.query,
        type: selectedQuestionType,
      }),
    );
  };

  useEffect(() => {
    fetchData();
  }, [pagination, selectedQuestionType]);

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const { current, pageSize } = pagination;

    setPagination(prev => ({
      ...prev,
      current,
      limit: pageSize,
      offset: (current - 1) * pageSize,
    }));
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa câu hỏi?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        const result = await dispatch(deleteQuestion(id));
        if (result && result.payload.statusCode === 200) {
          message.success('Xoá thành công');
          setOpenForm(false);
        } else {
          message.error('Xoá thất bại');
        }
      },
      title: 'Xác nhận xóa',
    });
  };

  const handleEdit = (record: QuestionEntity) => {
    setOpenForm(true);
    setItemUpdate(record);
  };

  return (
    <div className="question-table-container">
      <div className="head-table">
        <h3>Danh sách câu hỏi</h3>
        <div className="right-head-table">
          <Input
            className="custom-input input-search"
            placeholder="Tìm kiếm"
            onChange={e =>
              setPagination({
                ...pagination,
                query: e.target.value,
              })
            }
          />
          <Select
            placeholder="Loại câu hỏi"
            className="custom-select"
            defaultValue={QuestionEntity.type.MULTIPLE_CHOICE}
            onChange={value => {
              setSelectedQuestionType(value);
            }}
            options={[
              {
                value: null,
                label: 'Mặc định',
              },
              ...Object.values(QuestionEntity.type).map(value => ({
                value,
                label: practiceTypeLabelMap[value],
              })),
            ]}
            value={selectedQuestionType}
          />

          <Button type="primary" onClick={() => setOpenForm(true)}>
            Thêm câu hỏi
          </Button>
        </div>
      </div>
      <Table
        columns={columns(handleEdit, handleDelete)}
        scroll={{ y: 500 }}
        dataSource={data.items}
        pagination={{
          pageSize: pagination.limit,
          showSizeChanger: true,
          showTotal: total => `Tổng số ${total} câu hỏi`,
          total: data.meta.total,
        }}
        onChange={handleTableChange}
        rowKey="id"
        locale={{
          emptyText: <Empty description="Không có dữ liệu câu hỏi" />,
        }}
      />
    </div>
  );
};

export default QuestionTable;
