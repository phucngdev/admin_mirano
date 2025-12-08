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
  CloseOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  LinkOutlined,
  StopOutlined,
  TagOutlined,
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
  Card,
  Popover,
  Upload,
  Tooltip,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ModalCreateUpdateQuestion from '../modal/ModalCreateUpdateQuestion';
import ms_excel from '#/assets/images/icon_button/ms_excel.png';
import { QuestionEntity } from '#/api/requests';
import { fallback } from '#/shared/constants/fallback';
import { beforeUploadExcel } from '#/shared/props/beforeUpload';
import {
  deleteMultipleQuestionService,
  importQuestionService,
} from '#/api/services/questionService';
import ReadOnlyCK from '#/shared/components/ckeditor/ReadOnlyCK';
import ModalUpdateTag from '../modal/ModalUpdateTag';

const columns = (
  handleEdit: (record: any) => void,
  handleDelete: (acccode: string) => void,
): ColumnsType<any> => [
  {
    dataIndex: 'content',
    key: 'content',
    render: (_, record: any) => {
      return <ReadOnlyCK value={record.content} />;
    },
    title: 'Câu hỏi',
  },
  {
    dataIndex: 'imageUrl',
    key: 'imageUrl',
    render: (imageUrl: string) => (
      <Image width={80} height={80} src={imageUrl} fallback={fallback} />
    ),
    title: 'Ảnh',
    width: 100,
  },
  {
    dataIndex: 'audioUrl',
    key: 'audioUrl',
    render: (audioUrl: string) =>
      audioUrl ? (
        <a href={audioUrl} target="_blank">
          <Tag icon={<LinkOutlined />} color="blue">
            Click
          </Tag>
        </a>
      ) : (
        <Tag icon={<StopOutlined />} color="blue">
          -----
        </Tag>
      ),
    title: 'Audio',
    width: 100,
  },
  {
    dataIndex: 'type',
    key: 'type',
    render: (type: QuestionEntity.type) => {
      const label = practiceTypeLabelMap[type] || 'Không xác định';
      const color = practiceTypeColorMap[type] || 'default';

      return (
        <Tag
          color={color}
          style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
        >
          {label}
        </Tag>
      );
    },
    title: 'Loại',
    width: 100,
  },
  {
    dataIndex: 'tag',
    key: 'tag',
    render: (tag: QuestionEntity.type) => {
      return (
        <Tag
          color="#108ee9"
          style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
        >
          {tag}
        </Tag>
      );
    },
    title: 'Tag',
    width: 120,
  },
  {
    key: 'action',
    render: (_, record) => (
      <Space>
        <Tooltip title="Chỉnh sửa">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            type="primary"
            ghost
          ></Button>
        </Tooltip>
        <Tooltip title="Xoá">
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          ></Button>
        </Tooltip>
      </Space>
    ),
    title: 'Action',
    width: 100,
  },
];

