import {
  DeleteOutlined,
  LoadingOutlined,
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
  Popconfirm,
  Row,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd';
import { useState } from 'react';
import './index.scss';
import { practiceTypeLabelMap } from '#/api/requests/interfaces/LabelMap';
import BaseCKEditor from '#/shared/components/ckeditor/BaseCKEditor';
import { useAppDispatch } from '#/src/redux/store/store';
import { QuestionEntity } from '#/api/requests';

interface FormQuestionProps {
  setOpenForm: (value: boolean) => void;
}

const FormQuestion = ({ setOpenForm }: FormQuestionProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState(
    QuestionEntity.type.MULTIPLE_CHOICE,
  );
  const [pairs, setPairs] = useState<{ question: string; answer: string }[]>(
    [],
  );
  const [questionInput, setQuestionInput] = useState('');
  const [answerInput, setAnswerInput] = useState('');
  const [words, setWords] = useState<string[]>([]); // State để lưu danh sách từ cần điền
  const [wordInput, setWordInput] = useState(''); // State để lưu giá trị nhập vào từ cần điền

  const handleTypeChange = (value: QuestionEntity.type) => {
    setSelectedType(value);
  };

  const handleAddPair = () => {
    if (!questionInput || !answerInput) {
      message.error('Vui lòng nhập cả câu hỏi và đáp án');
      return;
    }

    // Thêm cặp câu hỏi - đáp án vào mảng
    setPairs([...pairs, { question: questionInput, answer: answerInput }]);

    // Reset các ô nhập sau khi thêm cặp
    setQuestionInput('');
    setAnswerInput('');
    message.success('Cặp ghép đôi đã được thêm');
  };

  const handleDeletePair = (index: number) => {
    // Xoá cặp câu hỏi - đáp án khỏi mảng
    const newPairs = [...pairs];
    newPairs.splice(index, 1);
    setPairs(newPairs);
    message.success('Cặp ghép đôi đã được xoá');
  };

  const handleEditPair = (
    index: number,
    field: 'answer-1' | 'answer-2',
    value: string,
  ) => {
    // Cập nhật câu hỏi hoặc đáp án trong mảng pairs
    const updatedPairs = [...pairs];
    updatedPairs[index] = { ...updatedPairs[index], [field]: value };
    setPairs(updatedPairs);
  };

  const handleAddWord = () => {
    if (!wordInput) {
      message.error('Vui lòng nhập từ cần điền');
      return;
    }

    setWords([...words, wordInput]);
    setWordInput('');
    message.success('Từ cần điền đã được thêm');
  };

  // Hàm chỉnh sửa từ trong danh sách
  const handleEditWord = (index: number, newWord: string) => {
    const updatedWords = [...words];
    updatedWords[index] = newWord;
    setWords(updatedWords);
  };

  const handleSubmit = async () => {
    // const result = await dispatch(createQuestion({
    // }));
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        validateTrigger={['onBlur', 'onSubmit']}
        className="form-new-question"
      >
        <div className="head-form">
          <h3 className="title-form">Thêm câu hỏi mới</h3>
          <div className="right-head-form">
            <Button onClick={() => setOpenForm(false)} type="default">
              Huỷ
            </Button>
            <Button type="primary">Lưu câu hỏi</Button>
          </div>
        </div>
        <div className="content-form">
          <div className="left-form">
            <Form.Item
              name="type_question"
              label="Loại câu hỏi:"
              style={{ width: '100%' }}
            >
              <Select
                onChange={value => form.setFieldValue('type_question', value)}
                placeholder="Loại câu hỏi"
                defaultValue={
                  practiceTypeLabelMap[QuestionEntity.type.MULTIPLE_CHOICE]
                }
                options={Object.values(QuestionEntity.type).map(value => ({
                  value,
                  label: practiceTypeLabelMap[value],
                }))}
              />
            </Form.Item>
            <Row gutter={16}>
              <Col span={10}>
                <Form.Item
                  name="image"
                  label="Ảnh câu hỏi:"
                  style={{ width: '100%' }}
                >
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={({ fileList: newFileList }) => {
                      setFileList(newFileList);
                      if (
                        newFileList[0]?.status === 'done' &&
                        newFileList[0]?.response?.url
                      ) {
                        form.setFieldsValue({
                          imageUrl: newFileList[0].response.url,
                        });
                      }
                    }}
                  >
                    {fileList.length < 1 && (
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
              <Col span={12}>
                <Form.Item
                  name="audio"
                  label="Audio câu hỏi:"
                  style={{ width: '100%' }}
                >
                  <Upload>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </div>
          <div className="right-form">
            <Form.Item
              name="question"
              label="Nội dung câu hỏi:"
              style={{ width: '100%' }}
              rules={[{ required: true, message: 'Vui lòng nhập câu hỏi' }]}
            >
              <BaseCKEditor
                changeData={(value: string) => {
                  form.setFieldsValue({ question: value });
                }}
                value={form.getFieldValue('question')}
              />
            </Form.Item>
            {selectedType === QuestionEntity.type.MULTIPLE_CHOICE && (
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
                            if (!answer?.title) {
                              return Promise.reject(
                                new Error(
                                  'Tất cả các đáp án phải có nội dung.',
                                ),
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
                                  name={[name, 'title']}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Nhập đáp án',
                                    },
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
                                        isCorrect
                                          ? 'bg-green-100'
                                          : 'bg-red-100'
                                      }`}
                                      placeholder="Đáp án"
                                      value={answers[name].title}
                                      onChange={e => {
                                        const newAnswers = [...answers];
                                        newAnswers[name] = {
                                          ...newAnswers[name],
                                          title: e.target.value,
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

                          {errors.length > 0 && fields.length === 0 && (
                            <div className="ant-form-item-explain-error">
                              {errors.join(', ')}
                            </div>
                          )}

                          <div className="flex gap-2">
                            <Button
                              className="w-auto border-green-600 text-green-600"
                              onClick={() => {
                                const answers =
                                  form.getFieldValue('answers') || [];
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
                              Thêm câu đúng
                            </Button>
                            <Button
                              className="w-auto"
                              danger
                              onClick={() =>
                                add({ isCorrect: false, title: '' })
                              }
                            >
                              Thêm câu sai
                            </Button>
                          </div>
                        </>
                      );
                    }}
                  </Form.List>
                </Form.Item>
              </>
            )}
            {/* {selectedType === QuestionEntity.QuestionType.TrueFalse && (
              <Form.Item
                name="question"
                label="Câu trả lời:"
                style={{ width: '100%' }}
                rules={[
                  { required: true, message: 'Vui lòng chọn câu trả lời' },
                ]}
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
            {selectedType === QuestionEntity.type.MATCHING && (
              <Form.Item
                name="answers"
                label="Câu trả lời:"
                style={{ width: '100%' }}
                rules={[
                  { required: true, message: 'Vui lòng nhập câu trả lời' },
                ]}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '10px',
                      marginBottom: '10px',
                    }}
                  >
                    <Input
                      value={questionInput}
                      onChange={e => setQuestionInput(e.target.value)}
                      placeholder="Nhập câu hỏi"
                      style={{ width: '50%' }}
                      className="custom-input"
                    />
                    <Input
                      value={answerInput}
                      onChange={e => setAnswerInput(e.target.value)}
                      placeholder="Nhập đáp án"
                      style={{ width: '50%' }}
                      className="custom-input"
                    />
                  </div>

                  <Button
                    onClick={handleAddPair}
                    type="primary"
                    style={{ marginBottom: '10px' }}
                  >
                    Thêm cặp
                  </Button>

                  {pairs.map((pair, index) => (
                    <div
                      key={index}
                      style={{
                        marginBottom: '8px',
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                      }}
                    >
                      <Input
                        value={pair.question}
                        className="custom-input"
                        onChange={e =>
                          handleEditPair(index, 'answer-1', e.target.value)
                        }
                        style={{ width: '50%' }}
                      />
                      <Input
                        value={pair.answer}
                        className="custom-input"
                        onChange={e =>
                          handleEditPair(index, 'answer-2', e.target.value)
                        }
                        style={{ width: '50%' }}
                      />
                      <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeletePair(index)}
                        danger
                        style={{ marginLeft: '5px' }}
                      />
                    </div>
                  ))}
                </div>
              </Form.Item>
            )}
            {selectedType === QuestionEntity.type.FILL_IN_BLANK && (
              <Form.Item
                name="answers"
                label="Câu trả lời:"
                style={{ width: '100%' }}
                rules={[
                  { required: true, message: 'Vui lòng nhập câu trả lời' },
                ]}
              >
                <div>
                  <Input
                    placeholder="Từ cần điền"
                    value={wordInput}
                    onChange={e => setWordInput(e.target.value)}
                    style={{ width: '50%' }}
                    className="custom-input"
                  />
                  <Button
                    onClick={handleAddWord}
                    type="primary"
                    style={{ marginTop: '10px', marginLeft: '10px' }}
                  >
                    Thêm từ cần điền
                  </Button>

                  {words.map((word, index) => (
                    <div
                      key={index}
                      style={{
                        margin: '8px 0',
                        display: 'flex',
                        gap: '10px',
                      }}
                    >
                      <Input
                        value={word}
                        onChange={e => handleEditWord(index, e.target.value)}
                        style={{ width: '50%' }}
                      />
                    </div>
                  ))}
                </div>
              </Form.Item>
            )}
            {/* {selectedType === QuestionEntity.QuestionType.DragAndDrop && (
              <Form.Item
                name="answers"
                label="Câu trả lời:"
                style={{ width: '100%' }}
                rules={[
                  { required: true, message: 'Vui lòng nhập câu trả lời' },
                ]}
              >
                <div>
                  <Input
                    placeholder="Từ kéo thả"
                    value={wordInput}
                    onChange={e => setWordInput(e.target.value)}
                    style={{ width: '50%' }}
                    className="custom-input"
                  />
                  <Button
                    onClick={handleAddWord}
                    type="primary"
                    style={{ marginTop: '10px', marginLeft: '10px' }}
                  >
                    Thêm từ
                  </Button>

                  {words.map((word, index) => (
                    <div
                      key={index}
                      style={{
                        margin: '8px 0',
                        display: 'flex',
                        gap: '10px',
                      }}
                    >
                      <Input
                        value={word}
                        onChange={e => handleEditWord(index, e.target.value)}
                        style={{ width: '50%' }}
                      />
                    </div>
                  ))}
                </div>
              </Form.Item>
            )} */}
          </div>
        </div>
      </Form>
    </>
  );
};

export default FormQuestion;
