import { practiceTypeLabelMap } from '#/api/requests/interfaces/LabelMap';
import BaseCKEditor from '#/shared/components/ckeditor/BaseCKEditor';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import {
  createQuestionGroup,
  updateQuestionGroup,
} from '#/src/redux/thunk/question-group.thunk';
import {
  createQuestion,
  createQuestionToGroup,
  updateQuestion,
} from '#/src/redux/thunk/question.thunk';
import {
  CloseOutlined,
  DeleteOutlined,
  LoadingOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Upload,
  UploadFile,
} from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { uploadFileToS3 } from '#/api/services/uploadS3';
import { useSelector } from 'react-redux';
import {
  beforeUploadAudio,
  beforeUploadImage,
} from '#/shared/props/beforeUpload';
import { QuestionEntity, QuestionGroupEntity } from '#/api/requests';

type MappedQuestionType =
  | QuestionEntity.type.MULTIPLE_CHOICE
  | QuestionEntity.type.MATCHING
  | QuestionEntity.type.SORTING
  | QuestionEntity.type.MULTIPLE_CHOICE_HORIZONTAL
  | QuestionEntity.type.FILL_IN_BLANK;

interface ModalCreateProps {
  open: boolean;
  onClose: () => void;
  itemUpdate?: QuestionEntity | null;
  questionGroup: QuestionGroupEntity | null;
  isHaveAudioAndImage?: boolean;
  typeLesson?: 'practice' | 'test';
  singleQues?: boolean;
}