const QuestionTab = () => {
  const dispatch = useAppDispatch();
  const { data } = useSelector((state: RootState) => state.question);

  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdateTag, setOpenModalUpdateTag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [itemUpdate, setItemUpdate] = useState<QuestionEntity | null>(null);
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
    current: 1,
    query: '',
    tag: '',
  });
  const [selectedQuestionType, setSelectedQuestionType] =
    useState<QuestionEntity.type | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const fetchData = async () => {
    setLoading(true);
    await dispatch(
      getAllQuestion({
        limit: pagination.limit,
        offset: pagination.offset,
        query: pagination.query,
        tag: pagination.tag,
        type: selectedQuestionType,
      }),
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [pagination, selectedQuestionType]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
    preserveSelectedRowKeys: true,
  };

  const handleTableChange = (pagination: any) => {
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
          setOpenModal(false);
          fetchData();
        } else {
          message.error('Xoá thất bại');
        }
      },
      title: 'Xác nhận xóa',
    });
  };

  const handleDeleteMultiple = async () => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa "${selectedRowKeys.length}" câu hỏi đã chọn?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        const ids = JSON.stringify(selectedRowKeys);
        const result = await deleteMultipleQuestionService(ids);
        if (result.data.statusCode === 200) {
          message.success('Xoá thành công');
          setOpenModal(false);
          fetchData();
        } else {
          message.error('Xoá thất bại');
        }
        setSelectedRowKeys([]);
      },
      title: 'Xác nhận xóa',
    });
  };

  const handleEdit = (record: QuestionEntity) => {
    setOpenModal(true);
    setItemUpdate(record);
  };

  return (
    <>
      <ModalCreateUpdateQuestion
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setItemUpdate(null);
          fetchData();
        }}
        itemUpdate={itemUpdate}
      />
      <ModalUpdateTag
        open={openModalUpdateTag}
        onClose={() => {
          setOpenModalUpdateTag(false);
          fetchData();
        }}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />
      <div className="content-tab-question">
        <Card className="left-side">
          <span className="span-title">Lọc câu hỏi</span>
          <Button
            type="primary"
            onClick={() => setOpenModal(true)}
            className="w-full mt-4"
          >
            Thêm câu hỏi
          </Button>

          <Upload
            beforeUpload={beforeUploadExcel}
            showUploadList={false}
            customRequest={async ({ file, onError }) => {
              try {
                await importQuestionService(file as File);
              } catch (error) {
                onError?.(error as Error);
                message.error('Tải lên thất bại');
              } finally {
                fetchData();
              }
            }}
            className="w-full"
          >
            <Button className="w-full mt-3">
              <img src={ms_excel} alt="icon-excel" />
              Tải danh sách
            </Button>
          </Upload>
          {/* importQuestionService */}
          <br />
          <br />
          <hr />
          <br />
          <div className="list-type">
            <Button
              className="w-full"
              type={selectedQuestionType === null ? 'primary' : 'default'}
              onClick={() => setSelectedQuestionType(null)}
            >
              Mặc định
            </Button>
            {Object.values(QuestionEntity.type).map(value => (
              <Button
                onClick={() => setSelectedQuestionType(value)}
                className="w-full"
                key={value}
                type={selectedQuestionType === value ? 'primary' : 'default'}
              >
                {practiceTypeLabelMap[value]}
              </Button>
            ))}
          </div>
        </Card>
        <Card className="right-side">
          <div className="head-table">
            <div className="flex items-center gap-4">
              <span className="span-title">Danh sách câu hỏi</span>

              {selectedRowKeys.length > 0 && (
                <div className="flex items-center gap-2">
                  <Tag color="#f50">Đã chọn {selectedRowKeys.length}</Tag>
                  <Tag
                    color="volcano"
                    style={{ cursor: 'pointer' }}
                    icon={<CloseOutlined />}
                    onClick={() => setSelectedRowKeys([])}
                  >
                    Bỏ chọn
                  </Tag>
                  <Tag
                    color="error"
                    style={{ cursor: 'pointer' }}
                    icon={<DeleteOutlined />}
                    onClick={handleDeleteMultiple}
                  >
                    Xoá
                  </Tag>
                  <Tag
                    icon={<TagOutlined />}
                    color="processing"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setOpenModalUpdateTag(true)}
                  >
                    Chỉnh sửa tag
                  </Tag>
                </div>
              )}
            </div>
            <div className="right-head-table">
              <Input
                className="custom-input w-[300px]"
                placeholder="Tìm kiếm"
                onChange={e =>
                  setPagination({
                    ...pagination,
                    query: e.target.value,
                  })
                }
              />
              <Input
                className="custom-input w-[200px]"
                placeholder="Tìm kiếm tag"
                onChange={e =>
                  setPagination({
                    ...pagination,
                    tag: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <Table
            columns={columns(handleEdit, handleDelete)}
            //   scroll={{ y: 500 }}
            dataSource={data?.items || []}
            rowSelection={rowSelection}
            pagination={{
              pageSize: pagination.limit,
              showSizeChanger: true,
              showTotal: total => `Tổng số ${total} câu hỏi`,
              total: data?.meta?.total,
            }}
            onChange={handleTableChange}
            loading={loading}
            rowKey="id"
            locale={{
              emptyText: <Empty description="Không có dữ liệu câu hỏi" />,
            }}
          />
        </Card>
      </div>
    </>
  );
};

export default QuestionTab;
