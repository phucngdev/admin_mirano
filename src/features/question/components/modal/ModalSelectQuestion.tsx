import {
  practiceTypeColorMap,
  practiceTypeLabelMap,
} from '#/api/requests/interfaces/LabelMap';
import { CloseOutlined, DeleteTwoTone } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  Modal,
  Tag,
  Table,
  message,
  Row,
  Col,
} from 'antd';
import { useEffect, useState } from 'react';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { useSelector } from 'react-redux';
import { getAllQuestion } from '#/src/redux/thunk/question.thunk';
import { Tool } from '#/shared/utils';
import { QuestionEntity, QuestionGroupEntity } from '#/api/requests';
import { updateQuestionGroup } from '#/src/redux/thunk/question-group.thunk';

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
    dataIndex: 'type',
    key: 'type',
    render: (type: QuestionEntity.type) => {
      const label = practiceTypeLabelMap[type] || 'Không xác định';
      const color = practiceTypeColorMap[type] || 'default';

      return <Tag color={color}>{label}</Tag>;
    },
    title: 'Loại',
    width: 150,
  },
  {
    dataIndex: 'tag',
    key: 'tag',
    render: (tad: string) => {
      return <Tag color="blue">{tad}</Tag>;
    },
    title: 'Tag',
    width: 150,
  },
];

interface ModalSelectQuestionProps {
  open: boolean;
  onClose: () => void;
  questionGroup: QuestionGroupEntity | null;
}

const ModalSelectQuestion = ({
  open,
  onClose,
  questionGroup,
}: ModalSelectQuestionProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { data } = useSelector((state: RootState) => state.question);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
    current: 1,
    query: '',
    tag: '',
  });

  const fetchData = async () => {
    if (!questionGroup) return;
    await dispatch(
      getAllQuestion({
        limit: pagination.limit,
        offset: pagination.offset,
        query: pagination.query,
        tag: pagination.tag,
        type: QuestionEntity.type.MULTIPLE_CHOICE,
      }),
    );
  };

  useEffect(() => {
    fetchData();
  }, [pagination, questionGroup]);

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
    if (!questionGroup) return;
    const list_id: string[] =
      questionGroup.questions?.map(q => q.id.toString()) || [];
    const selectedIds: string[] = selectedRowKeys.map(id => id.toString());

    const result = await dispatch(
      updateQuestionGroup({
        id: questionGroup.id,
        data: {
          ...questionGroup,
          questionIds: [...list_id, ...selectedIds],
        },
      }),
    );

    if (result.payload.statusCode === 200) {
      message.success('Thêm thành công');
      onClose();
      setSelectedRowKeys([]);
    } else {
      message.error('Thêm thất bại');
    }
  };

  return (
    <>
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
              Thêm câu hỏi
            </span>
          </>
        }
        width={1100}
      >
        <Form
          form={form}
          layout="vertical"
          validateTrigger={['onBlur', 'onSubmit']}
          className="form-new-question"
        >
          <Row gutter={16}>
            <Col span={12}>
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
            </Col>
            <Col span={12}>
              <Form.Item
                validateTrigger={['onBlur', 'onChange']}
                name="tag"
                label="Tìm kiếm theo tag:"
                style={{
                  width: '100%',
                }}
              >
                <Input
                  className="custom-input"
                  placeholder="Tìm kiếm theo tag"
                  onChange={e =>
                    setPagination({
                      ...pagination,
                      tag: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div className="title-list-question">
          Danh sách câu hỏi:{'   '}
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
          dataSource={data?.items}
          scroll={{ y: 340 }}
          pagination={{
            pageSize: pagination.limit,
            showSizeChanger: true,
            showTotal: total => `Tổng số ${total} câu hỏi`,
            total: data?.meta.total,
          }}
          onChange={handleTableChange}
          rowSelection={rowSelection}
        />
      </Modal>
    </>
  );
};

export default ModalSelectQuestion;
