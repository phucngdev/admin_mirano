import { LessonDetailEntity } from '#/api/requests/interfaces/LessonDetailEntity';
import { deleteExamLessonService } from '#/api/services/examLessonService';
import CollapseAudio from '#/features/course-editor/components/Collapse/audio/CollapseAudio';
import ModalCreateAudio from '#/features/course-editor/components/modal/ModalCreateAudio';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { getAudioLesson } from '#/src/redux/thunk/audio-lesson.thunk';
import {
  createAndAddExamLesson,
  getExamLesson,
} from '#/src/redux/thunk/exam-lesson.thunk';
import { updateExam } from '#/src/redux/thunk/exam.thunk';
import { DeleteTwoTone, ImportOutlined, PlusOutlined } from '@ant-design/icons';
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
  Table,
  Tooltip,
  Upload,
} from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TypeModal } from '../../LessonDetail';
import ReadOnlyCK from '#/shared/components/ckeditor/ReadOnlyCK';
import ModalSelectQuestion from '#/features/course-editor/components/modal/ModalSelectQuestion';
import ModalSelectExam from '#/features/course-editor/components/modal/ModalSelectExam';

interface AudioScriptTypeProps {
  form: FormInstance;
  lesson: LessonDetailEntity;
  setActiveModal: (key: TypeModal) => void;
  activeModal: TypeModal;
  handleClose: (
    key: 'question_listening' | 'select-question' | 'group_question',
  ) => void;
}

const AudioScriptType = ({
  form,
  lesson,
  setActiveModal,
  activeModal,
  handleClose,
}: AudioScriptTypeProps) => {
  const dispatch = useAppDispatch();
  const [formExam] = Form.useForm();
  const { lessonEdit } = useSelector((state: RootState) => state.lesson);

  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);

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
      if (lessonEdit.exam_lesson && lessonEdit.exam_lesson.exam) {
        formExam.setFieldsValue({
          name: lessonEdit.exam_lesson.exam.name,
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

  const handleDeleteQSInExam = (id: string) => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa nhóm câu hỏi?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        if (!lessonEdit || !lessonEdit.exam_lesson) return;

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
        createAndAddExamLesson({ lessonId: lessonEdit.id, data: values }),
      );
      if (result.meta.requestStatus === 'fulfilled') {
        message.success('Tạo thành công!');
        fetchData();
      } else {
        message.error('Tạo thất bại! Vui lòng tải lại trang');
      }
    }
  };

  const columns = [
    {
      title: 'Nội dung câu hỏi',
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
              onClick={() => handleDeleteQSInExam(record.id)}
            >
              Xoá
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <ModalSelectQuestion
        open={activeModal === 'select-question'}
        type="audio"
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
            </Row>
          </Form>

          <Button
            className="mb-5 w-fit"
            type="default"
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
            className="list-audio"
            expandable={{
              expandedRowRender: (record: any) => (
                <>
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
                  <Collapse expandIconPosition="end" className="border-none">
                    {record.fillInBlank.map((answer: any) => (
                      <Row gutter={16} className="w-full">
                        <Col span={12}>
                          <Form.Item label={`Đáp án ${answer.index}`}>
                            <Input
                              className="custom-input"
                              readOnly
                              value={answer.correctAnswer}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Giải thích:">
                            <Input
                              className="custom-input"
                              readOnly
                              value={answer.explanation}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    ))}
                  </Collapse>
                </>
              ),
            }}
          />
        </>
      )}
    </>
  );
};

export default AudioScriptType;
