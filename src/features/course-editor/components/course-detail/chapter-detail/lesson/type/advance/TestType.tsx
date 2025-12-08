import {
  Button,
  Col,
  Collapse,
  Form,
  FormInstance,
  Input,
  message,
  Modal,
  Row,
  Select,
  Table,
  Tooltip,
  Upload,
  UploadFile,
} from 'antd';
import { TypeModal } from '../../LessonDetail';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { Tool } from '#/shared/utils';
import {
  DeleteTwoTone,
  ImportOutlined,
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import ModalSelectQuestion from '#/features/course-editor/components/modal/ModalSelectQuestion';
import Loading from '#/shared/components/loading/Loading';
import { DocumentEntityType, QuestionEntity } from '#/api/requests';
import { LessonDetailEntity } from '#/api/requests/interfaces/LessonDetailEntity';
import {
  createAndAddExamLesson,
  getExamLesson,
  updateControlExamLesson,
} from '#/src/redux/thunk/exam-lesson.thunk';
import { updateExam } from '#/src/redux/thunk/exam.thunk';
import ModalSelectExam from '#/features/course-editor/components/modal/ModalSelectExam';
import { deleteExamLessonService } from '#/api/services/examLessonService';
import { deleteQuestionGroupReference } from '#/src/redux/thunk/question-group-reference.thunk';
import BaseCKEditor from '#/shared/components/ckeditor/BaseCKEditor';
import { uploadFileToS3 } from '#/api/services/uploadS3';
import { beforeUploadPdf } from '#/shared/props/beforeUpload';
import ReadOnlyCK from '#/shared/components/ckeditor/ReadOnlyCK';
import { Option } from 'antd/es/mentions';

interface TestTypeProps {
  form: FormInstance;
  setActiveModal: (key: TypeModal) => void;
  lesson: LessonDetailEntity;
  activeModal: TypeModal;
  handleClose: (
    key: 'pratices' | 'select-question' | 'group_question' | 'test-file',
  ) => void;
}

const TestType = ({
  setActiveModal,
  lesson,
  form,
  activeModal,
  handleClose,
}: TestTypeProps) => {
  const [formExam] = Form.useForm();
  const dispatch = useAppDispatch();
  const { lessonEdit } = useSelector((state: RootState) => state.lesson);

  const [loading, setLoading] = useState<'exam' | 'file' | ''>('');
  const [openForm, setOpenForm] = useState(false);
  const [openModalExam, setOpenModalExam] = useState(false);
  const [pdfFileList, setPdfFileList] = useState<UploadFile[]>([]);
  const [pdfFileListDocs, setPdfFileListDocs] = useState<UploadFile[]>([]);

  const fetchData = async () => {
    try {
      setLoading('exam');
      await dispatch(getExamLesson(lesson.id));
    } catch (error) {
      message.error('Có lỗi xảy ra');
    } finally {
      setLoading('');
    }
  };

  useEffect(() => {
    if (lesson) {
      fetchData();
    }
  }, [lesson]);

  useEffect(() => {
    if (lessonEdit) {
      if (lessonEdit.exam_lesson && lessonEdit.exam_lesson.exam) {
        formExam.setFieldsValue({
          name: lessonEdit.exam_lesson.exam.name,
          randomAnswer: lessonEdit.exam_lesson.randomAnswer,
          showSolution: lessonEdit.exam_lesson.showSolution,
          randomQuestion: lessonEdit.exam_lesson.randomQuestion,
          showAnswer: lessonEdit.exam_lesson.showAnswer,
        });
        setOpenForm(true);
        if (
          lessonEdit.exam_lesson.exam.questionMapping &&
          lessonEdit.exam_lesson.exam.questionMapping[0]?.type ===
            QuestionEntity.type.ESSAY
        ) {
          setPdfFileList([
            {
              uid: Date.now().toString(),
              name: lessonEdit.exam_lesson.exam.questionMapping[0]
                .essayAnswers[0].examUrl,
              status: 'done',
              url: lessonEdit.exam_lesson.exam.questionMapping[0]
                .essayAnswers[0].examUrl,
            },
          ]);
          const listDocs: UploadFile<any>[] =
            lessonEdit.exam_lesson.exam.questionMapping[0].essayAnswers[0].documents.map(
              (doc: DocumentEntityType) => {
                return {
                  uid: doc.id,
                  name: doc.name,
                  status: 'done',
                  url: doc.url,
                };
              },
            );
          setPdfFileListDocs(listDocs);
        }
      } else {
        formExam.resetFields();
        setOpenForm(false);
      }
    } else {
      form.resetFields();
      formExam.resetFields();
      setOpenForm(false);
    }
  }, [lessonEdit]);

  const handleDeleteGroup = (id: string) => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa nhóm câu hỏi?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        if (!lessonEdit || !lessonEdit.exam_lesson) return;
        const findQuestion = lessonEdit.exam_lesson.exam.questionMapping.find(
          q => q.id === id,
        );
        if (findQuestion && 'type' in findQuestion) {
          const list_id = lessonEdit.exam_lesson.exam.questionMapping
            .filter(q => q.id !== id)
            .map(q => q.id);
          const result = await dispatch(
            updateExam({
              id: lessonEdit.exam_lesson.exam.id,
              data: {
                name: lessonEdit.exam_lesson.exam.name,
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
        } else {
          const result = await dispatch(
            deleteQuestionGroupReference({
              parentId: lessonEdit.exam_lesson.exam.id,
              questionGroupId: id,
            }),
          );
          if (result.payload.statusCode === 200) {
            message.success('Xoá thành công');
          } else {
            message.error('Xoá thất bại');
          }
        }
      },
      title: 'Xác nhận xóa',
    });
  };

  const handleDeleteExam = () => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa phần câu hỏi?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        if (!lessonEdit || !lessonEdit.exam_lesson) return;
        const result = await deleteExamLessonService(
          lessonEdit.exam_lesson.exam.id,
          lessonEdit.id,
        );
        if (result.data.statusCode === 200) {
          message.success('Xoá thành công');
          setOpenForm(false);
          formExam.resetFields();
          fetchData();
        } else {
          message.error('Xoá thất bại');
        }
      },
      title: 'Xác nhận xóa',
    });
  };

  const handleSubmitExam = async () => {
    const values = await formExam.validateFields();
    if (!lessonEdit) return;
    if (lessonEdit.exam_lesson && lessonEdit.exam_lesson.exam) {
      const list_id: string[] = lessonEdit.exam_lesson.exam.questionMapping.map(
        qs => qs.id,
      );

      const result = await dispatch(
        updateExam({
          id: lessonEdit.exam_lesson.exam.id,
          data: {
            name: values.name,
            questionIds: list_id,
          },
        }),
      );

      if (result.payload.statusCode === 200) {
        message.success('Cập nhật thông tin thành công!');
        fetchData();
      } else {
        message.error('Cập nhật đã thất bại! Vui lòng tải lại trang');
      }
    } else {
      const result = await dispatch(
        createAndAddExamLesson({
          lessonId: lessonEdit.id,
          data: {
            name: values.name,
            randomAnswer: values.randomAnswer,
            randomQuestion: values.randomQuestion,
            showSolution: values.showSolution,
            showAnswer: values.showAnswer,
          },
        }),
      );
      if (result.meta.requestStatus === 'fulfilled') {
        message.success('Tạo thành công!');
        fetchData();
      } else {
        message.error('Tạo thất bại! Vui lòng tải lại trang');
      }
    }
  };

  const handleUpdateControlExamLesson = async (
    key: 'randomAnswer' | 'showSolution' | 'randomQuestion' | 'showAnswer',
    value: boolean,
  ) => {
    if (!lessonEdit || !lessonEdit.exam_lesson) return;
    const result = await dispatch(
      updateControlExamLesson({
        examId: lessonEdit.exam_lesson.exam.id,
        lessonId: lessonEdit.id,
        data: {
          randomAnswer: lessonEdit.exam_lesson.randomAnswer,
          showSolution: lessonEdit.exam_lesson.showSolution,
          randomQuestion: lessonEdit.exam_lesson.randomQuestion,
          showAnswer: lessonEdit.exam_lesson.showAnswer,
          [key]: value,
        },
      }),
    );
    if (result.payload.statusCode === 200) {
      message.success('Cập nhật thành công');
    } else {
      message.error('Cập nhật thất bại');
    }
  };

  const columns = [
    {
      title: 'Nội dung bài kiểm tra',
      dataIndex: 'content',
      key: 'content',
      render: (text: string) => <ReadOnlyCK value={text} />,
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 150,
      render: (_: any, record: any) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Tooltip title="Xoá">
            <Button
              danger
              icon={<DeleteTwoTone twoToneColor="#f33832" />}
              onClick={() => handleDeleteGroup(record.id)}
            >
              Xoá
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
              className={`custom-input ${ans.isCorrect ? 'bg-green-100' : 'bg-red-100'}`}
            />
          </Form.Item>
        ));

      case QuestionEntity.type.MULTIPLE_CHOICE_HORIZONTAL:
        return (
          <>
            {question.multipleChoiceHorizontal.map((ans: any) => (
              <>
                <Form.Item key={ans.id}>
                  <Input
                    value={ans.content}
                    readOnly
                    className={`custom-input ${ans.isCorrect ? 'bg-green-100' : 'bg-red-100'}`}
                  />
                </Form.Item>
              </>
            ))}
          </>
        );

      case QuestionEntity.type.CHOOSE_ANSWER_IN_BLANK:
        return (
          <>
            {question.chooseAnswerInBlank.map((item: any, idx: number) => (
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
            ))}
            <Row gutter={16}>
              {question.options.map((record: any, idx: number) => (
                <Col span={8}>
                  <Form.Item label={`Đáp án sai ${idx + 1}`}>
                    <Input className="custom-input" value={record} readOnly />
                  </Form.Item>
                </Col>
              ))}
            </Row>
          </>
        );

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
        return question.essayAnswers.map((item: any) => (
          <>
            <Form.Item
              label="Tài liệu"
              style={{ width: '100%', marginTop: '24px' }}
            >
              <Upload
                fileList={pdfFileList}
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
              {lessonEdit && lessonEdit.exam_lesson && (
                <Input.TextArea
                  readOnly
                  autoSize={{ minRows: 4, maxRows: 10 }}
                  value={Tool.stripHtml(item.description)}
                />
              )}
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
        ));

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

  if (loading) return <Loading />;

  return (
    lessonEdit && (
      <>
        <ModalSelectQuestion
          open={activeModal === 'select-question'}
          type="exam"
          onClose={() => {
            handleClose('select-question');
          }}
        />
        <ModalSelectExam
          open={openModalExam}
          onClose={() => {
            setOpenModalExam(false);
          }}
        />

        <div className="list-practice-content">
          {!openForm && (
            <div className="flex items-center gap-3">
              <Button icon={<PlusOutlined />} onClick={() => setOpenForm(true)}>
                Tạo phần câu hỏi
              </Button>
              <Button
                icon={<ImportOutlined />}
                onClick={() => setOpenModalExam(true)}
              >
                Chọn từ bộ đề
              </Button>
            </div>
          )}
          {openForm && (
            <>
              <Form
                form={formExam}
                layout="vertical"
                validateTrigger={['onBlur', 'onSubmit']}
              >
                <div className="flex justify-between">
                  <p className="p-title my-3">Phần câu hỏi</p>
                  <div className="flex items-center gap-3">
                    {lessonEdit && !lessonEdit.exam_lesson && (
                      <Button danger onClick={() => setOpenForm(false)}>
                        Huỷ
                      </Button>
                    )}
                    {lessonEdit && lessonEdit.exam_lesson && (
                      <Button danger onClick={handleDeleteExam}>
                        Xoá
                      </Button>
                    )}
                    <Button type="primary" onClick={handleSubmitExam}>
                      Cập nhật
                    </Button>
                  </div>
                </div>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      validateTrigger={['onBlur', 'onChange']}
                      name="name"
                      label="Tên bộ đề:"
                      style={{
                        width: '100%',
                      }}
                      rules={[
                        { required: true, message: 'Không được để trống' },
                      ]}
                    >
                      <Input className="custom-input" placeholder="Tên bộ đề" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      validateTrigger={['onBlur', 'onChange']}
                      name="randomAnswer"
                      label="Trộn đáp án:"
                      style={{
                        width: '100%',
                      }}
                      rules={[
                        { required: true, message: 'Không được để trống' },
                      ]}
                    >
                      <Select
                        placeholder="Trộn đáp án"
                        onChange={value => {
                          handleUpdateControlExamLesson('randomAnswer', value);
                        }}
                        className="h-10"
                        options={[
                          {
                            value: true,
                            label: 'Có',
                          },
                          {
                            value: false,
                            label: 'Không',
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      validateTrigger={['onBlur', 'onChange']}
                      name="randomQuestion"
                      label="Trộn câu hỏi:"
                      style={{
                        width: '100%',
                      }}
                      rules={[
                        { required: true, message: 'Không được để trống' },
                      ]}
                    >
                      <Select
                        placeholder="Trộn câu hỏi"
                        onChange={value => {
                          handleUpdateControlExamLesson(
                            'randomQuestion',
                            value,
                          );
                        }}
                        className="h-10"
                        options={[
                          {
                            value: true,
                            label: 'Có',
                          },
                          {
                            value: false,
                            label: 'Không',
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      validateTrigger={['onBlur', 'onChange']}
                      name="showSolution"
                      label="Hiện giải thích:"
                      style={{
                        width: '100%',
                      }}
                      rules={[
                        { required: true, message: 'Không được để trống' },
                      ]}
                    >
                      <Select
                        placeholder="Hiện giải thích"
                        onChange={value => {
                          handleUpdateControlExamLesson('showSolution', value);
                        }}
                        className="h-10"
                        options={[
                          {
                            value: true,
                            label: 'Có',
                          },
                          {
                            value: false,
                            label: 'Không',
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      validateTrigger={['onBlur', 'onChange']}
                      name="showAnswer"
                      label="Hiện đáp án"
                      style={{
                        width: '100%',
                      }}
                      rules={[
                        { required: true, message: 'Không được để trống' },
                      ]}
                    >
                      <Select
                        placeholder="Hiện đáp án"
                        onChange={value => {
                          handleUpdateControlExamLesson('showAnswer', value);
                        }}
                        className="h-10"
                        options={[
                          {
                            value: true,
                            label: 'Có',
                          },
                          {
                            value: false,
                            label: 'Không',
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>

              <div className="flex items-center gap-3 mb-5">
                <Button
                  className=""
                  icon={<PlusOutlined />}
                  onClick={() => {
                    if (!lessonEdit || !lessonEdit.exam_lesson) {
                      message.info(
                        'Vui lòng ấn cập nhật trước khi thêm câu hỏi',
                      );
                      return;
                    }
                    setActiveModal('select-question');
                  }}
                >
                  Quản lí câu hỏi
                </Button>
                {/* {!lessonEdit.exam_lesson?.exam.questionMapping.length && (
                  <Button icon={<PlusOutlined />}>Bài nộp file</Button>
                )} */}
              </div>

              <Table
                columns={columns}
                dataSource={
                  lessonEdit?.exam_lesson?.exam?.questionMapping || []
                }
                rowKey="id"
                pagination={false}
                expandable={{
                  expandedRowRender: (record: any) => {
                    if (record.questions && Array.isArray(record.questions)) {
                      return (
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
                          <Collapse
                            defaultActiveKey={['1']}
                            expandIconPosition="end"
                          >
                            {record.questions.map((item: any, idx: number) => (
                              <Collapse.Panel
                                header={
                                  <div className="flex justify-between items-center">
                                    <span>Chi tiết câu hỏi {idx + 1}</span>
                                  </div>
                                }
                                key={`question-${item.id}`}
                              >
                                <Form form={form} layout="vertical">
                                  <div key={item.id} className="mb-4">
                                    <Form.Item label={`Câu hỏi ${idx + 1}`}>
                                      <ReadOnlyCK value={item.content} />
                                    </Form.Item>
                                    <div className="list-answer ps-10">
                                      {item.multipleChoiceAnswers.map(
                                        (ans: any) => (
                                          <Form.Item key={ans.id}>
                                            <Input
                                              value={ans.content}
                                              readOnly
                                              className={`custom-input ${ans.isCorrect ? 'bg-green-100' : 'bg-red-100'}`}
                                            />
                                          </Form.Item>
                                        ),
                                      )}
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
                      );
                    }

                    return (
                      <Form form={form} layout="vertical">
                        <div key={record.id} className="mb-4">
                          <Row gutter={16}>
                            {record.imageUrl && (
                              <Col span={6}>
                                <Form.Item
                                  name="imageUrl"
                                  label="Ảnh câu hỏi:"
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
                                  label="Audio câu hỏi:"
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
                          <Form.Item label="Câu hỏi">
                            <ReadOnlyCK value={record.content} />
                          </Form.Item>
                          <div className="list-answer ps-10">
                            {renderAnswersByType(record)}
                          </div>
                          {record.type !==
                            QuestionEntity.type.CHOOSE_ANSWER_IN_BLANK &&
                            record.explain && (
                              <Form.Item label="Giải thích">
                                <ReadOnlyCK value={record.explain} />
                              </Form.Item>
                            )}
                        </div>
                      </Form>
                    );
                  },
                }}
              />
            </>
          )}
        </div>
      </>
    )
  );
};

export default TestType;
