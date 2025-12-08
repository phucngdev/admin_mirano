import {
  practiceTypeColorMap,
  practiceTypeLabelMap,
} from '#/api/requests/interfaces/LabelMap';
import {
  CloseOutlined,
  DeleteTwoTone,
  LinkOutlined,
  StopOutlined,
} from '@ant-design/icons';
import { Button, Form, Image, Input, Modal, Tag, Table, message } from 'antd';
import { useEffect, useState } from 'react';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { useSelector } from 'react-redux';
import { Tool } from '#/shared/utils';
import { getQuestionGroup } from '#/src/redux/thunk/question-group.thunk';
import {
  QuestionEntity,
  QuestionGroupReferenceEntity,
  TestDetailEntity,
} from '#/api/requests';
import { fallback } from '#/shared/constants/fallback';
import { createQuestionGroupReferenceService } from '#/api/services/questionGroupReference';

const columns = (): ColumnsType<any> => [
  {
    dataIndex: 'content',
    key: 'content',
    render: (_, record: any) => {
      return (
        <span className="question-title">{Tool.stripHtml(record.content)}</span>
      );
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
      const label = practiceTypeLabelMap[type] || 'Nhóm câu hỏi';
      const color = practiceTypeColorMap[type] || 'default';

      return <Tag color={color}>{label}</Tag>;
    },
    title: 'Loại',
    width: 150,
  },
];

interface ModalSelectGroupProps {
  open: boolean;
  onClose: () => void;
  itemUpdate?: TestDetailEntity | null;
}

const ModalSelectGroup = ({
  open,
  onClose,
  itemUpdate,
}: ModalSelectGroupProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { group } = useSelector((state: RootState) => state.question);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
    current: 1,
    query: '',
  });

  const fetchDataGroup = async () => {
    await dispatch(
      getQuestionGroup({
        limit: pagination.limit,
        offset: pagination.offset,
        query: pagination.query,
      }),
    );
  };

  useEffect(() => {
    fetchDataGroup();
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
    if (!itemUpdate) return;

    const result = await createQuestionGroupReferenceService({
      questionGroupIds: selectedRowKeys as string[],
      testDetailId: itemUpdate.id,
      type: QuestionGroupReferenceEntity.type.TEST_DETAIL,
    });

    if (result.data.statusCode === 201) {
      message.success('Thêm thành công');
      onClose();
      setSelectedRowKeys([]);
    } else {
      message.error('Thêm thất bại');
    }
  };

  return (
    <Modal
      closeIcon={<CloseOutlined />}
      className="modal-select-question"
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button key="submit" onClick={handleSubmit} type="primary">
          Lưu
        </Button>,
      ]}
      onCancel={onClose}
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
            Thêm nhóm câu hỏi
          </span>
        </>
      }
      width={1000}
    >
      <Form
        form={form}
        layout="vertical"
        validateTrigger={['onBlur', 'onSubmit']}
      >
        <Form.Item
          validateTrigger={['onBlur', 'onChange']}
          name="search"
          label="Tìm kiếm:"
          style={{
            width: '100%',
          }}
        >
          <Input
            className="custom-input"
            placeholder="Tìm kiếm"
            onChange={e =>
              setPagination({
                ...pagination,
                query: e.target.value,
              })
            }
          />
        </Form.Item>
      </Form>
      <div className="title-list-question">
        Danh sách nhóm câu hỏi:{'   '}
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
        columns={columns()}
        dataSource={group.items}
        scroll={{ y: 340 }}
        pagination={{
          pageSize: pagination.limit,
          showSizeChanger: true,
          showTotal: total => `Tổng số ${total} nhóm câu hỏi`,
          total: group.meta.total,
        }}
        onChange={handleTableChange}
        rowSelection={rowSelection}
      />
    </Modal>
  );
};

export default ModalSelectGroup;
