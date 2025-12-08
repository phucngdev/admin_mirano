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
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Tag,
  Table,
  message,
} from 'antd';
import { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { useSelector } from 'react-redux';
import { getAllQuestion } from '#/src/redux/thunk/question.thunk';
import { Tool } from '#/shared/utils';
import { getQuestionGroup } from '#/src/redux/thunk/question-group.thunk';
import {
  ExamEntity,
  QuestionEntity,
  QuestionGroupReferenceEntity,
} from '#/api/requests';
import { fallback } from '#/shared/constants/fallback';
import { updateExam } from '#/src/redux/thunk/exam.thunk';
import { getExamLesson } from '#/src/redux/thunk/exam-lesson.thunk';
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
    title: 'Tag',
    dataIndex: 'tag',
    key: 'tag',
    render: (text: string) => <Tag color="cyan">{text}</Tag>,
    width: 150,
  },
  // {
  //   dataIndex: 'imageUrl',
  //   key: 'imageUrl',
  //   render: (imageUrl: string) => (
  //     <Image width={80} height={80} src={imageUrl} fallback={fallback} />
  //   ),
  //   title: 'Ảnh',
  //   width: 150,
  // },
  // {
  //   dataIndex: 'audioUrl',
  //   key: 'audioUrl',
  //   render: (audioUrl: string) =>
  //     audioUrl ? (
  //       <a href={audioUrl} target="_blank">
  //         <Tag icon={<LinkOutlined />} color="blue">
  //           Click to audio
  //         </Tag>
  //       </a>
  //     ) : (
  //       <Tag icon={<StopOutlined />} color="blue">
  //         ----------
  //       </Tag>
  //     ),
  //   title: 'Audio',
  //   width: 150,
  // },
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

interface ModalSelectQSToExamProps {
  open: boolean;
  onClose: () => void;
  itemUpdate?: ExamEntity | null;
}

const ModalSelectQSToExam = ({
  open,
  onClose,
  itemUpdate,
}: ModalSelectQSToExamProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { data, group } = useSelector((state: RootState) => state.question);
  const { lessonEdit } = useSelector((state: RootState) => state.lesson);

  const typeQuestion = Form.useWatch('type_question', form);
  const [tab, setTab] = useState<'question' | 'group'>('group');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRowKeysGroup, setSelectedRowKeysGroup] = useState<React.Key[]>(
    [],
  );
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
    current: 1,
    query: '',
    tag: '',
  });

  const fetchDataQuestion = async () => {
    await dispatch(
      getAllQuestion({
        limit: pagination.limit,
        offset: pagination.offset,
        query: pagination.query,
        tag: pagination.tag,
        type: typeQuestion,
      }),
    );
  };

  const fetchDataGroup = async () => {
    await dispatch(
      getQuestionGroup({
        limit: pagination.limit,
        offset: pagination.offset,
        query: pagination.query,
        tag: pagination.tag,
      }),
    );
  };

  useEffect(() => {
    if (tab === 'question') {
      fetchDataQuestion();
    } else {
      fetchDataGroup();
    }
  }, [pagination, typeQuestion, tab, open]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
    preserveSelectedRowKeys: true,
  };

  const rowSelectionGroup = {
    selectedRowKeys: selectedRowKeysGroup,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeysGroup(newSelectedRowKeys);
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

  const handleSubmit = async () => {
    if (!itemUpdate) return;
    const list_id_group = itemUpdate.questionGroups.map(qs => qs.id) || [];
    const list_select_group = selectedRowKeysGroup as string[];
    const list_id_question = itemUpdate.questions.map(qs => qs.id) || [];
    const list_select_question = selectedRowKeys as string[];
    try {
      if (list_select_question.length > 0) {
        await dispatch(
          updateExam({
            id: itemUpdate.id,
            data: {
              name: itemUpdate.name,
              questionIds: [...list_select_question, ...list_id_question],
            },
          }),
        );
      }
      if (list_select_group.length > 0) {
        await createQuestionGroupReferenceService({
          questionGroupIds: list_select_group,
          examId: itemUpdate.id,
          type: QuestionGroupReferenceEntity.type.EXAM,
        });
      }
      message.success('Thêm thành công');
      onClose();
      setSelectedRowKeys([]);
      setSelectedRowKeysGroup([]);
    } catch (error) {
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
            Thêm câu hỏi
          </span>
        </>
      }
      width={1200}
    >
      <Form
        form={form}
        layout="vertical"
        validateTrigger={['onBlur', 'onSubmit']}
        className="form-new-question"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item style={{ width: '100%' }}>
              <Button
                className="w-full h-10"
                onClick={() => setTab('question')}
                color={tab === 'question' ? 'primary' : 'default'}
                variant="outlined"
              >
                Câu hỏi
              </Button>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              validateTrigger={['onBlur', 'onChange']}
              style={{
                width: '100%',
              }}
            >
              <Button
                color={tab === 'group' ? 'primary' : 'default'}
                variant="outlined"
                className="w-full h-10"
                onClick={() => setTab('group')}
              >
                Nhóm câu hỏi
              </Button>
            </Form.Item>
          </Col>
        </Row>
        {tab === 'question' && (
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                name="type_question"
                label="Loại câu hỏi:"
                style={{ width: '100%' }}
              >
                <Select
                  onChange={value => {
                    form.setFieldValue('type_question', value);
                  }}
                  placeholder="Loại câu hỏi"
                  className="custom-select"
                  options={Object.entries(practiceTypeLabelMap).map(
                    ([key, label]) => ({
                      value: key,
                      label,
                    }),
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={9}>
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
            <Col span={9}>
              <Form.Item
                validateTrigger={['onBlur', 'onChange']}
                name="tag"
                label="Tìm kiếm tag:"
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
                      tag: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        )}
        {tab === 'group' && (
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
                label="Tìm kiếm tag:"
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
                      tag: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        )}
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
        dataSource={tab === 'question' ? data.items : group.items}
        scroll={{ y: 340 }}
        pagination={{
          pageSize: pagination.limit,
          showSizeChanger: true,
          showTotal: total => `Tổng số ${total} câu hỏi`,
          total: tab === 'question' ? data.meta.total : group.meta.total,
        }}
        onChange={handleTableChange}
        rowSelection={tab === 'question' ? rowSelection : rowSelectionGroup}
      />
    </Modal>
  );
};

export default ModalSelectQSToExam;
