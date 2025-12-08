import CollapseQuestionQuiz from '#/features/course-editor/components/Collapse/flashcard/CollapseQuestionQuiz';
import ModalCreateUpdateFlashcard from '#/features/course-editor/components/modal/ModalCreateUpdateFlashcard';
import ModalCreateUpdateQuestion from '#/features/course-editor/components/modal/ModalCreateUpdateQuestion';
import { Tool } from '#/shared/utils';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import {
  getAllFlashcard,
  importFlashcard,
} from '#/src/redux/thunk/flash-card.thunk';
import {
  importExcelQuestionFlashcard,
  updateQuestionQuiz,
} from '#/src/redux/thunk/question-quiz.thunk';
import {
  createQuizFlashcard,
  deleteQuizFlashcard,
  getQuizFlashcard,
  updateQuizFlashcard,
} from '#/src/redux/thunk/quiz-flash-card.thunk';
import {
  DownloadOutlined,
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Popover,
  Row,
  Switch,
  Tree,
  TreeProps,
  Upload,
} from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import ms_excel from '#/assets/images/icon_button/ms_excel.png';
import { beforeUploadExcel } from '#/shared/props/beforeUpload';
import {
  AnswerEntiti,
  FlashCardEntity,
  QuestionFlashCardEntity,
} from '#/api/requests';
import { LessonDetailEntity } from '#/api/requests/interfaces/LessonDetailEntity';
import ModalSelectQuestion from '#/features/course-editor/components/modal/ModalSelectQuestion';

interface FlashCardTypeProps {
  lesson: LessonDetailEntity;
}

