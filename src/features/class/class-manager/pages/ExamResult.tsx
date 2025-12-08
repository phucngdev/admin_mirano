import {
  getAllExamInClass,
  getOneClass,
  getResultExamLessonClass,
} from '#/src/redux/thunk/class.thunk';
import ms_excel from '#/assets/images/icon_button/ms_excel.png';
import {
  Breadcrumb,
  Button,
  Card,
  Empty,
  Form,
  Input,
  message,
  Modal,
  Popover,
  Select,
  Space,
  Table,
  Tabs,
  Upload,
  UploadFile,
} from 'antd';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { useSelector } from 'react-redux';
import {
  CloseOutlined,
  EditOutlined,
  FileOutlined,
  LoadingOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  getAllExamCourseInClass,
  getAllResultByExamId,
  updateScoreEssayTest,
} from '#/src/redux/thunk/essay-test.thunk';
import {
  ClassExamResultDetailEntity,
  ManagerHasSubmittedEntity,
} from '#/api/requests';
import { uploadFileToS3 } from '#/api/services/uploadS3';
import { beforeUploadPdf } from '#/shared/props/beforeUpload';
import utc from 'dayjs/plugin/utc';
import { updateScoreExamService } from '#/api/services/examResultService';

dayjs.extend(utc);

const ExamResult = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
  const { classEdit, exam, result, exam_lesson, result_lesson } = useSelector(
    (state: RootState) => state.class,
  );

  const [loading, setLoading] = useState<
    'exam' | 'scores' | 'submitted' | 'pdf' | ''
  >('');
  const [activeTab, setActiveTab] = useState<'scores' | 'submitted'>('scores');
  const [activeCourseId, setActiveCourseId] = useState<string>('');
  const [examActiveId, setExamActiveId] = useState<string>('');
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
  const [pdfFileList, setPdfFileList] = useState<UploadFile[]>([]);
  const [query, setQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!query) return result_lesson;
    const lowerKeyword = query.toLowerCase();
    return result_lesson.filter(item => {
      const name = item.studentName?.toString().toLowerCase() || '';
      const code = item.studentCode?.toString().toLowerCase() || '';
      return name.includes(lowerKeyword) || code.includes(lowerKeyword);
    });
  }, [result_lesson, query]);

  useEffect(() => {
    if (classEdit) {
      setActiveCourseId(classEdit.courses?.[0]?.id);
    }
    if (activeTab === 'scores') {
      if (exam_lesson && exam_lesson.length) {
        setExamActiveId(exam_lesson[0].examId);
      }
    } else {
      if (exam && exam.length) {
        setExamActiveId(exam[0].id);
      }
    }
  }, [classEdit]);

  useEffect(() => {
    if (activeTab === 'scores') {
      if (exam_lesson && exam_lesson.length) {
        setExamActiveId(exam_lesson[0].examId);
      }
    } else {
      if (exam && exam.length) {
        setExamActiveId(exam[0].id);
      }
    }
  }, [activeTab, exam, exam_lesson]);

  const fetchData = async () => {
    if (!id) return;
    await dispatch(getOneClass(id));
  };

  const fetchDataExam = async () => {
    if (!id) return;
    setLoading('exam');
    await dispatch(getAllExamCourseInClass(activeCourseId));
    setLoading('');
  };

  const fetchDataExamLesson = async () => {
    if (!id) return;
    setLoading('exam');
    await dispatch(
      getAllExamInClass({
        courseId: activeCourseId,
        classId: id,
      }),
    );
    setLoading('');
  };

  const fetchDataExamResult = async () => {
    if (!id) return;
    if (activeTab === 'scores') {
      setLoading('scores');
    } else {
      setLoading('submitted');
    }
    await dispatch(
      getAllResultByExamId({
        examId: examActiveId,
        classId: id,
      }),
    );
    setLoading('');
  };

  const getResultExamLesson = async () => {
    if (!id) return;
    if (activeTab === 'scores') {
      setLoading('scores');
    } else {
      setLoading('submitted');
    }
    await dispatch(
      getResultExamLessonClass({
        courseId: activeCourseId,
        classId: id,
        examId: examActiveId,
      }),
    );
    setLoading('');
  };

  useEffect(() => {
    if (activeTab === 'scores') {
      fetchDataExamLesson();
    } else {
      fetchDataExam();
    }
  }, [activeCourseId, activeTab]);

  useEffect(() => {
    if (!examActiveId) return;
    if (activeTab === 'scores') {
      getResultExamLesson();
    } else {
      fetchDataExamResult();
    }
  }, [examActiveId, activeTab]);

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleChangeUpdateScore = (
    userId: string,
    userName: string,
    value: number,
  ) => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn thay đổi điểm của ${userName}?`,
      okText: 'Cập nhật',
      okType: 'danger',
      onOk: async () => {
        if (!id) return;
        try {
          await updateScoreExamService({
            examId: examActiveId,
            courseId: activeCourseId,
            classId: id,
            point: value,
            studentId: userId,
          });
          message.success('Thay đổi thành công!');
          getResultExamLesson();
        } catch (error) {
          message.error('Thay đổi thất bại');
        }
      },
      title: 'Xác nhận thay đổi điểm',
    });
  };

  const submissionColumns = [
    {
      title: 'Học viên',
      dataIndex: 'userName',
      render: (_: any, record: ManagerHasSubmittedEntity) => (
        <>
          <span
            style={{
              color: 'rgba(16, 24, 40, 1)',
              fontWeight: '500',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            {record.studentName}
          </span>
        </>
      ),
      key: 'userName',
      width: 200,
    },
    {
      title: 'File',
      dataIndex: 'fileUrl',
      key: 'fileUrl',
      render: (_: any, record: ManagerHasSubmittedEntity) => (
        <div
          className="flex items-center gap-3 p-2 rounded text-[#1677fe] cursor-pointer"
          style={{ border: '1px solid #1677fe' }}
        >
          {record.submittedExamUrls && record.submittedAt ? (
            <>
              <div className="flex flex-col gap-1">
                {record.submittedExamUrls.length ? (
                  record.submittedExamUrls.map(url => (
                    <div className="flex items-start gap-2">
                      <FileOutlined className="text-lg" />
                      <a
                        href={url ?? undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {url}
                      </a>
                    </div>
                  ))
                ) : (
                  <>
                    <span>Đã thu hồi</span>
                  </>
                )}
              </div>
            </>
          ) : (
            'Chưa nộp bài'
          )}
        </div>
      ),
    },
    {
      title: 'Điểm',
      dataIndex: 'score',
      width: 250,
      key: 'score',
      render: (text: string) => (
        <span>{text !== null ? text : 'Chưa chấm điểm'}</span>
      ),
    },
    {
      title: 'Thời gian nộp',
      dataIndex: 'submittedAt',
      width: 250,
      key: 'submittedAt',
      render: (text: string) => (
        <span>{text ? dayjs(text).format('HH:mm DD/MM/YYYY') : ''}</span>
      ),
    },
    {
      title: 'Hành động',
      width: 200,
      key: 'action',
      render: (_: any, record: ManagerHasSubmittedEntity) => (
        <Space>
          <Popover
            title={
              <div className="flex items-center justify-between">
                <span>Nhận xét cho {record.studentName}</span>
                <Button
                  onClick={() => {
                    setOpenPopoverId(null);
                    setPdfFileList([]);
                  }}
                >
                  <CloseOutlined />
                </Button>
              </div>
            }
            trigger="click"
            placement="left"
            open={openPopoverId === record.studentId}
            content={
              <div onClick={e => e.stopPropagation()}>
                <Form
                  style={{ maxWidth: 500, width: 400 }}
                  layout="vertical"
                  form={form}
                  validateTrigger={['onBlur', 'onSubmit']}
                >
                  <Form.Item
                    validateTrigger={['onBlur', 'onChange']}
                    label="Điểm bài làm:"
                    name="score"
                    style={{
                      width: '100%',
                    }}
                    rules={[
                      { required: true, message: 'Không được để trống' },
                      {
                        min: 0,
                        type: 'number',
                        message: 'Tối thiểu 0 điểm',
                      },
                      {
                        max: 10,
                        type: 'number',
                        message: 'Tối da 10 điểm',
                      },
                    ]}
                    getValueFromEvent={e => {
                      const value = parseFloat(e.target.value);
                      return isNaN(value) ? undefined : value;
                    }}
                  >
                    <Input
                      placeholder="Nhập điểm"
                      type="number"
                      min={0}
                      max={10}
                      step={0.1}
                      style={{ marginBottom: 10 }}
                    />
                  </Form.Item>
                  <Form.Item
                    validateTrigger={['onBlur', 'onChange']}
                    label="Nhận xét:"
                    name="feedback"
                    style={{
                      width: '100%',
                    }}
                  >
                    <Input.TextArea
                      autoSize={{ minRows: 3, maxRows: 10 }}
                      placeholder="Nhập nhận xét..."
                      style={{ marginBottom: 8 }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="gradedTest"
                    label="File chữa:"
                    style={{ width: '100%' }}
                  >
                    <Upload
                      listType="picture"
                      fileList={pdfFileList}
                      beforeUpload={beforeUploadPdf}
                      customRequest={async ({ file }) => {
                        if (!file) return;
                        try {
                          setLoading('pdf');
                          const { publicUrl } = await uploadFileToS3(
                            file as File,
                          );
                          setPdfFileList([
                            {
                              uid: Date.now().toString(),
                              name: (file as File).name,
                              status: 'done',
                              url: publicUrl,
                            },
                          ]);
                          form.setFieldsValue({ imageUrl: publicUrl });
                        } catch (error) {
                          message.error('Tải lên thất bại');
                        } finally {
                          setLoading('');
                        }
                      }}
                      onRemove={() => {
                        setPdfFileList([]);
                      }}
                    >
                      <Button
                        icon={
                          loading === 'pdf' ? (
                            <LoadingOutlined />
                          ) : (
                            <UploadOutlined />
                          )
                        }
                      >
                        File chữa
                      </Button>
                    </Upload>
                  </Form.Item>
                  <Button
                    type="primary"
                    block
                    onClick={async () => {
                      if (!id || !openPopoverId) return;
                      const values = await form.validateFields();
                      try {
                        let data: any = {
                          score: +values.score,
                          feedback: values.feedback,
                        };
                        if (pdfFileList.length) {
                          data.gradedTest = pdfFileList[0].url;
                        }
                        await dispatch(
                          updateScoreEssayTest({
                            id: record.id,
                            data: data,
                          }),
                        );
                        form.resetFields();
                        message.success('Đã lưu nhận xét');
                        setOpenPopoverId(null);
                      } catch (error) {
                        message.error('Có lỗi xảy ra');
                        console.error(error);
                      }
                    }}
                  >
                    Lưu
                  </Button>
                </Form>
              </div>
            }
          >
            <Button
              icon={<EditOutlined />}
              onClick={e => {
                e.stopPropagation();
                setOpenPopoverId(
                  openPopoverId === record.studentId ? null : record.studentId,
                );
              }}
            >
              Chấm điểm
            </Button>
          </Popover>
        </Space>
      ),
    },
  ];

  const getScoreColumns = [
    {
      title: 'Mã học viên',
      dataIndex: 'studentCode',
      key: 'studentCode',
    },
    {
      title: 'Tên học viên',
      dataIndex: 'studentName',
      key: 'studentName',
      render: (_: any, record: ClassExamResultDetailEntity) => (
        <span
          style={{
            color: 'rgba(16, 24, 40, 1)',
            fontWeight: '500',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          {record.studentName}
        </span>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (_: any, record: ClassExamResultDetailEntity) => (
        <span
          style={{
            color: 'rgba(16, 24, 40, 1)',
            fontWeight: '500',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          {record.email}
        </span>
      ),
    },
    {
      title: 'Điểm',
      dataIndex: 'score',
      key: 'score',
      render: (_: any, record: any) =>
        record.point ? Math.round(record.point) : 'Chưa làm bài',
    },
    {
      title: 'Thời gian nộp',
      dataIndex: 'submitedTime',
      render: (_: any, record: any) => (
        <span>
          {record.submitedTime
            ? dayjs(record.submitedTime).local().format('DD/MM/YYYY HH:mm')
            : ''}
        </span>
      ),
      key: 'submitedTime',
    },
    {
      title: 'Cập nhật diểm',
      width: 150,
      render: (_: any, record: any) => (
        <Select
          style={{ width: '100%' }}
          placeholder="Cập nhật điểm"
          onChange={value =>
            handleChangeUpdateScore(record.studentId, record.studentName, value)
          }
          options={[
            { value: 1, label: 1 },
            { value: 2, label: 2 },
            { value: 3, label: 3 },
            { value: 4, label: 4 },
            { value: 5, label: 5 },
            { value: 6, label: 6 },
            { value: 7, label: 7 },
            { value: 8, label: 8 },
            { value: 9, label: 9 },
            { value: 10, label: 10 },
          ]}
        />
      ),
      key: 'updateScore',
    },
  ];

  return (
    classEdit && (
      <>
        <Card className="exam-result-page">
          <div className="header-class-manager-page">
            <Breadcrumb
              items={[
                {
                  title: 'Quản lý lớp học',
                },
                {
                  title: <Link to="/class-manager/class-room">Lớp học</Link>,
                },
                {
                  title: (
                    <Link to={`/class-manager/class-room/${id}`}>
                      {classEdit.name}
                    </Link>
                  ),
                },
                {
                  title: <span>Kết quả làm bài tập</span>,
                },
              ]}
            />
            <div className="flex items-center gap-2">
              <Button
                icon={<img src={ms_excel} alt="icon-excel" />}
                className="w-full"
                onClick={() => message.info('Chưa yêu cầu phát triển')}
              >
                Xuất bảng điểm
              </Button>
            </div>
          </div>

          <div className="mt-5">
            <span className="span-title">
              Kết quả làm bài tập lớp {classEdit.name}
            </span>
            <br />
            <br />
            <hr />
            {classEdit.courses && classEdit.courses?.length ? (
              <Tabs
                className="mt-5"
                defaultActiveKey={classEdit.courses?.[0]?.id}
                activeKey={activeCourseId}
                onChange={key => setActiveCourseId(key)}
                size="large"
                tabPosition="left"
              >
                {classEdit.courses.map(course => (
                  <Tabs.TabPane
                    tab={`Khoá học ${course.title}`}
                    key={course.id}
                  >
                    <Tabs
                      defaultActiveKey={activeTab}
                      activeKey={activeTab}
                      type="line"
                      onChange={key =>
                        setActiveTab(key as 'scores' | 'submitted')
                      }
                      tabBarExtraContent={
                        <Input
                          placeholder="Tìm kiếm"
                          style={{ width: 300 }}
                          value={query}
                          onChange={e => setQuery(e.target.value)}
                        />
                      }
                    >
                      <Tabs.TabPane tab="Bảng điểm" key="scores">
                        <Tabs
                          tabPosition="top"
                          size="middle"
                          type="line"
                          onChange={key => setExamActiveId(key)}
                        >
                          {exam_lesson.map(exam => (
                            <Tabs.TabPane tab={exam.examName} key={exam.examId}>
                              <Table
                                columns={getScoreColumns}
                                dataSource={filteredData}
                                rowKey="id"
                                pagination={false}
                                loading={loading === 'scores'}
                              />
                            </Tabs.TabPane>
                          ))}
                        </Tabs>
                      </Tabs.TabPane>

                      <Tabs.TabPane tab="Bài tập tự luận" key="submitted">
                        <Tabs
                          tabPosition="top"
                          size="middle"
                          type="line"
                          onChange={key => setExamActiveId(key)}
                        >
                          {exam.map(exam => (
                            <Tabs.TabPane tab={exam.name} key={exam.id}>
                              <Table
                                columns={submissionColumns}
                                dataSource={result}
                                rowKey="studentId"
                                pagination={false}
                                loading={loading === 'submitted'}
                              />
                            </Tabs.TabPane>
                          ))}
                        </Tabs>
                      </Tabs.TabPane>
                    </Tabs>
                  </Tabs.TabPane>
                ))}
              </Tabs>
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={<div>Không có khoá học nào</div>}
              />
            )}
          </div>
        </Card>
      </>
    )
  );
};

export default ExamResult;