const ModalCreateUpdatePratice = ({
  open,
  onClose,
  itemUpdate,
  questionGroup,
  isHaveAudioAndImage,
  typeLesson,
  singleQues,
}: ModalCreateProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { lessonEdit } = useSelector((state: RootState) => state.lesson);

  const typeQuestion = Form.useWatch('type_question', form);
  const [audioFileList, setAudioFileList] = useState<UploadFile[]>([]);
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);

  const options = useMemo(() => {
    let selectedQuestionTypes = [QuestionEntity.type.MULTIPLE_CHOICE];
    if (typeLesson === 'practice') {
      selectedQuestionTypes = [
        QuestionEntity.type.SORTING,
        QuestionEntity.type.MULTIPLE_CHOICE,
      ];
    } else if (typeLesson === 'test') {
      selectedQuestionTypes = [
        QuestionEntity.type.FILL_IN_BLANK,
        QuestionEntity.type.MATCHING,
        QuestionEntity.type.MULTIPLE_CHOICE_HORIZONTAL,
      ];
      if (!singleQues)
        selectedQuestionTypes.push(QuestionEntity.type.MULTIPLE_CHOICE);
    } else {
      selectedQuestionTypes = [
        QuestionEntity.type.SORTING,
        QuestionEntity.type.MULTIPLE_CHOICE,
        // QuestionEntity.type.,
        QuestionEntity.type.FILL_IN_BLANK,
        QuestionEntity.type.MATCHING,
        QuestionEntity.type.MULTIPLE_CHOICE_HORIZONTAL,
      ];
    }
    return Object.values(QuestionEntity.type)
      .filter(value => selectedQuestionTypes.includes(value)) // Chỉ chọn các loại cần hiển thị
      .map(value => ({
        value,
        label: practiceTypeLabelMap[value],
      }));
  }, [itemUpdate, open]);

  useEffect(() => {
    if (open) {
      if (itemUpdate && itemUpdate.type) {
        form.setFieldsValue({
          type_question: itemUpdate.type,
          content: itemUpdate.content,
          explain: itemUpdate.explain,
        });
        if (itemUpdate.audioUrl) {
          setAudioFileList([
            {
              uid: '-2',
              name: 'audio.mp3',
              status: 'done',
              url: itemUpdate.audioUrl,
            },
          ]);
        }
        if (itemUpdate.imageUrl) {
          setImageFileList([
            {
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: itemUpdate.imageUrl,
            },
          ]);
        }
        if (itemUpdate.type === QuestionEntity.type.MULTIPLE_CHOICE) {
          form.setFieldValue('answers', itemUpdate.multipleChoiceAnswers);
        } else if (itemUpdate.type === QuestionEntity.type.MATCHING) {
          form.setFieldValue('answers', itemUpdate.matchingAnswers);
        } else if (
          itemUpdate.type === QuestionEntity.type.MULTIPLE_CHOICE_HORIZONTAL
        ) {
          form.setFieldValue('answers', itemUpdate.multipleChoiceHorizontal);
        } else if (itemUpdate.type === QuestionEntity.type.SORTING) {
          form.setFieldValue('answers', itemUpdate.sortingAnswers);
        } else if (itemUpdate.type === QuestionEntity.type.FILL_IN_BLANK) {
          form.setFieldValue('answers', itemUpdate.fillInBlank);
          // Lấy danh sách đáp án đúng
          const correctAnswers = itemUpdate.fillInBlank?.map(
            item => item.correctAnswer,
          );
          // Lọc ra các options không nằm trong correctAnswers
          const filtered = itemUpdate.options
            ?.filter(option => !correctAnswers?.includes(option))
            .map(text => ({ text }));
          form.setFieldValue('options', filtered);
        }
      } else {
        form.resetFields();
        form.setFieldsValue({ answers: [] });
        // form.setFieldValue(
        //   'type_question',
        //   QuestionEntity.QuestionType.MultipleChoice,
        // );
      }
    }
  }, [itemUpdate, open]);

  const handleCreate = async () => {
    const values = await form.validateFields();
    let data: any = {
      content: values.content,
      type: values.type_question,
      explain: values.explain,
      multipleChoiceAnswers: [],
      matchingAnswers: [],
      sortingAnswers: [],
      multipleChoiceHorizontal: [],
      options: values.options,
      fillInBlank: [],
      essayTest: [],
    };
    if (values.imageUrl) {
      data.imageUrl = values.imageUrl;
      data.audioUrl = values.audioUrl;
    }
    const answerTypeMap: Record<MappedQuestionType, keyof typeof data> = {
      [QuestionEntity.type.MULTIPLE_CHOICE]: 'multipleChoiceAnswers',
      [QuestionEntity.type.MATCHING]: 'matchingAnswers',
      [QuestionEntity.type.SORTING]: 'sortingAnswers',
      [QuestionEntity.type.MULTIPLE_CHOICE_HORIZONTAL]:
        'multipleChoiceHorizontal',
      [QuestionEntity.type.FILL_IN_BLANK]: 'fillInBlank',
    };

    const typeQuestion = values.type_question as MappedQuestionType;
    const targetKey = answerTypeMap[typeQuestion];

    if (typeQuestion === QuestionEntity.type.FILL_IN_BLANK) {
      data.options = [
        ...values.options.map((o: any) => o.text),
        ...values.answers.map((a: any) => a.correctAnswer),
      ];
    }

    if (targetKey) {
      data[targetKey] = values.answers;
    }
    let result;
    if (!questionGroup) {
      result = await dispatch(createQuestion(data));
    } else {
      result = await dispatch(
        createQuestionToGroup({
          id: questionGroup.id,
          data: data,
        }),
      );
    }
    if (result.payload.statusCode === 201) {
      message.success('Thêm thành công');
      onClose();
      form.resetFields();
    } else {
      message.error('Thêm thất bại');
    }
  };

  const handleUpdate = async () => {
    if (!itemUpdate) return;
    const values = await form.validateFields();
    const data = {
      ...values,
      type: values.type_question,
      sortingAnswers: [],
      multipleChoiceAnswers: [],
      matchingAnswers: [],
      multipleChoiceHorizontal: [],
      options: [],
      fillInBlank: [],
      essayTest: [],
    };

    const answerTypeMap: Record<MappedQuestionType, keyof typeof data> = {
      [QuestionEntity.type.MULTIPLE_CHOICE]: 'multipleChoiceAnswers',
      [QuestionEntity.type.MATCHING]: 'matchingAnswers',
      [QuestionEntity.type.SORTING]: 'sortingAnswers',
      [QuestionEntity.type.MULTIPLE_CHOICE_HORIZONTAL]:
        'multipleChoiceHorizontal',
      [QuestionEntity.type.FILL_IN_BLANK]: 'fillInBlank',
    };

    const typeQuestion = values.type_question as MappedQuestionType;
    const targetKey = answerTypeMap[typeQuestion];

    if (typeQuestion === QuestionEntity.type.FILL_IN_BLANK) {
      data.options = [
        ...values.options.map((o: any) => o.text),
        ...values.answers.map((a: any) => a.correctAnswer),
      ];
    }

    if (targetKey) {
      data[targetKey] = values.answers;
    }

    const result = await dispatch(
      updateQuestion({
        id: itemUpdate.id,
        data: data,
      }),
    );

    if (result && result.payload.statusCode === 200) {
      message.success('Cập nhật thành công');
      onClose();
    } else {
      message.error('Cập nhật thất bại');
    }
  };

  const handleCreateSingle = async () => {
    if (!lessonEdit || !lessonEdit.exams) return;
    const result = await dispatch(
      createQuestionGroup({
        // examId: lessonEdit.exams.id,
        // type: QuestionGroupEntity.QuestionGroupType.EXAM,
      }),
    );
    const values = await form.validateFields();
    const data = {
      content: values.content,
      type: values.type_question,
      explain: values.explain,
      multipleChoiceAnswers: [],
      matchingAnswers: [],
      sortingAnswers: [],
      multipleChoiceHorizontal: [],
      options: values.options,
      fillInBlank: [],
      essayTest: [],
    };
    const answerTypeMap: Record<MappedQuestionType, keyof typeof data> = {
      [QuestionEntity.type.MULTIPLE_CHOICE]: 'multipleChoiceAnswers',
      [QuestionEntity.type.MATCHING]: 'matchingAnswers',
      [QuestionEntity.type.SORTING]: 'sortingAnswers',
      [QuestionEntity.type.MULTIPLE_CHOICE_HORIZONTAL]:
        'multipleChoiceHorizontal',
      [QuestionEntity.type.FILL_IN_BLANK]: 'fillInBlank',
    };

    const typeQuestion = values.type_question as MappedQuestionType;
    const targetKey = answerTypeMap[typeQuestion];

    if (typeQuestion === QuestionEntity.type.FILL_IN_BLANK) {
      data.options = [
        ...values.options.map((o: any) => o.text),
        ...values.answers.map((a: any) => a.correctAnswer),
      ];
    }

    if (targetKey) {
      data[targetKey] = values.answers;
    }
    // const result2 = await dispatch(
    //   createQuestionToGroup({
    //     id: result.payload.data.id,
    //     data: data,
    //   }),
    // );

    // if (result2.payload.statusCode === 201) {
    //   message.success('Thêm thành công');
    //   onClose();
    //   form.resetFields();
    // } else {
    //   message.error('Thêm thất bại');
    // }
  };

  const handleSubmit = async () => {
    if (singleQues) {
      handleCreateSingle();
    } else if (itemUpdate) {
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
        // if (questionGroup) {
        //   const list_id = questionGroup.questions
        //     .filter(q => q.id !== itemUpdate.id)
        //     .map(q => q.id);
        //   result = await dispatch(
        //     updateQuestionGroup({
        //       id: questionGroup.id,
        //       data: {
        //         ...questionGroup,
        //         questions: [...list_id],
        //       },
        //     }),
        //   );
        // }

        // if (result && result.payload.statusCode === 200) {
        //   message.success('Xoá thành công');
        //   onClose();
        // } else {
        //   message.error('Xoá thất bại');
        // }
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
          Lưu câu hỏi
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
        {isHaveAudioAndImage ||
          (typeQuestion === QuestionEntity.type.MULTIPLE_CHOICE_HORIZONTAL && (
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  name="imageUrl"
                  label="Ảnh câu hỏi:"
                  style={{ width: '100%' }}
                >
                  <Upload
                    listType="picture-card"
                    beforeUpload={beforeUploadImage}
                    fileList={imageFileList}
                    customRequest={async ({ file, onSuccess, onError }) => {
                      if (!file) return;
                      setLoading(true);
                      try {
                        const { publicUrl } = await uploadFileToS3(
                          file as File,
                        );
                        setImageFileList([
                          {
                            uid: Date.now().toString(),
                            name: (file as File).name,
                            status: 'done',
                            url: publicUrl,
                          },
                        ]);
                        form.setFieldValue('imageUrl', publicUrl);
                        onSuccess?.({}, new XMLHttpRequest());
                      } catch (error) {
                        onError?.(error as Error);
                        message.error('Tải ảnh lên thất bại');
                      } finally {
                        setLoading(false);
                      }
                    }}
                    onRemove={() => {
                      setImageFileList([]);
                    }}
                  >
                    {imageFileList.length < 1 && (
                      <button
                        style={{ border: 0, background: 'none' }}
                        type="button"
                      >
                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </button>
                    )}
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="audioUrl"
                  label="Audio câu hỏi:"
                  style={{ width: '100%' }}
                >
                  <Upload
                    fileList={audioFileList}
                    beforeUpload={beforeUploadAudio}
                    customRequest={async ({ file, onSuccess, onError }) => {
                      if (!file) return;
                      setLoading(true);
                      try {
                        const { publicUrl } = await uploadFileToS3(
                          file as File,
                        );
                        setAudioFileList([
                          {
                            uid: Date.now().toString(),
                            name: (file as File).name,
                            status: 'done',
                            url: publicUrl,
                          },
                        ]);
                        form.setFieldValue('audioUrl', publicUrl);
                        onSuccess?.({}, new XMLHttpRequest());
                      } catch (error) {
                        onError?.(error as Error);
                        message.error('Tải ảnh lên thất bại');
                      } finally {
                        setLoading(false);
                      }
                    }}
                    onRemove={() => {
                      setAudioFileList([]);
                    }}
                    showUploadList={{
                      showPreviewIcon: false,
                      showRemoveIcon: true,
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Tải audio lên</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          ))}
        <Form.Item
          name="type_question"
          label="Loại câu hỏi:"
          style={{ width: '100%' }}
        >
          <Select
            style={{ width: '50%' }}
            value={typeQuestion}
            onChange={value => {
              if (itemUpdate) {
                message.info('Không được đổi loại câu hỏi');
                form.setFieldValue('type_question', typeQuestion);
                return;
              }
              form.setFieldValue('type_question', value);
            }}
            placeholder="Loại câu hỏi"
            options={options}
          />
        </Form.Item>
        <Form.Item
          name="content"
          label="Nội dung câu hỏi:"
          style={{ width: '100%' }}
          rules={[
            {
              required: isHaveAudioAndImage ? false : true,
              message: 'Vui lòng nhập câu hỏi',
            },
          ]}
        >
          <BaseCKEditor
            changeData={(value: string) => {
              form.setFieldsValue({ content: value });
            }}
            value={form.getFieldValue('content')}
          />
        </Form.Item>
        {(typeQuestion === QuestionEntity.type.MULTIPLE_CHOICE ||
          typeQuestion === QuestionEntity.type.MULTIPLE_CHOICE_HORIZONTAL) && (
          <>
            <Form.Item label="Đáp án:">
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
                              rules={[
                                { required: true, message: 'Nhập đáp án' },
                              ]}
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
                                    form.setFieldsValue({
                                      answers: newAnswers,
                                    });
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

                      <div className="flex gap-2">
                        <Button
                          className="w-auto border-green-600 text-green-600"
                          onClick={() => {
                            const answers = form.getFieldValue('answers') || [];
                            const hasCorrect = answers.some(
                              (a: any) => a?.isCorrect === true,
                            );

                            if (hasCorrect) {
                              message.warning(
                                'Chỉ được phép có một đáp án đúng.',
                              );
                            } else {
                              add({ isCorrect: true, title: '' });
                            }
                          }}
                        >
                          Thêm đáp án đúng
                        </Button>
                        <Button
                          className="w-auto"
                          danger
                          onClick={() => add({ isCorrect: false, title: '' })}
                        >
                          Thêm đáp án sai
                        </Button>
                      </div>
                      {errors.length > 0 && fields.length === 0 && (
                        <div className="ant-form-item-explain-error">
                          {errors.join(', ')}
                        </div>
                      )}
                    </>
                  );
                }}
              </Form.List>
            </Form.Item>
          </>
        )}
        {/* {typeQuestion === QuestionEntity.QuestionType.TrueFalse && (
          <Form.Item
            name="answer"
            label="Câu trả lời:"
            style={{ width: '100%' }}
            rules={[{ required: true, message: 'Vui lòng chọn câu trả lời' }]}
          >
            <Select placeholder="Chọn câu trả lời">
              <Select.Option value={true} key="true">
                <CheckCircleOutlined style={{ color: 'green' }} /> Đúng
              </Select.Option>
              <Select.Option value={false} key="false">
                <CloseCircleOutlined style={{ color: 'red' }} /> Sai
              </Select.Option>
            </Select>
          </Form.Item>
        )} */}
        {typeQuestion === QuestionEntity.type.MATCHING && (
          <Form.Item label="Câu trả lời:" style={{ width: '100%' }}>
            <Form.List
              name="answers"
              rules={[
                {
                  validator: async (_, answers) => {
                    if (!answers || answers.length < 1) {
                      return Promise.reject(
                        new Error('Vui lòng thêm ít nhất một cặp đáp án'),
                      );
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div
                      key={key}
                      style={{
                        marginBottom: '8px',
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                      }}
                    >
                      <Form.Item
                        {...restField}
                        name={[name, 'left']}
                        rules={[{ required: true, message: 'Nhập vế trái' }]}
                        style={{ width: '45%' }}
                      >
                        <Input placeholder="Nhập vế trái" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'right']}
                        rules={[{ required: true, message: 'Nhập vế phải' }]}
                        style={{ width: '45%' }}
                      >
                        <Input placeholder="Nhập vế phải" />
                      </Form.Item>
                      <Form.Item style={{ width: '10%' }}>
                        <Button
                          icon={<DeleteOutlined />}
                          onClick={() => remove(name)}
                          danger
                        />
                      </Form.Item>
                    </div>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Thêm cặp
                    </Button>
                  </Form.Item>
                  {errors.length > 0 && fields.length === 0 && (
                    <div className="ant-form-item-explain-error">
                      {errors.join(', ')}
                    </div>
                  )}
                </>
              )}
            </Form.List>
          </Form.Item>
        )}
        {typeQuestion === QuestionEntity.type.FILL_IN_BLANK && (
          <>
            <Form.List name="answers">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, idx) => (
                    <div
                      key={field.key}
                      style={{
                        display: 'flex',
                        marginBottom: '24px',
                        gap: '24px',
                        alignContent: 'center',
                      }}
                    >
                      <Form.Item
                        {...field}
                        name={[field.name, 'index']}
                        style={{ width: 50, marginBottom: '0px' }}
                        initialValue={idx + 1}
                      >
                        <Input
                          placeholder="Vị trí"
                          type="number"
                          readOnly
                          style={{ textAlign: 'center' }}
                        />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'correctAnswer']}
                        rules={[{ required: true, message: 'Đáp án đúng?' }]}
                        style={{ width: 200, marginBottom: '0px' }}
                      >
                        <Input placeholder="Đáp án đúng" />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'explanation']}
                        style={{ flex: 1, marginBottom: '0px' }}
                      >
                        <Input placeholder="Giải thích" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </div>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Thêm đáp án đúng
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.List name="options">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, idx) => (
                    <div
                      key={field.key}
                      style={{
                        display: 'flex',
                        marginBottom: '24px',
                        gap: '24px',
                        alignContent: 'center',
                      }}
                    >
                      <Form.Item
                        {...field}
                        name={[field.name, 'text']}
                        rules={[{ required: true, message: 'Đáp án sai?' }]}
                        style={{ flex: 1, marginBottom: '0px' }}
                      >
                        <Input placeholder={`Đáp án sai ${idx + 1}`} />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </div>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Thêm đáp án sai
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </>
        )}
        {typeQuestion === QuestionEntity.type.SORTING && (
          <Form.Item
            label="Câu trả lời (sắp xếp câu):"
            style={{ width: '100%' }}
          >
            <Form.Item name="newSegment" style={{ width: '50%' }}>
              <Input placeholder="Nhập một phần câu" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                onClick={() => {
                  const newSegment = form.getFieldValue('newSegment')?.trim();
                  if (!newSegment) return;

                  const currentAnswers = form.getFieldValue('answers') || [];
                  const newAnswer = {
                    content: newSegment,
                    index: currentAnswers.length,
                  };

                  form.setFieldsValue({
                    answers: [...currentAnswers, newAnswer],
                    newSegment: '',
                  });
                }}
                style={{ marginBottom: '10px' }}
              >
                Thêm
              </Button>
            </Form.Item>

            <Form.List
              name="answers"
              rules={[
                {
                  validator: async (_, answers) => {
                    if (!answers || answers.length === 0) {
                      return Promise.reject(
                        new Error('Vui lòng thêm ít nhất một phần câu'),
                      );
                    }
                  },
                },
              ]}
            >
              {(fields, { remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => (
                    <div
                      key={key}
                      style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                      }}
                    >
                      <Form.Item>
                        <Input
                          value={index + 1}
                          readOnly
                          style={{ width: '40px', textAlign: 'center' }}
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'content']}
                        style={{ width: '50%' }}
                        rules={[
                          { required: true, message: 'Không được để trống' },
                        ]}
                      >
                        <Input placeholder={`Phần ${index + 1}`} />
                      </Form.Item>

                      <Form.Item
                        name={[name, 'index']}
                        style={{ display: 'none' }}
                      >
                        <Input type="hidden" />
                      </Form.Item>

                      <Form.Item>
                        <Button danger onClick={() => remove(name)}>
                          <DeleteOutlined />
                        </Button>
                      </Form.Item>
                    </div>
                  ))}
                </>
              )}
            </Form.List>
          </Form.Item>
        )}
        {/* {typeQuestion === QuestionEntity.QuestionType.DragAndDrop && (
          <Form.Item label="Câu trả lời:" style={{ width: '100%' }}>
            <Form.Item name="newWord" style={{ width: '50%' }}>
              <Input placeholder="Từ kéo thả" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                onClick={() => {
                  const newWord = form.getFieldValue('newWord')?.trim();
                  if (!newWord) return;

                  const currentAnswers = form.getFieldValue('answers') || [];
                  form.setFieldsValue({
                    answers: [...currentAnswers, newWord],
                    newWord: '', // reset lại input
                  });
                }}
                style={{ marginBottom: '10px' }}
              >
                Thêm từ
              </Button>
            </Form.Item>
            <Form.List
              name="answers"
              rules={[
                {
                  validator: async (_, answers) => {
                    if (!answers || answers.length === 0) {
                      return Promise.reject(
                        new Error('Vui lòng thêm ít nhất một đáp án'),
                      );
                    }
                  },
                },
              ]}
            >
              {(fields, { remove }, { errors }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div
                      key={key}
                      style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                      }}
                    >
                      <Form.Item
                        {...restField}
                        name={name}
                        style={{ width: '50%' }}
                        rules={[
                          { required: true, message: 'Không được để trống' },
                        ]}
                      >
                        <Input placeholder={`Từ ${key + 1}`} />
                      </Form.Item>
                      <Form.Item>
                        <Button danger onClick={() => remove(name)}>
                          <DeleteOutlined />
                        </Button>
                      </Form.Item>
                    </div>
                  ))}
                  {errors.length > 0 && fields.length === 0 && (
                    <div className="ant-form-item-explain-error">
                      {errors.join(', ')}
                    </div>
                  )}
                </>
              )}
            </Form.List>
          </Form.Item>
        )} */}
        {typeQuestion !== QuestionEntity.type.FILL_IN_BLANK && (
          <Form.Item
            validateTrigger={['onBlur', 'onChange']}
            name="explain"
            label="Giải thích:"
            style={{
              width: '100%',
            }}
            rules={[{ required: true, message: 'Vui lòng nhập giải thích' }]}
          >
            <Input className="custom-input" placeholder="Giải thích" />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default ModalCreateUpdatePratice;