const FlashCardType = ({ lesson }: FlashCardTypeProps) => {
  const [form] = Form.useForm();
  const NEW_QUIZ = 'new-quiz';
  const dispatch = useAppDispatch();
  const { lessonEdit } = useSelector((state: RootState) => state.lesson);
  const id_quiz = Form.useWatch('id_quiz', form);
  const [openModalCard, setOpenModalCard] = useState<boolean>(false);
  const [openModalQues, setOpenModalQues] = useState<boolean>(false);
  const [openModalSelect, setOpenModalSelect] = useState<boolean>(false);
  const [openFormQuiz, setOpenFormQuiz] = useState<boolean>(false);
  const [itemUpdate, setItemUpdate] = useState<FlashCardEntity | null>(null);
  const [itemUpdateQuestionQuiz, setItemUpdateQuestionQuiz] =
    useState<QuestionFlashCardEntity | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (lesson) {
      await Promise.all([
        dispatch(getQuizFlashcard(lesson.id)),
        dispatch(getAllFlashcard(lesson.id)),
      ]);
    }
  };

  useEffect(() => {
    if (lesson) {
      fetchData();
    }
  }, [lesson]);

  useEffect(() => {
    form.resetFields();
    setOpenFormQuiz(false);
    if (lessonEdit && lessonEdit.quiz) {
      form.setFieldsValue({
        id_quiz: lessonEdit.quiz.id,
        time: lessonEdit.quiz.time,
        deadline: lessonEdit.quiz.deadline || false,
        timeTest: lessonEdit.quiz.timeTest || false,
        questionPositionReversal:
          lessonEdit.quiz.questionPositionReversal || false,
        questions: lessonEdit.quiz.questions.map(
          (q: QuestionFlashCardEntity) => ({
            question: Tool.stripHtml(q.question),
            explain: q.explanation,
            answers: q.answers.map((a: AnswerEntiti) => ({
              title: a.title,
              isCorrect: a.isCorrect,
            })),
          }),
        ),
      });

      setOpenFormQuiz(true);
    }
  }, [lessonEdit, lesson]);

  const handleOpenCard = (card: FlashCardEntity) => {
    setOpenModalCard(true);
    setItemUpdate(card);
  };

  const handleOpenQuestionQuiz = (question: QuestionFlashCardEntity) => {
    setItemUpdateQuestionQuiz(question);
    setOpenModalQues(true);
  };

  const handleClickAddQuiz = () => {
    setOpenFormQuiz(true);
    form.setFieldValue('id_quiz', NEW_QUIZ);
  };

  const handleCreateQuiz = async () => {
    const values = await form.validateFields();
    const result = await dispatch(
      createQuizFlashcard({
        time: +values.time,
        questions: [],
        lessonId: lesson.id,
      }),
    );
    if (result.payload.statusCode === 201) {
      message.success('Lưu thành công, giờ bạn có thể tạo câu hỏi');
    } else {
      message.error('Đã có lỗi xảy ra, vui lòng thử lại sau');
    }
  };

  const handleUpdateQuiz = async () => {
    const values = await form.validateFields();
    const result = await dispatch(
      updateQuizFlashcard({
        id: id_quiz,
        data: {
          ...values,
          time: +values.time,
        },
      }),
    );
    if (result.payload.statusCode === 200) {
      message.success('Cập nhật thành công');
    } else {
      message.error('Cập nhật thất bại');
    }
  };

  const handleSubmitQuiz = () => {
    if (id_quiz === NEW_QUIZ) {
      handleCreateQuiz();
    } else {
      handleUpdateQuiz();
    }
  };

  const handleDeleteQuiz = () => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa bài kiểm tra?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        if (!lessonEdit || !lessonEdit.quiz) return;
        const result = await dispatch(deleteQuizFlashcard(lessonEdit.quiz.id));
        if (result.payload.statusCode === 200) {
          message.success('Xóa thành công!');
          setOpenFormQuiz(false);
        } else {
          message.error('Xoá thất bại');
        }
      },
      title: 'Xác nhận xóa',
    });
  };

  const onDrop: TreeProps['onDrop'] = async info => {
    const dragKey = info.dragNode.key as string;
    const dropKey = info.node.key as string;
    const dropPosition = info.dropPosition;
    const dropToGap = info.dropToGap;
    if (!lessonEdit || !lessonEdit.quiz) return;

    const dataCopy = [...lessonEdit.quiz.questions];
    const dragIndex = dataCopy.findIndex(node => node.id === dragKey);
    const dropIndex = dataCopy.findIndex(node => node.id === dropKey);

    if (dragIndex === -1 || dropIndex === -1) return;

    const draggedItem = dataCopy[dragIndex];
    let newPosition = draggedItem.position;

    if (dropToGap) {
      if (dropIndex === 0) {
        newPosition = dataCopy[0].position - 1;
      } else if (
        dropIndex === dataCopy.length - 1 &&
        dropPosition > dropIndex
      ) {
        newPosition = dataCopy[dataCopy.length - 1].position + 1;
      } else {
        const before = dataCopy[dropIndex];
        const after = dataCopy[dropIndex + 1];
        if (after) {
          newPosition = (before.position + after.position) / 2;
        } else {
          newPosition = before.position + 1;
        }
      }
    } else {
      newPosition = dataCopy[dropIndex].position + 0.01;
    }
    const result = await dispatch(
      updateQuestionQuiz({
        id: draggedItem.id,
        data: {
          ...draggedItem,
          position: newPosition,
        },
      }),
    );
    if (result.payload.statusCode !== 200) {
      message.error('Lỗi, vui lòng thao tác chậm lại');
    }
  };

  const handleDownloadSampleExcel = () => {
    const data = [
      {
        STT: '1',
        'Mặt trước': 'sensei',
        'Mặt sau': 'Thầy cô giáo',
        'Cách đọc': 'sensei',
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Flashcard mẫu');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    });

    saveAs(blob, 'mau_tu_vung.xlsx');
  };

  const handleDownloadSampleQuestionExcel = () => {
    const data = [
      {
        STT: 1,
        Question:
          '私はグエン・タイ・デュイです。郵政通信技術大学の学生です 私は',
        'Answer 1': 'こんにちは',
        'Is Correct 1': true,
        'Answer 2': 'こんにちは',
        'Is Correct 2': false,
        'Answer 3': 'こんにちは',
        'Is Correct 3': false,
        'Answer 4': 'こんにちは',
        'Is Correct 4': false,
        Explanation:
          '私はグエン・タイ・デュイです。郵政通信技術大学の学生です 私は',
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);

    worksheet['!cols'] = [
      { wch: 5 },
      { wch: 50 },
      { wch: 20 },
      { wch: 12 },
      { wch: 20 },
      { wch: 12 },
      { wch: 20 },
      { wch: 12 },
      { wch: 20 },
      { wch: 12 },
      { wch: 50 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Flashcard Câu hỏi mẫu');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    });

    saveAs(blob, 'mau_cau_hoi.xlsx');
  };

  return (
    <>
      <ModalSelectQuestion
        open={openModalSelect}
        onClose={() => {
          setOpenModalSelect(false);
        }}
        type="flashcard"
      />
      <ModalCreateUpdateQuestion
        open={openModalQues}
        onClose={() => {
          setOpenModalQues(false);
          setItemUpdateQuestionQuiz(null);
        }}
        questionGroup={null}
        typeLesson="flashcard"
        itemUpdate={itemUpdateQuestionQuiz}
        quizId={lessonEdit && lessonEdit.quiz ? lessonEdit.quiz.id : ''}
      />
      <ModalCreateUpdateFlashcard
        open={openModalCard}
        lessonId={lesson.id}
        itemUpdate={itemUpdate}
        onClose={() => {
          setOpenModalCard(false);
          setItemUpdate(null);
        }}
      />
      {lessonEdit && (
        <div className="flash-card-content">
          <p className="p-title">Danh sách card</p>
          <div className="list-card">
            {lessonEdit.flashcard &&
              lessonEdit.flashcard.map((card: FlashCardEntity) => (
                <div
                  key={card.id}
                  className="card-item"
                  onClick={() => handleOpenCard(card)}
                >
                  <div className="front">{card.front}</div>
                  <div className="back">{card.back}</div>
                </div>
              ))}
          </div>
          <Button
            className="btn-add-new-card"
            onClick={() => {
              setItemUpdate(null);
              setOpenModalCard(true);
            }}
          >
            <PlusOutlined /> Thêm card mới
          </Button>
          <Popover
            title="Menu"
            trigger="click"
            placement="bottomRight"
            content={
              <div className="flex flex-col items-start gap-2">
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  className="w-full"
                  onClick={handleDownloadSampleExcel}
                >
                  Tải file mẫu
                </Button>
                <Upload
                  showUploadList={false}
                  beforeUpload={beforeUploadExcel}
                  customRequest={async ({ file }) => {
                    if (!file) return;
                    setLoading(true);
                    const result = await dispatch(
                      importFlashcard({
                        id: lessonEdit.id,
                        data: file as File,
                      }),
                    );
                    if (result.payload.response.data.statusCode === 400) {
                      message.warning({
                        content: result.payload.response.data.messageCode,
                        duration: 7,
                      });
                    }
                    setLoading(false);
                  }}
                  className="w-full"
                >
                  <Button
                    icon={loading ? <LoadingOutlined /> : <UploadOutlined />}
                    className="w-full"
                  >
                    Import danh sách
                  </Button>
                </Upload>
              </div>
            }
          >
            <Button
              icon={<img src={ms_excel} alt="icon-excel" />}
              className="ms-2"
            >
              Import excel
            </Button>
          </Popover>
          <br />
          {!openFormQuiz && (
            <Button onClick={handleClickAddQuiz}>
              <PlusOutlined /> Tạo bài kiểm tra
            </Button>
          )}
          {openFormQuiz && (
            <>
              <Form
                form={form}
                layout="vertical"
                validateTrigger={['onBlur', 'onSubmit']}
              >
                <div className="title-form-quiz">
                  <p className="p-title">Kiểm tra</p>
                  <div className="list-btn-title-form-quiz">
                    {id_quiz !== NEW_QUIZ && (
                      <Button onClick={handleDeleteQuiz} danger>
                        Xoá bài kiểm tra
                      </Button>
                    )}
                    <Button type="primary" onClick={handleSubmitQuiz}>
                      Lưu cập nhật
                    </Button>
                  </div>
                </div>
                <Form.Item name="id_quiz" hidden>
                  <Input />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      validateTrigger={['onBlur', 'onChange']}
                      name="time"
                      label="Thời gian làm bài (phút):"
                      style={{
                        width: '100%',
                      }}
                      rules={[
                        { required: true, message: 'Không được để trống' },
                      ]}
                    >
                      <Input
                        className="custom-input"
                        placeholder="Thời gian làm bài"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}></Col>
                </Row>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => {
                      if (id_quiz === NEW_QUIZ) {
                        message.info(
                          'Vui lòng ấn lưu cập nhật trước khi tạo câu hỏi',
                        );
                        return;
                      }
                      setOpenModalQues(true);
                    }}
                    icon={<PlusOutlined />}
                  >
                    Thêm câu hỏi
                  </Button>

                  <Popover
                    title="Menu"
                    trigger="click"
                    placement="bottomRight"
                    content={
                      <div className="flex flex-col items-stretch gap-2">
                        <Button
                          type="primary"
                          icon={<DownloadOutlined />}
                          className="w-full"
                          onClick={handleDownloadSampleQuestionExcel}
                        >
                          Tải file mẫu
                        </Button>
                        <Upload
                          beforeUpload={file => {
                            if (id_quiz === NEW_QUIZ) {
                              message.info(
                                'Vui lòng ấn lưu cập nhật trước khi tạo câu hỏi',
                              );
                              return Upload.LIST_IGNORE;
                            }
                            return beforeUploadExcel(file);
                          }}
                          showUploadList={false}
                          customRequest={async ({ file, onError }) => {
                            if (!file) return;
                            try {
                              await dispatch(
                                importExcelQuestionFlashcard({
                                  id: id_quiz,
                                  data: file as File,
                                }),
                              );
                            } catch (error) {
                              message.error('Tải lên thất bại');
                            } finally {
                            }
                          }}
                          className="w-full"
                        >
                          <Button icon={<UploadOutlined />} className="w-full">
                            Import danh sách
                          </Button>
                        </Upload>
                      </div>
                    }
                  >
                    <Button icon={<img src={ms_excel} alt="icon-excel" />}>
                      Import excel
                    </Button>
                  </Popover>
                </div>
                <Tree
                  blockNode
                  className="tree-question-group"
                  draggable
                  onDrop={onDrop}
                  treeData={
                    lessonEdit.quiz &&
                    lessonEdit.quiz.questions.map(
                      (item: QuestionFlashCardEntity, index: number) => ({
                        key: item.id,
                        title: (
                          <CollapseQuestionQuiz
                            form={form}
                            item={item}
                            index={index}
                            handleOpenQuestionQuiz={handleOpenQuestionQuiz}
                          />
                        ),
                      }),
                    )
                  }
                />

                <div className="toggle">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        hidden
                        validateTrigger={['onBlur', 'onChange']}
                        name="timeTest"
                        valuePropName="checked"
                        label="Áp dụng thời gian kiểm tra"
                        style={{ width: '100%', marginBottom: '10px' }}
                      >
                        <Switch />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        validateTrigger={['onBlur', 'onChange']}
                        name="deadline"
                        hidden
                        valuePropName="checked"
                        label="deadline"
                        style={{ width: '100%', marginBottom: '10px' }}
                      >
                        <Switch />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item
                    validateTrigger={['onBlur', 'onChange']}
                    name="questionPositionReversal"
                    valuePropName="checked"
                    label="Tự động đảo câu"
                    hidden
                    style={{ width: '100%', marginBottom: '10px' }}
                  >
                    <Switch />
                  </Form.Item>
                </div>
              </Form>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default FlashCardType;
