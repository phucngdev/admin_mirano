import { useAppDispatch } from '#/src/redux/store/store';
import {
  createQuestion,
  updateQuestion,
} from '#/src/redux/thunk/question.thunk';
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
import { useEffect, useState } from 'react';
import {
  CloseOutlined,
  DeleteOutlined,
  LoadingOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import BaseCKEditor from '#/shared/components/ckeditor/BaseCKEditor';
import { practiceTypeLabelMap } from '#/api/requests/interfaces/LabelMap';
import {
  beforeUploadAudio,
  beforeUploadImage,
  beforeUploadPdf,
} from '#/shared/props/beforeUpload';
import { uploadFileToS3 } from '#/api/services/uploadS3';
import { QuestionEntity } from '#/api/requests';
import {
  createDocumentQuestionService,
  deleteDocumentQuestionService,
} from '#/api/services/questionService';
import PreviewQuestion from '../preview/PreviewQuestion';
import './index.scss';
interface ModalCreateProps {
  open: boolean;
  onClose: () => void;
  itemUpdate?: QuestionEntity | null;
}
const ModalCreateUpdateQuestion = ({
  open,
  onClose,
  itemUpdate,
}: ModalCreateProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const typeQuestion = Form.useWatch('type_question', form);
  const [loading, setLoading] = useState<
    'image' | 'audio' | 'file' | 'docs' | ''
  >('');
  const [audioFileList, setAudioFileList] = useState<UploadFile[]>([]);
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);
  const [pdfFileList, setPdfFileList] = useState<UploadFile[]>([]);
  const [pdfFileListDocs, setPdfFileListDocs] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (itemUpdate) {
      form.setFieldsValue({
        type_question: itemUpdate.type,
        content: itemUpdate.content,
        tag: itemUpdate.tag,
        explain: itemUpdate.explain,
      });
      if (itemUpdate.type === QuestionEntity.type.MULTIPLE_CHOICE) {
        form.setFieldValue('answers', itemUpdate.multipleChoiceAnswers);
      } else if (itemUpdate.type === QuestionEntity.type.MATCHING) {
        form.setFieldValue('answers', itemUpdate.matchingAnswers);
      } else if (itemUpdate.type === QuestionEntity.type.ESSAY) {
        form.setFieldValue(
          'description',
          itemUpdate.essayAnswers[0].description,
        );
        setPdfFileList([
          {
            uid: Date.now().toString(),
            name: itemUpdate.essayAnswers[0].examUrl,
            status: 'done',
            url: itemUpdate.essayAnswers[0].examUrl,
          },
        ]);
        const listDocs: UploadFile<any>[] =
          itemUpdate.essayAnswers[0].documents.map(doc => {
            return {
              uid: doc.id,
              name: doc.name,
              status: 'done',
              url: doc.url,
            };
          });
        setPdfFileListDocs(listDocs);
      } else if (
        itemUpdate.type === QuestionEntity.type.MULTIPLE_CHOICE_HORIZONTAL
      ) {
        form.setFieldValue('answers', itemUpdate.multipleChoiceHorizontal);
      } else if (itemUpdate.type === QuestionEntity.type.SORTING) {
        form.setFieldValue('answers', itemUpdate.sortingAnswers);
      } else if (
        itemUpdate.type === QuestionEntity.type.CHOOSE_ANSWER_IN_BLANK
      ) {
        form.setFieldValue('answers', itemUpdate.chooseAnswerInBlank);
        // Lấy danh sách đáp án đúng
        const correctAnswers = itemUpdate.chooseAnswerInBlank?.map(
          item => item.correctAnswer,
        );
        // Lọc ra các options không nằm trong correctAnswers
        const filtered = itemUpdate.options
          ?.filter(option => !correctAnswers?.includes(option))
          .map(text => ({ text }));
        form.setFieldValue('options', filtered);
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

      if (itemUpdate.audioUrl) {
        setAudioFileList([
          {
            uid: '-2',
            name: itemUpdate.audioUrl,
            status: 'done',
            url: itemUpdate.audioUrl,
          },
        ]);
        form.setFieldValue('audioUrl', itemUpdate.audioUrl);
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
        form.setFieldValue('imageUrl', itemUpdate.imageUrl);
      }
    } else {
      form.setFieldsValue({ answers: [] });
      form.resetFields();
      setImageFileList([]);
      setAudioFileList([]);
      setPdfFileListDocs([]);
    }
  }, [itemUpdate, open]);

  // theo dõi err của đáp án để ẩn đi
  useEffect(() => {
    form.validateFields(['answers']).catch(() => {});
  }, [form.getFieldValue('answers')]);

  const handleCreate = async () => {
    const values = await form.validateFields();
    const data: any = {
      content: values.content,
      explain: values.explain,
      tag: values.tag,
      type: values.type_question,
    };

    switch (values.type_question) {
      case QuestionEntity.type.MULTIPLE_CHOICE:
        data.multipleChoiceAnswers = values.answers;
        break;
      case QuestionEntity.type.CHOOSE_ANSWER_IN_BLANK:
        data.chooseAnswerInBlank = values.answers;
        const correctArr = values.answers.map((a: any) => a.correctAnswer);
        const optionArr = values.options.map((item: any) => item.text);
        data.options = [...correctArr, ...optionArr];
        break;
      case QuestionEntity.type.MATCHING:
        data.matchingAnswers = values.answers;
        break;
      case QuestionEntity.type.FILL_IN_BLANK:
        data.fillInBlank = values.answers;
        break;
      case QuestionEntity.type.SORTING:
        data.sortingAnswers = values.answers;
        break;
      case QuestionEntity.type.MULTIPLE_CHOICE_HORIZONTAL:
        data.multipleChoiceHorizontal = values.answers;
        if (values.imageUrl) {
          data.imageUrl = values.imageUrl;
        }
        if (values.audioUrl) {
          data.audioUrl = values.audioUrl;
        }
        break;
      case QuestionEntity.type.ESSAY:
        data.essayAnswers = [
          {
            examUrl: pdfFileList[0]?.url || '',
            description: values.description || '',
          },
        ];
        break;
      default:
        message.error('Loại câu hỏi không hợp lệ!');
        return;
    }

    const result = await dispatch(createQuestion(data));

    if (result.payload.statusCode === 201) {
      message.success('Thêm thành công');
      onClose();
    } else {
      message.error('Thêm thất bại');
    }
  };

  const handleUpdate = async () => {
    if (!itemUpdate) return;
    const values = await form.validateFields();
    const data: any = {
      content: values.content,
      tag: values.tag,
      type: values.type_question,
    };

    if (values.imageUrl) {
      data.imageUrl = values.imageUrl;
    }
    if (values.audioUrl) {
      data.audioUrl = values.audioUrl;
    }

    switch (values.type_question) {
      case QuestionEntity.type.MULTIPLE_CHOICE:
        data.multipleChoiceAnswers = values.answers;
        data.explain = values.explain;
        break;
      case QuestionEntity.type.FILL_IN_BLANK:
        data.fillInBlank = values.answers;
        break;
      case QuestionEntity.type.CHOOSE_ANSWER_IN_BLANK:
        data.chooseAnswerInBlank = values.answers;
        const correctArr = values.answers.map((a: any) => a.correctAnswer);
        const optionArr = values.options.map((item: any) => item.text);
        data.options = [...correctArr, ...optionArr];
        break;
      case QuestionEntity.type.MATCHING:
        data.matchingAnswers = values.answers;
        break;
      case QuestionEntity.type.SORTING:
        data.sortingAnswers = values.answers;
        break;
      case QuestionEntity.type.MULTIPLE_CHOICE_HORIZONTAL:
        data.multipleChoiceHorizontal = values.answers;
        data.explain = values.explain;
        data.options = [];
        break;
      case QuestionEntity.type.ESSAY:
        data.essayAnswers = [
          {
            examUrl: pdfFileList[0].url || '',
            description: values.description || '',
          },
        ];
        break;
      default:
        message.error('Loại câu hỏi không hợp lệ!');
        return;
    }

    const result = await dispatch(
      updateQuestion({
        id: itemUpdate.id,
        data: data,
      }),
    );

    if (result.payload.statusCode === 200) {
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

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Modal
        closeIcon={<CloseOutlined />}
        className="modal-create-update-question-tab"
        footer={[
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
        {/* <PreviewQuestion type={typeQuestion} form={form} /> */}
        <Form
          form={form}
          layout="vertical"
          validateTrigger={['onBlur', 'onSubmit']}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type_question"
                label="Loại câu hỏi:"
                style={{ width: '100%' }}
              >
                <Select
                  value={typeQuestion}
                  onChange={value => {
                    if (itemUpdate) {
                      message.info('Không được đổi loại câu hỏi');
                      form.setFieldValue('type_question', typeQuestion);
                      return;
                    }
                    form.setFieldValue('type_question', value);
                  }}
                  className="custom-select"
                  placeholder="Loại câu hỏi"
                  options={Object.values(QuestionEntity.type).map(value => ({
                    value,
                    label: practiceTypeLabelMap[value],
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="tag" label="Tag:" style={{ width: '100%' }}>
                <Input className="custom-input" placeholder="Tag" />
              </Form.Item>
            </Col>
          </Row>
          {typeQuestion === QuestionEntity.type.MULTIPLE_CHOICE_HORIZONTAL && (
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
                      setLoading('image');
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
                        setLoading('');
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
                        {loading === 'image' ? (
                          <LoadingOutlined />
                        ) : (
                          <PlusOutlined />
                        )}
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
                      setLoading('audio');
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
                        setLoading('');
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
                    <Button
                      icon={
                        loading === 'audio' ? (
                          <LoadingOutlined />
                        ) : (
                          <UploadOutlined />
                        )
                      }
                    >
                      Tải audio lên
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          )}
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

          {(typeQuestion === QuestionEntity.type.MULTIPLE_CHOICE ||
            typeQuestion ===
              QuestionEntity.type.MULTIPLE_CHOICE_HORIZONTAL) && (
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
                                      style={{
                                        color: 'red',
                                        cursor: 'pointer',
                                      }}
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
                              // const answers =
                              //   form.getFieldValue('answers') || [];
                              // const hasCorrect = answers.some(
                              //   (a: any) => a?.isCorrect === true,
                              // );

                              // if (hasCorrect) {
                              //   message.warning(
                              //     'Chỉ được phép có một đáp án đúng.',
                              //   );
                              // } else {
                              // }
                              add({ isCorrect: true, title: '' });
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
          {/* {typeQuestion === QuestionEntity.type.TrueFalse && (
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
          {typeQuestion === QuestionEntity.type.CHOOSE_ANSWER_IN_BLANK && (
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
                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                        />
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
                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                        />
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
                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                        />
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
            </>
          )}

          {typeQuestion === QuestionEntity.type.ESSAY && (
            <>
              <Upload
                beforeUpload={beforeUploadPdf}
                fileList={pdfFileList}
                listType="picture"
                customRequest={async ({ file, onError }) => {
                  if (!file) return;
                  try {
                    setLoading('file');
                    const { publicUrl } = await uploadFileToS3(file as File);
                    setPdfFileList([
                      {
                        uid: Date.now().toString(),
                        name: (file as File).name,
                        status: 'done',
                        url: publicUrl,
                      },
                    ]);
                    form.setFieldValue('answers', publicUrl);
                  } catch (error) {
                    onError?.(error as Error);
                    message.error('Tải lên thất bại');
                  } finally {
                    setLoading('');
                  }
                }}
                onRemove={() => {
                  setPdfFileList([]);
                  form.setFieldValue('answers', '');
                }}
              >
                <Button
                  icon={
                    loading === 'file' ? (
                      <LoadingOutlined />
                    ) : (
                      <UploadOutlined />
                    )
                  }
                >
                  Thêm tài liệu
                </Button>
              </Upload>
              <Form.Item
                name="description"
                label="Mô tả"
                style={{ width: '100%', marginTop: '24px' }}
                rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
              >
                <BaseCKEditor
                  changeData={(value: string) => {
                    form.setFieldsValue({ description: value });
                  }}
                  value={form.getFieldValue('description')}
                />
              </Form.Item>
              {itemUpdate && (
                <Form.Item
                  label="Tài liệu tham khảo"
                  style={{ width: '100%', marginTop: '24px' }}
                >
                  <Upload
                    beforeUpload={beforeUploadPdf}
                    fileList={pdfFileListDocs}
                    listType="picture"
                    customRequest={async ({ file, onError }) => {
                      if (!file) return;
                      try {
                        setLoading('docs');
                        const { publicUrl } = await uploadFileToS3(
                          file as File,
                        );
                        setPdfFileListDocs([
                          ...pdfFileListDocs,
                          {
                            uid: Date.now().toString(),
                            name: (file as File).name,
                            status: 'done',
                            url: publicUrl,
                          },
                        ]);
                        await createDocumentQuestionService(itemUpdate.id, {
                          name: (file as File).name,
                          url: publicUrl,
                        });
                      } catch (error) {
                        onError?.(error as Error);
                        message.error('Tải lên thất bại');
                      } finally {
                        setLoading('');
                      }
                    }}
                    onRemove={async file => {
                      await deleteDocumentQuestionService(itemUpdate.id, {
                        documentId: file.uid,
                      });
                      setPdfFileListDocs(prev =>
                        prev.filter(f => f.uid !== file.uid),
                      );
                    }}
                  >
                    <Button
                      icon={
                        loading === 'docs' ? (
                          <LoadingOutlined />
                        ) : (
                          <UploadOutlined />
                        )
                      }
                    >
                      Thêm tài liệu
                    </Button>
                  </Upload>
                </Form.Item>
              )}
            </>
          )}

          {typeQuestion !== QuestionEntity.type.CHOOSE_ANSWER_IN_BLANK &&
            typeQuestion !== QuestionEntity.type.ESSAY && (
              <Form.Item
                validateTrigger={['onBlur', 'onChange']}
                name="explain"
                label="Giải thích:"
                rules={[
                  { required: true, message: 'Vui lòng nhập giải thích' },
                ]}
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
    </>
  );
};

export default ModalCreateUpdateQuestion;
