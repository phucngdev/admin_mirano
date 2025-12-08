import {
  Table,
  Collapse,
  Tooltip,
  Button,
  Modal,
  message,
  Input,
  Form,
  Space,
  Row,
  Col,
  Card,
  Upload,
  Tag,
} from 'antd';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { useEffect, useState } from 'react';
import { DeleteTwoTone, EditTwoTone, SelectOutlined } from '@ant-design/icons';
import {
  getQuestionGroup,
  deleteQuestionGroup,
  updateQuestionGroup,
} from '#/src/redux/thunk/question-group.thunk';
import { Tool } from '#/shared/utils';
import { QuestionEntity, QuestionGroupEntity } from '#/api/requests';
import ModalSelectQuestion from '../modal/ModalSelectQuestion';
import ModalCreateUpdateGroup from '../modal/ModalCreateUpdateGroup';
import ReadOnlyCK from '#/shared/components/ckeditor/ReadOnlyCK';

const GroupQuestionTab = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { group } = useSelector((state: RootState) => state.question); // đảm bảo bạn có `total`
  const [openModal, setOpenModal] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [itemUpdate, setItemUpdate] = useState<QuestionGroupEntity | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
    current: 1,
    query: '',
    tag: '',
  });

  const fetchData = async () => {
    setLoading(true);
    await dispatch(
      getQuestionGroup({
        limit: pagination.limit,
        offset: pagination.offset,
        query: pagination.query,
        tag: pagination.tag,
      }),
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [pagination]);

  const handleTableChange = (pagination: any) => {
    const { current, pageSize } = pagination;
    setPagination(prev => ({
      ...prev,
      current,
      limit: pageSize,
      offset: (current - 1) * pageSize,
    }));
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa nhóm câu hỏi này?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        const result = await dispatch(deleteQuestionGroup(id));
        if (result.payload.statusCode === 200) {
          message.success('Xoá thành công');
          fetchData();
        } else {
          message.error('Xoá thất bại');
        }
      },
      title: 'Xác nhận xóa',
    });
  };

  const handleDeleteQuestion = (groupId: string, questionId: string) => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa câu hỏi này khỏi nhóm?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        const groupUpdate = group.items.find(item => item.id === groupId);
        if (!groupUpdate) return;
        const result = await dispatch(
          updateQuestionGroup({
            id: groupId,
            data: {
              ...groupUpdate,
              questionIds: groupUpdate.questions
                .filter(item => item.id !== questionId)
                .map(q => q.id),
            },
          }),
        );
        if (result.payload.statusCode === 200) {
          message.success('Xoá thành công');
          fetchData();
        } else {
          message.error('Xoá thất bại');
        }
      },
      title: 'Xác nhận xóa',
    });
  };

  const columns = [
    {
      title: 'Nội dung nhóm câu hỏi',
      dataIndex: 'content',
      key: 'content',
      render: (text: string) => <ReadOnlyCK value={text} />,
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
      render: (text: string) => (
        <Tag
          color="cyan"
          style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
        >
          {text}
        </Tag>
      ),
      width: 150,
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 150,
      render: (_: any, record: any) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Tooltip title="Chỉnh sửa ">
            <Button
              onClick={() => {
                setOpenModalCreate(true);
                setItemUpdate(record);
              }}
              icon={<EditTwoTone twoToneColor="" />}
            ></Button>
          </Tooltip>
          <Tooltip title="Xoá">
            <Button
              danger
              icon={<DeleteTwoTone twoToneColor="#f33832" />}
              onClick={() => handleDelete(record.id)}
            ></Button>
          </Tooltip>
          <Tooltip title="Thêm câu hỏi">
            <Button
              color="pink"
              variant="outlined"
              onClick={() => {
                setItemUpdate(record);
                setOpenModal(true);
              }}
              icon={<SelectOutlined className="text-[#eb2f96]" />}
            ></Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const renderAnswersByType = (question: any) => {
    switch (question.type) {
      case QuestionEntity.type.MULTIPLE_CHOICE:
        return question.multipleChoiceAnswers.map((ans: any) => (
          <Form.Item key={ans.id}>
            <Input
              value={ans.content}
              readOnly
              className={`custom-input ${ans.isCorrect ? 'isCorrect' : 'unCorrect'}`}
            />
          </Form.Item>
        ));

      case QuestionEntity.type.MULTIPLE_CHOICE_HORIZONTAL:
        return question.multipleChoiceHorizontal.map((ans: any) => (
          <>
            <Form.Item key={ans.id}>
              <Input
                value={ans.content}
                readOnly
                className={`custom-input ${ans.isCorrect ? 'isCorrect' : 'unCorrect'}`}
              />
            </Form.Item>
          </>
        ));

      case QuestionEntity.type.FILL_IN_BLANK:
        return question.fillInBlank.map((item: any, idx: number) => (
          <>
            <Row gutter={16} key={idx}>
              <Col span={12}>
                <Form.Item label={`Chỗ trống ${idx + 1}`}>
                  <Input
                    className="custom-input"
                    value={item.correctAnswer}
                    readOnly
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={`Giải thích ${idx + 1}`}>
                  <Input
                    className="custom-input"
                    value={item.explanation}
                    readOnly
                  />
                </Form.Item>
              </Col>
            </Row>
          </>
        ));

      case QuestionEntity.type.MATCHING:
        return question.matchingAnswers.map((item: any, idx: number) => (
          <Row gutter={16} key={`${idx}`}>
            <Col span={12}>
              <Form.Item label={`Cặp ${idx + 1}`}>
                <Input className="custom-input" value={item.left} readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={` `}>
                <Input className="custom-input" value={item.right} readOnly />
              </Form.Item>
            </Col>
          </Row>
        ));

      //   case 'ESSAY':
      //     return (
      //       <Form.Item label="Câu trả lời bài luận">
      //         <Input.TextArea
      //           value={question.essayAnswers?.[0]?.answer || ''}
      //           readOnly
      //         />
      //       </Form.Item>
      //     );

      case QuestionEntity.type.SORTING:
        return question.sortingAnswers.map((item: any, idx: number) => (
          <Form.Item key={idx} label={`Thứ tự ${idx + 1}`}>
            <Input className="custom-input" value={item.answer} readOnly />
          </Form.Item>
        ));

      default:
        return <p>Không có đáp án phù hợp.</p>;
    }
  };

  return (
    <Card className="content-tab-group">
      <ModalSelectQuestion
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setItemUpdate(null);
          fetchData();
        }}
        questionGroup={itemUpdate}
      />
      <ModalCreateUpdateGroup
        open={openModalCreate}
        onClose={() => {
          setOpenModalCreate(false);
          setItemUpdate(null);
          fetchData();
        }}
        itemUpdate={itemUpdate}
      />
      <div className="head-table">
        <span className="span-title">Danh sách nhóm câu hỏi</span>
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
          <Input
            className="custom-input input-search"
            placeholder="Tìm kiếm tag"
            onChange={e =>
              setPagination({
                ...pagination,
                tag: e.target.value,
              })
            }
          />

          <Button
            type="primary"
            onClick={() => {
              setOpenModalCreate(true);
            }}
          >
            Thêm nhóm câu hỏi
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={group?.items || []}
        rowKey="id"
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.limit,
          total: group.meta.total,
          showSizeChanger: true,
          showTotal: total => `Tổng số ${total} nhóm câu hỏi`,
        }}
        onChange={handleTableChange}
        expandable={{
          expandedRowRender: (record: any) => (
            <>
              <Row gutter={16}>
                {record.imageUrl && (
                  <Col span={6}>
                    <Form.Item
                      name="imageUrl"
                      label="Ảnh nhóm câu hỏi:"
                      style={{ width: '100%' }}
                    >
                      <Upload
                        listType="picture-card"
                        fileList={[
                          {
                            uid: Date.now().toString(),
                            name: record.imageUrl,
                            status: 'done',
                            url: record.imageUrl,
                          },
                        ]}
                      ></Upload>
                    </Form.Item>
                  </Col>
                )}
                {record.audioUrl && (
                  <Col span={6}>
                    <Form.Item
                      name="audioUrl"
                      label="Audio nhóm câu hỏi:"
                      style={{ width: '100%' }}
                    >
                      <Upload
                        fileList={[
                          {
                            uid: Date.now().toString(),
                            name: record.audioUrl,
                            status: 'done',
                            url: record.audioUrl,
                          },
                        ]}
                        listType="picture"
                      ></Upload>
                    </Form.Item>
                  </Col>
                )}
              </Row>
              <Collapse defaultActiveKey={['1']} expandIconPosition="end">
                {record.questions.map((item: any, idx: number) => (
                  <Collapse.Panel
                    header={
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <span>Chi tiết câu hỏi {idx + 1}</span>
                        <Button
                          danger
                          size="small"
                          onClick={() =>
                            handleDeleteQuestion(record.id, item.id)
                          }
                        >
                          Xoá
                        </Button>
                      </div>
                    }
                    key={`question-${item.id}`}
                  >
                    <Form form={form} layout="vertical">
                      <div key={item.id} className="mb-4">
                        <Form.Item label={`Câu hỏi ${idx + 1}`}>
                          <ReadOnlyCK value={item.content} />
                        </Form.Item>
                        <div className="list-answer">
                          {renderAnswersByType(item)}
                        </div>
                        {item.explain && (
                          <Form.Item label="Giải thích">
                            <ReadOnlyCK value={item.explain} />
                          </Form.Item>
                        )}
                      </div>
                    </Form>
                  </Collapse.Panel>
                ))}
              </Collapse>
            </>
          ),
        }}
      />
    </Card>
  );
};

export default GroupQuestionTab;
