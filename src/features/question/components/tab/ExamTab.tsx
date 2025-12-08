import {
  Table,
  Collapse,
  Tooltip,
  Button,
  Modal,
  message,
  Input,
  Form,
  Row,
  Col,
  Card,
  Upload,
  UploadFile,
  Popover,
} from 'antd';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  DeleteTwoTone,
  EditTwoTone,
  SelectOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { RootState, useAppDispatch } from '../../../../redux/store/store';
import {
  DocumentEntityType,
  ExamEntity,
  QuestionEntity,
} from '../../../../api/requests';
import { getAllExam, updateExam } from '../../../../redux/thunk/exam.thunk';
import ModalCreateExam from '../modal/ModalCreateExam';
import { deleteExamService } from '#/api/services/examService';
import { Tool } from '#/shared/utils';
import ModalSelectQSToExam from '../modal/ModalSelectQSToExam';
import { deleteQuestionGroupReferenceService } from '#/api/services/questionGroupReference';
import ReadOnlyCK from '#/shared/components/ckeditor/ReadOnlyCK';

const ExamTab = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { exam } = useSelector((state: RootState) => state.question); // đảm bảo bạn có `total`

  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [itemUpdate, setItemUpdate] = useState<ExamEntity | null>(null);
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
    current: 1,
    query: '',
  });

  const fetchData = async () => {
    setLoading(true);
    await dispatch(
      getAllExam({
        limit: pagination.limit,
        offset: pagination.offset,
        query: pagination.query,
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

  const handleDeleteQSInExam = (record: ExamEntity, id: string) => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa nhóm câu hỏi?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        const findQuestion = record.questions.find(q => q.id === id);
        const findGroup = record.questionGroups.find(q => q.id === id);

        if (findQuestion) {
          const list_id = record.questions
            .filter(q => q.id !== id)
            .map(q => q.id);
          const result = await dispatch(
            updateExam({
              id: record.id,
              data: {
                name: record.name,
                questionIds: list_id,
              },
            }),
          );
          if (result.payload.statusCode === 200) {
            message.success('Xoá thành công');
            fetchData();
          } else {
            message.error('Xoá thất bại');
          }
        } else if (findGroup) {
          const result = await deleteQuestionGroupReferenceService(
            record.id,
            id,
          );
          if (result.data.statusCode === 200) {
            message.success('Xoá thành công');
            fetchData();
          } else {
            message.error('Xoá thất bại');
          }
        }
      },
      title: 'Xác nhận xóa',
    });
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa bộ đề này?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        const result = await deleteExamService(id);
        if (result.data.statusCode === 200) {
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
      title: 'Tên bộ đề',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <span
          style={{
            color: 'rgba(102, 112, 133, 1)',
            fontWeight: '400',
            fontSize: '14px',
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: 'Số nhóm câu hỏi',
      dataIndex: 'questionGroups',
      key: 'questionGroups',
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
      title: 'Thao tác',
      key: 'actions',
      width: 350,
      render: (_: any, record: any) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Tooltip title="Chỉnh sửa ">
            <Button
              onClick={() => {
                setOpenModalCreate(true);
                setItemUpdate(record);
              }}
              icon={<EditTwoTone twoToneColor="" />}
            >
              Chỉnh sửa
            </Button>
          </Tooltip>
          <Tooltip title="Xoá">
            <Button
              danger
              icon={<DeleteTwoTone twoToneColor="#f33832" />}
              onClick={() => handleDelete(record.id)}
            >
              Xoá
            </Button>
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
            >
              Thêm câu hỏi
            </Button>
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

      case QuestionEntity.type.ESSAY:
        const fileList: UploadFile<any>[] = [
          {
            uid: Date.now().toString(),
            name: question.essayAnswers[0].examUrl,
            status: 'done',
            url: question.essayAnswers[0].examUrl,
          },
        ];
        const pdfFileListDocs: UploadFile<any>[] =
          question.essayAnswers[0].documents.map((doc: DocumentEntityType) => {
            return {
              uid: doc.id,
              name: doc.name,
              status: 'done',
              url: doc.url,
            };
          });
        return (
          <>
            <Form.Item
              label="Tài liệu"
              style={{ width: '100%', marginTop: '24px' }}
            >
              <Upload
                fileList={fileList}
                onRemove={() => {
                  message.info('Vui lòng chỉnh sửa tại phần quản lý câu hỏi');
                }}
                listType="picture"
              ></Upload>
            </Form.Item>
            <Form.Item
              label="Mô tả"
              style={{ width: '100%', marginTop: '24px' }}
            >
              {
                <Input.TextArea
                  readOnly
                  autoSize={{ minRows: 4, maxRows: 10 }}
                  value={Tool.stripHtml(question.essayAnswers[0].description)}
                />
              }
            </Form.Item>
            <Form.Item
              label="Tài liệu tham khảo"
              style={{ width: '100%', marginTop: '24px' }}
            >
              <Upload
                fileList={pdfFileListDocs}
                onRemove={() => {
                  message.info('Vui lòng chỉnh sửa tại phần quản lý câu hỏi');
                }}
                listType="picture"
              ></Upload>
            </Form.Item>
          </>
        );

      case QuestionEntity.type.SORTING:
        return question.sortingAnswers.map((item: any, idx: number) => (
          <Form.Item key={idx} label={`Thứ tự ${idx + 1}`}>
            <Input className="custom-input" value={item.content} readOnly />
          </Form.Item>
        ));

      default:
        return <p>Không có đáp án phù hợp.</p>;
    }
  };

  return (
    <>
      <ModalCreateExam
        open={openModalCreate}
        onClose={() => {
          setOpenModalCreate(false);
          setItemUpdate(null);
          fetchData();
        }}
        itemUpdate={itemUpdate}
      />
      <ModalSelectQSToExam
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setItemUpdate(null);
          fetchData();
        }}
        itemUpdate={itemUpdate}
      />
      <Card className="content-tab-group">
        <div className="head-table">
          <span className="span-title">Danh sách bộ đề</span>
          <div className="right-head-table">
            <Popover
              content={
                <>
                  <div className="max-w-[400px]">
                    <div className="">
                      <p className="font-bold">Bộ đề cơ bản</p>
                      với phần 'đọc hiểu' và 'nghe hiểu' sẽ chỉ được phép chứa
                      các 'nhóm câu hỏi' <br /> với phần 'luyện tập' sẽ gồm các
                      'nhóm câu hỏi' và câu hỏi 'sắp xếp câu'
                      <br />
                      <br />
                      <p className="font-bold">Bộ đề nâng cao</p>
                      với phần 'bài kiểm tra' sẽ gồm 'nhóm câu hỏi', 'câu hỏi
                      điền từ', 'câu hỏi trắc nghiệm đơn', 'câu hỏi ghép đôi'
                      <br />
                      <br />
                      <p className="font-bold"> Bộ đề tự luận </p>
                      với đề tự luận sẽ chỉ phép được chứa 1 'câu hỏi nộp file'
                    </div>
                  </div>
                </>
              }
              title="Lưu ý quan trọng"
            >
              <Button icon={<WarningOutlined />} type="default" danger>
                Lưu ý quan trọng
              </Button>
            </Popover>
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

            <Button
              type="primary"
              onClick={() => {
                setOpenModalCreate(true);
              }}
            >
              Thêm bộ đề
            </Button>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={exam?.items || []}
          rowKey="id"
          loading={loading}
          pagination={{
            current: pagination.current,
            pageSize: pagination.limit,
            total: exam.meta.total,
            showSizeChanger: true,
            showTotal: total => `Tổng số ${total} bộ đề`,
          }}
          onChange={handleTableChange}
          expandable={{
            expandedRowRender: (record: any) => (
              <Collapse defaultActiveKey={['1']} expandIconPosition="end">
                {record.questionGroups.map((item: any, idx: number) => (
                  <Collapse.Panel
                    header={
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <span>Chi tiết nhóm câu hỏi {idx + 1}</span>
                        <Button
                          danger
                          icon={<DeleteTwoTone twoToneColor="#f33832" />}
                          onClick={() => handleDeleteQSInExam(record, item.id)}
                        >
                          Xoá
                        </Button>
                      </div>
                    }
                    key={`question-${item.id}`}
                  >
                    <Form layout="vertical">
                      <div key={item.id} className="mb-4">
                        <Row gutter={16}>
                          {item.imageUrl && (
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
                                      name: item.imageUrl,
                                      status: 'done',
                                      url: item.imageUrl,
                                    },
                                  ]}
                                ></Upload>
                              </Form.Item>
                            </Col>
                          )}
                          {item.audioUrl && (
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
                                      name: item.audioUrl,
                                      status: 'done',
                                      url: item.audioUrl,
                                    },
                                  ]}
                                  listType="picture"
                                ></Upload>
                              </Form.Item>
                            </Col>
                          )}
                        </Row>
                        <Form.Item label={`Nội dung câu hỏi`}>
                          <ReadOnlyCK value={item.content} />
                        </Form.Item>
                        <Collapse
                          defaultActiveKey={['1']}
                          expandIconPosition="end"
                        >
                          {item.questions && item.questions.length ? (
                            item.questions?.map((qs: any, idx2: number) => (
                              <Collapse.Panel
                                header={
                                  <div
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <span>Chi tiết câu hỏi {idx2 + 1}</span>
                                  </div>
                                }
                                key={`question-${qs.id}`}
                              >
                                <Form layout="vertical">
                                  <div key={qs.id} className="mb-4">
                                    <Form.Item label={`Câu hỏi ${idx2 + 1}`}>
                                      <ReadOnlyCK value={qs.content} />
                                    </Form.Item>
                                    <div className="list-answer">
                                      {renderAnswersByType(qs)}
                                    </div>
                                    {qs.explain && (
                                      <Form.Item label="Giải thích">
                                        <ReadOnlyCK value={qs.explain} />
                                      </Form.Item>
                                    )}
                                  </div>
                                </Form>
                              </Collapse.Panel>
                            ))
                          ) : (
                            <div>Chưa có phần câu hỏi</div>
                          )}
                        </Collapse>
                        {item.explain && (
                          <Form.Item label="Giải thích">
                            <ReadOnlyCK value={item.explain} />
                          </Form.Item>
                        )}
                      </div>
                    </Form>
                  </Collapse.Panel>
                ))}
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
                          icon={<DeleteTwoTone twoToneColor="#f33832" />}
                          onClick={() => handleDeleteQSInExam(record, item.id)}
                        >
                          Xoá
                        </Button>
                      </div>
                    }
                    key={`question-${item.id}`}
                  >
                    <Form form={form} layout="vertical">
                      <div key={item.id} className="mb-4">
                        <Form.Item
                          label={`Câu hỏi ${idx + 1}`}
                          // name={['questions', idx, 'content']}
                        >
                          <ReadOnlyCK value={item.content} />
                        </Form.Item>
                        <div className="list-answer">
                          {renderAnswersByType(item)}
                        </div>
                        {item.explain && (
                          <Form.Item
                            label="Giải thích"
                            // name={['questions', idx, 'explain']}
                          >
                            <ReadOnlyCK value={item.explain} />
                          </Form.Item>
                        )}
                      </div>
                    </Form>
                  </Collapse.Panel>
                ))}
              </Collapse>
            ),
          }}
        />
      </Card>
    </>
  );
};

export default ExamTab;
