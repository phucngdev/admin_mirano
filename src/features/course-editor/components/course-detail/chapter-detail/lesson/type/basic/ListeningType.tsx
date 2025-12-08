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
} from 'antd';
import { TypeModal } from '../../LessonDetail';
import { DeleteTwoTone, ImportOutlined, PlusOutlined } from '@ant-design/icons';
import { Tool } from '#/shared/utils';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ModalSelectQuestion from '#/features/course-editor/components/modal/ModalSelectQuestion';
import Loading from '#/shared/components/loading/Loading';
import { LessonDetailEntity } from '#/api/requests/interfaces/LessonDetailEntity';
import {
  createAndAddExamLesson,
  getExamLesson,
  updateControlExamLesson,
} from '#/src/redux/thunk/exam-lesson.thunk';
import { updateExam } from '#/src/redux/thunk/exam.thunk';
import ModalSelectExam from '#/features/course-editor/components/modal/ModalSelectExam';
import { deleteExamLessonService } from '#/api/services/examLessonService';
import { deleteQuestionGroupReferenceService } from '#/api/services/questionGroupReference';
import ReadOnlyCK from '#/shared/components/ckeditor/ReadOnlyCK';

interface ListeningTypeProps {
  form: FormInstance;
  setActiveModal: (key: TypeModal) => void;
  lesson: LessonDetailEntity;
  activeModal: TypeModal;
  handleClose: (
    key: 'question_listening' | 'select-question' | 'group_question',
  ) => void;
}

const ListeningType = ({
  setActiveModal,
  lesson,
  form,
  activeModal,
  handleClose,
}: ListeningTypeProps) => {
  const dispatch = useAppDispatch();
  const [formExam] = Form.useForm();
  const { lessonEdit } = useSelector((state: RootState) => state.lesson);

  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openModalExam, setOpenModalExam] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (!lessonEdit) return;
      await dispatch(getExamLesson(lesson.id));
    } catch (error) {
      message.error('Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lessonEdit) {
      fetchData();
    }
  }, [lesson]);

  useEffect(() => {
    if (lessonEdit) {
      form.setFieldValue('videoUrlLesson', lesson.videoUrl || '');
      if (lessonEdit.exam_lesson && lessonEdit.exam_lesson.exam) {
        formExam.setFieldsValue({
          name: lessonEdit.exam_lesson.exam.name,
          randomAnswer: lessonEdit.exam_lesson.randomAnswer,
          showSolution: lessonEdit.exam_lesson.showSolution,
          randomQuestion: lessonEdit.exam_lesson.randomQuestion,
        });
        setOpenForm(true);
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
        const result = await deleteQuestionGroupReferenceService(
          lessonEdit.exam_lesson.exam.id,
          id,
        );
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
    key: 'randomAnswer' | 'showSolution' | 'randomQuestion',
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
      title: 'Nội dung nhóm câu hỏi',
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

  if (loading) return <Loading />;

  return (
    <>
      <ModalSelectQuestion
        open={activeModal === 'select-question'}
        type="nopractice"
        onClose={() => {
          handleClose('select-question');
          fetchData();
        }}
      />
      <ModalSelectExam
        open={openModalExam}
        onClose={() => {
          setOpenModalExam(false);
          fetchData();
        }}
      />
      <div className="list-listening-content">
        <Form.Item
          validateTrigger={['onBlur', 'onChange']}
          name="videoUrlLesson"
          label="Video url:"
          style={{
            width: '100%',
          }}
          rules={[{ required: true, message: 'Vui lòng nhập url video' }]}
        >
          <Input className="custom-input" allowClear placeholder="Video url" />
        </Form.Item>
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
                    rules={[{ required: true, message: 'Không được để trống' }]}
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
                    rules={[{ required: true, message: 'Không được để trống' }]}
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
                    rules={[{ required: true, message: 'Không được để trống' }]}
                  >
                    <Select
                      placeholder="Trộn câu hỏi"
                      onChange={value => {
                        handleUpdateControlExamLesson('randomQuestion', value);
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
                    label="Hiện đáp án & giải thích:"
                    style={{
                      width: '100%',
                    }}
                    rules={[{ required: true, message: 'Không được để trống' }]}
                  >
                    <Select
                      placeholder="Trộn đáp án"
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
            </Form>

            <Button
              className="mb-5"
              icon={<PlusOutlined />}
              onClick={() => {
                if (!lessonEdit || !lessonEdit.exam_lesson) {
                  message.info('Vui lòng ấn cập nhật trước khi thêm câu hỏi');
                  return;
                }
                setActiveModal('select-question');
              }}
            >
              Quản lí câu hỏi
            </Button>

            <Table
              columns={columns}
              dataSource={lessonEdit?.exam_lesson?.exam?.questionMapping || []}
              rowKey="id"
              pagination={false}
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
                                {item.multipleChoiceAnswers.map((ans: any) => (
                                  <Form.Item key={ans.id}>
                                    <Input
                                      value={ans.content}
                                      readOnly
                                      className={`custom-input ${ans.isCorrect ? 'bg-green-100' : 'bg-red-100'}`}
                                    />
                                  </Form.Item>
                                ))}
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
          </>
        )}
      </div>
    </>
  );
};

export default ListeningType;
