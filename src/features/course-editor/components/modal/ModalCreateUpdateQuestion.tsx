import BaseCKEditor from '#/shared/components/ckeditor/BaseCKEditor';
import { useAppDispatch } from '#/src/redux/store/store';
import {
  createQuestionQuiz,
  deleteQuestionQuiz,
  updateQuestionQuiz,
} from '#/src/redux/thunk/question-quiz.thunk';
import {
  createQuestion,
  createQuestionToGroup,
  updateQuestion,
} from '#/src/redux/thunk/question.thunk';
import {
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Popconfirm } from 'antd';
import { useEffect } from 'react';
import { updateQuestionGroup } from '#/src/redux/thunk/question-group.thunk';
import {
  QuestionEntity,
  QuestionFlashCardEntity,
  QuestionGroupEntity,
} from '#/api/requests';

interface ModalCreateProps {
  open: boolean;
  onClose: () => void;
  typeLesson: 'listening' | 'reading' | 'pratices' | 'flashcard';
  itemUpdate?: QuestionEntity | QuestionFlashCardEntity | null;
  questionGroup?: QuestionGroupEntity | null;
  isToGroup?: boolean;
  quizId?: string;
}

const ModalCreateUpdateQuestion = ({
  open,
  onClose,
  itemUpdate,
  typeLesson,
  questionGroup,
  quizId,
  isToGroup,
}: ModalCreateProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (open) {
      if (itemUpdate) {
        const initialValues: any = {};

        if (
          'type' in itemUpdate &&
          itemUpdate.type === QuestionEntity.type.MULTIPLE_CHOICE
        ) {
          form.setFieldValue('answers', itemUpdate.multipleChoiceAnswers);
        }
        // trắc ng của bình
        if ('content' in itemUpdate) {
          initialValues.content = itemUpdate.content;
          initialValues.explain = itemUpdate.explain;
        }
        // trắc ng của a khoa
        if ('question' in itemUpdate) {
          initialValues.content = itemUpdate.question;
          initialValues.explain = itemUpdate.explanation;
          initialValues.answers = itemUpdate.answers.map(a => {
            return {
              content: a.title,
              isCorrect: a.isCorrect,
            };
          });
        }

        form.setFieldsValue(initialValues);
      } else {
        form.setFieldsValue({ answers: [] });
        form.resetFields();
      }
    }
  }, [itemUpdate, open]);

  // theo dõi err của đáp án để ẩn đi
  useEffect(() => {
    form.validateFields(['answers']).catch(() => {});
  }, [form.getFieldValue('answers')]);

  const handleCreate = async () => {
    const values = await form.validateFields();
    const data = {
      content: values.content,
      explain: values.explain, // bình
      explanation: values.explain, // a khoa
      type: QuestionEntity.type.MULTIPLE_CHOICE,
      multipleChoiceAnswers: values.answers,
      answers: [],
      question: values.content,
    };
    let result;
    if (typeLesson === 'flashcard' && quizId) {
      data.answers = values.answers.map((a: any) => {
        return {
          ...a,
          title: a.content,
        };
      });
      result = await dispatch(
        createQuestionQuiz({
          id: quizId,
          data: data,
        }),
      );
    }
    if (result?.payload.statusCode === 201) {
      message.success('Thêm thành công');
      onClose();
    } else {
      message.error('Thêm thất bại');
    }
  };

  const handleUpdate = async () => {
    if (!itemUpdate) return;
    const values = await form.validateFields();
    const data = {
      content: values.content,
      explain: values.explain,
      explanation: values.explain,
      type: QuestionEntity.type.MULTIPLE_CHOICE,
      multipleChoiceAnswers: values.answers,
      answers: [],
      answer: [],
      question: values.content,
      position: 0,
    };
    let result;
    if (typeLesson === 'flashcard' && 'position' in itemUpdate) {
      data.position = itemUpdate.position;
      data.answers = values.answers.map((a: any) => {
        return {
          ...a,
          title: a.content,
        };
      });
      result = await dispatch(
        updateQuestionQuiz({
          id: itemUpdate.id,
          data: data,
        }),
      );
    } else {
      // result = await dispatch(
      //   updateQuestion({
      //     id: itemUpdate.id,
      //     data: { ...data },
      //   }),
      // );
    }
    if (result && result.payload.statusCode === 200) {
      message.success('Cập nhật thành công');
      onClose();
    } else {
      message.error('Cập nhật thất bại');
    }
  };

  const handleSubmit = async () => {
    if (itemUpdate) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  const handleDelete = async () => {
    if (!itemUpdate) return;
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa câu hỏi khỏi nhóm này?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        let result;
        if (questionGroup && isToGroup) {
          // const list_id = questionGroup.questions
          //   .filter(q => q.id !== itemUpdate.id)
          //   .map(q => q.id);
          // result = await dispatch(
          //   updateQuestionGroup({
          //     id: questionGroup.id,
          //     data: {
          //       ...questionGroup,
          //       questions: [...list_id],
          //     },
          //   }),
          // );
        } else if (typeLesson === 'flashcard') {
          result = await dispatch(deleteQuestionQuiz(itemUpdate.id));
        }

        if (result && result.payload.statusCode === 200) {
          message.success('Xoá thành công');
          onClose();
        } else {
          message.error('Xoá thất bại');
        }
      },
      title: 'Xác nhận xóa',
    });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      closeIcon={<CloseOutlined />}
      className="modal-create-update-vocabulary"
      footer={[
        itemUpdate && (
          <Button key="delete" danger onClick={handleDelete}>
            Xoá
          </Button>
        ),
        <Button key="cancel" onClick={handleClose}>
          Hủy
        </Button>,
        <Button key="submit" onClick={handleSubmit} type="primary">
          {itemUpdate ? 'Lưu cập nhật' : 'Lưu câu hỏi'}
        </Button>,
      ]}
      onCancel={handleClose}
      open={open}
      style={{ top: 20 }}
      title={
        <span
          style={{
            color: 'rgba(16, 24, 40, 1)',
            fontSize: '30px',
            fontWeight: '500',
          }}
        >
          {itemUpdate ? 'Chỉnh sửa câu hỏi' : 'Thêm câu hỏi'}
        </span>
      }
      width={1000}
    >
      <Form
        form={form}
        layout="vertical"
        validateTrigger={['onBlur', 'onSubmit']}
      >
        <Form.Item
          name="content"
          label="Nội dung câu hỏi:"
          style={{ width: '100%' }}
          rules={[{ required: true, message: 'Vui lòng nhập câu hỏi' }]}
        >
          <BaseCKEditor
            changeData={(value: string) => {
              form.setFieldsValue({ content: value });
            }}
            value={form.getFieldValue('content')}
          />
        </Form.Item>

        <Form.Item
          label="Đáp án:"
          name="answers"
          // rules={[{ required: true, message: 'Phải có ít nhất một đáp án' }]}
        >
          <Form.List
            name="answers"
            rules={[
              {
                validator: async (_, answers) => {
                  if (!answers || answers.length === 0) {
                    return Promise.reject(
                      new Error('Phải có ít nhất một đáp án.'),
                    );
                  }
                  for (const answer of answers) {
                    if (!answer?.content) {
                      return Promise.reject(
                        new Error('Tất cả các đáp án phải có nội dung.'),
                      );
                    }
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => {
              return (
                <>
                  {fields.map(({ key, name, ...restField }) => {
                    const answers = form.getFieldValue('answers') || [];
                    const isCorrect = answers[name]?.isCorrect;

                    return (
                      <div
                        key={key}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: 8,
                        }}
                      >
                        <Form.Item
                          {...restField}
                          name={[name, 'content']}
                          rules={[{ required: true, message: 'Nhập đáp án' }]}
                          style={{
                            flex: 1,
                            marginRight: 8,
                            marginBottom: '5px',
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <Input
                              className={`custom-input ${
                                isCorrect ? 'bg-green-100' : 'bg-red-100'
                              }`}
                              placeholder="Đáp án"
                              value={answers[name].content}
                              onChange={e => {
                                const newAnswers = [...answers];
                                newAnswers[name] = {
                                  ...newAnswers[name],
                                  content: e.target.value,
                                };
                                form.setFieldsValue({ answers: newAnswers });
                              }}
                            />
                            <Popconfirm
                              title="Xoá câu trả lời"
                              icon={
                                <QuestionCircleOutlined
                                  style={{ color: 'red' }}
                                />
                              }
                              onConfirm={() => remove(name)}
                            >
                              <DeleteOutlined
                                style={{ color: 'red', cursor: 'pointer' }}
                              />
                            </Popconfirm>
                          </div>
                        </Form.Item>
                        <Form.Item name={[name, 'isCorrect']} hidden>
                          <Input />
                        </Form.Item>
                      </div>
                    );
                  })}

                  {errors.length > 0 && fields.length === 0 && (
                    <div className="ant-form-item-explain-error">
                      {errors.join(', ')}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      className="w-auto border-green-600 text-green-600"
                      onClick={() => {
                        const answers = form.getFieldValue('answers') || [];
                        const hasCorrect = answers.some(
                          (a: any) => a?.isCorrect === true,
                        );

                        if (hasCorrect) {
                          message.warning('Chỉ được phép có một đáp án đúng.');
                        } else {
                          add({ isCorrect: true, content: '' });
                        }
                      }}
                    >
                      Thêm đáp án đúng
                    </Button>
                    <Button
                      className="w-auto"
                      danger
                      onClick={() => add({ isCorrect: false, content: '' })}
                    >
                      Thêm đáp án sai
                    </Button>
                  </div>
                </>
              );
            }}
          </Form.List>
        </Form.Item>
        {(typeLesson === 'listening' ||
          typeLesson === 'reading' ||
          typeLesson === 'flashcard') && (
          <Form.Item
            validateTrigger={['onBlur', 'onChange']}
            name="explain"
            label="Giải thích:"
            rules={[{ required: true, message: 'Vui lòng nhập giải thích' }]}
            style={{
              width: '100%',
            }}
          >
            <BaseCKEditor
              changeData={(value: string) => {
                form.setFieldsValue({ explain: value });
              }}
              value={form.getFieldValue('explain')}
            />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default ModalCreateUpdateQuestion;
