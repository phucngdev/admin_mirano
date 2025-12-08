import { createExamLessonService } from '#/api/services/examLessonService';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { getExamLesson } from '#/src/redux/thunk/exam-lesson.thunk';
import { getAllExam } from '#/src/redux/thunk/exam.thunk';
import { CloseOutlined, DeleteTwoTone } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Space,
  Tag,
} from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import {
  TablePaginationConfig,
  TableRowSelection,
} from 'antd/es/table/interface';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const columns = (
  selectedRowKeys: React.Key[],
  setting: {
    randomAnswer: boolean;
    randomQuestion: boolean;
    showSolution: boolean;
  },
  setSetting: React.Dispatch<
    React.SetStateAction<{
      randomAnswer: boolean;
      randomQuestion: boolean;
      showSolution: boolean;
    }>
  >,
): ColumnsType<any> => [
  {
    dataIndex: 'name',
    key: 'name',
    render: text => {
      return (
        <span
          style={{
            color: 'rgba(102, 112, 133, 1)',
            fontWeight: '400',
            fontSize: '14px',
          }}
        >
          {text}
        </span>
      );
    },
    title: 'Bộ đề',
  },
  {
    title: 'Số nhóm câu hỏi',
    dataIndex: 'questionGroups',
    key: 'questionGroups',
    width: 170,
    render: (_: any, record: any) => (
      <span
        style={{
          color: 'rgba(102, 112, 133, 1)',
          fontWeight: '400',
          fontSize: '14px',
        }}
      >
        {record.questionGroups.length}
      </span>
    ),
  },
  {
    title: 'Số câu hỏi',
    dataIndex: 'questions',
    width: 140,
    key: 'questions',
    render: (_: any, record: any) => (
      <span
        style={{
          color: 'rgba(102, 112, 133, 1)',
          fontWeight: '400',
          fontSize: '14px',
        }}
      >
        {record.questions.length}
      </span>
    ),
  },
  {
    title: 'Cài đặt',
    dataIndex: 'action',
    key: 'action',
    width: 160,
    render: (_: any, record: any) => {
      // chỉ hiển thị checkbox nếu row này được chọn
      if (selectedRowKeys.includes(record.id)) {
        return (
          <Space direction="vertical">
            <Checkbox
              checked={setting.randomAnswer}
              onChange={e =>
                setSetting(prev => ({
                  ...prev,
                  randomAnswer: e.target.checked,
                }))
              }
            >
              Trộn đáp án
            </Checkbox>
            <Checkbox
              checked={setting.randomQuestion}
              onChange={e =>
                setSetting(prev => ({
                  ...prev,
                  randomQuestion: e.target.checked,
                }))
              }
            >
              Trộn câu hỏi
            </Checkbox>
            <Checkbox
              checked={setting.showSolution}
              onChange={e =>
                setSetting(prev => ({
                  ...prev,
                  showSolution: e.target.checked,
                }))
              }
            >
              Hiện lời giải
            </Checkbox>
          </Space>
        );
      }
      return null;
    },
  },
];

interface ModalSelectExamProps {
  open: boolean;
  onClose: () => void;
}

const ModalSelectExam = ({ open, onClose }: ModalSelectExamProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { exam } = useSelector((state: RootState) => state.question);
  const { lessonEdit } = useSelector((state: RootState) => state.lesson);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [setting, setSetting] = useState({
    randomAnswer: false,
    randomQuestion: false,
    showSolution: false,
  });
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
    current: 1,
    query: '',
  });

  useEffect(() => {
    setSetting({
      randomAnswer: false,
      randomQuestion: false,
      showSolution: false,
    });
  }, [selectedRowKeys]);

  const fetchData = async () => {
    await dispatch(
      getAllExam({
        limit: pagination.limit,
        offset: pagination.offset,
        query: pagination.query,
      }),
    );
  };

  useEffect(() => {
    fetchData();
  }, [pagination, open]);

  const handleSubmit = async () => {
    if (!lessonEdit) return;
    const result = await createExamLessonService(lessonEdit.id, {
      examId: selectedRowKeys[0] as string,
      randomAnswer: setting.randomAnswer,
      randomQuestion: setting.randomQuestion,
      showSolution: setting.showSolution,
    });
    if (result.data.statusCode === 201) {
      message.success('Thêm thành công');
      await dispatch(getExamLesson(lessonEdit.id));
      onClose();
    } else {
      message.error('Thêm thất bại');
    }
  };

  const onSelectChange = (selectedKeys: React.Key[]) => {
    setSelectedRowKeys(selectedKeys);
  };

  const rowSelection: TableRowSelection<any> = {
    type: 'radio' as const,
    selectedRowKeys,
    onChange: onSelectChange,
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
            Danh sách bộ đề
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
        </Row>
      </Form>
      <div className="title-list-question">
        Danh sách bộ đề:{'   '}
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
        columns={columns(selectedRowKeys, setting, setSetting)}
        dataSource={exam.items}
        scroll={{ y: 340 }}
        pagination={{
          pageSize: pagination.limit,
          showSizeChanger: true,
          showTotal: total => `Tổng số ${total} bộ đề`,
          total: exam.meta.total,
        }}
        onChange={handleTableChange}
        rowSelection={rowSelection}
      />
    </Modal>
  );
};

export default ModalSelectExam;
