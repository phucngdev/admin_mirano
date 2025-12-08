import { TestResultUserDetailWithoutTestEntity } from '#/api/requests';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import {
  getAttempts,
  getTestResultDetail,
} from '#/src/redux/thunk/test-result.thunk';
import {
  CheckCircleTwoTone,
  CheckOutlined,
  ClockCircleOutlined,
  CloseCircleTwoTone,
  ExportOutlined,
} from '@ant-design/icons';
import {
  Badge,
  Breadcrumb,
  Button,
  Card,
  Col,
  Collapse,
  Dropdown,
  List,
  Menu,
  message,
  Row,
  Space,
  Spin,
  Tabs,
} from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const { Panel } = Collapse;

const ResultDetail = () => {
  const { testId, userId } = useParams();
  const dispatch = useAppDispatch();
  const { testRessultByTestIdAndUserId, testResultDetail } = useSelector(
    (state: RootState) => state.test,
  );

  const [loading, setLoading] = useState<'result-detail' | 'result' | ''>('');
  const [selectedTestResultId, setSelectedTestResultId] = useState('');

  const userActive = useMemo(() => {
    const userLocal = localStorage.getItem(`${userId}-${testId}`);
    if (userLocal) return JSON.parse(userLocal);
  }, [testId, userId]);

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
  }, [selectedTestResultId]);

  useEffect(() => {
    if (testRessultByTestIdAndUserId.length > 0) {
      setSelectedTestResultId(testRessultByTestIdAndUserId[0].testResultId);
    }
  }, [testRessultByTestIdAndUserId]);

  const fetchDataAttemple = async () => {
    if (!userId || !testId) return;
    try {
      setLoading('result');
      await dispatch(getAttempts({ testId, userId }));
    } catch (error) {
      console.log('🚀 ~ fetchDataAttemple ~ error:', error);
      message.error('Không lấy được dữ liệu');
    } finally {
      setLoading('');
    }
  };

  const fetchDataResult = async () => {
    if (!selectedTestResultId) return;
    try {
      setLoading('result-detail');
      await dispatch(getTestResultDetail(selectedTestResultId));
    } catch (error) {
      console.log('🚀 ~ fetchDataAttemple ~ error:', error);
      message.error('Không lấy được dữ liệu');
    } finally {
      setLoading('');
    }
  };

  useEffect(() => {
    fetchDataAttemple();
  }, [userId, testId]);

  useEffect(() => {
    fetchDataResult();
  }, [selectedTestResultId]);

  const handleMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'all':
        message.success('Xuất tất cả dữ liệu...');
        break;
      case 'attempt1':
        message.success('Xuất dữ liệu lần thi 1...');
        break;
      case 'attempt2':
        message.success('Xuất dữ liệu lần thi 2...');
        break;
      case 'attempt3':
        message.success('Xuất dữ liệu lần thi 3...');
        break;
      default:
        break;
    }
  };

  const ExportMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="all">Xuất tất cả</Menu.Item>
      <Menu.SubMenu key="byAttempt" title="Xuất theo lần thi">
        <Menu.Item key="attempt1">Lần thi 1</Menu.Item>
        <Menu.Item key="attempt2">Lần thi 2</Menu.Item>
        <Menu.Item key="attempt3">Lần thi 3</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  const getBadgeColor = (score: number) => {
    if (score >= 150) return '#722ed1';
    if (score >= 120) return '#1890ff';
    if (score >= 90) return '#13c2c2';
    if (score >= 60) return '#52c41a';
    return '#ff4d4f';
  };

  if (loading !== '') return <Spin fullscreen />;

  return (
    <>
      <div className="test-result-detail space-y-4">
        <Card>
          <Breadcrumb
            items={[
              {
                title: 'Quản lý thi thử',
              },
              {
                title: <Link to="/test/test-result">Kết quả thi thử</Link>,
              },
              {
                title: <span>Chi tiết học viên</span>,
              },
              {
                title: <span>{userActive?.userName}</span>,
              },
            ]}
          />
          <div className="flex justify-between items-center mb-4 mt-5">
            <h3 style={{ fontSize: '20px' }}>
              Danh sách kết quả thi - bài thi thử 1
            </h3>
            <Space>
              <Dropdown
                arrow
                placement="bottomRight"
                overlay={ExportMenu}
                trigger={['click']}
              >
                <Button icon={<ExportOutlined />} type="primary" ghost>
                  Xuất kết quả
                </Button>
              </Dropdown>
            </Space>
          </div>

          <Tabs
            className="mt-5"
            activeKey={selectedTestResultId || undefined}
            onChange={setSelectedTestResultId}
            size="large"
            tabPosition="left"
          >
            {[...testRessultByTestIdAndUserId]
              ?.reverse()
              ?.map((result, index) => (
                <Tabs.TabPane
                  tab={
                    <>
                      <Space direction="vertical" className="items-start gap-0">
                        <span className="">{`Lần thi ${index + 1} - ${result.score}`}</span>
                        <span className="text-xs">
                          {new Date(result.createdAt).toLocaleString('vi-VN')}
                        </span>
                      </Space>
                    </>
                  }
                  key={result.testResultId}
                >
                  <Row gutter={[16, 16]} className="">
                    <Col span={12}>
                      <div className="flex flex-col gap-2 mb-6">
                        <div className="text-lg font-semibold">
                          Thông tin học viên
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-[120px]">Mã học viên:</div>
                          <div className="">{userActive?.userCode}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-[120px]">Tên học viên:</div>
                          <div className="">{userActive?.userName}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-[120px]">Số lần làm:</div>
                          <div className="">{userActive?.totalAttempts}</div>
                        </div>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="flex flex-col gap-2 mb-6">
                        <div className="text-lg font-semibold">
                          Thông tin bài làm
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-[170px]">
                            Thời gian làm bài (phút):{' '}
                          </div>
                          <Badge
                            count={`Chưa yêu cầu / ${testResultDetail?.totalTimeLimit}`}
                            style={{
                              backgroundColor: '#ff4d4f',
                              fontSize: '14px',
                              borderRadius: '12px',
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-[170px]">Điểm bài thi: </div>
                          <Badge
                            count={`${testResultDetail?.score} / ${testResultDetail?.totalScore}`}
                            style={{
                              backgroundColor: getBadgeColor(120),
                              fontSize: '14px',
                              borderRadius: '12px',
                            }}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-lg font-semibold mb-2">
                    Chi tiết bài làm
                  </div>
                  <Collapse accordion style={{ borderRadius: 0 }}>
                    {testResultDetail?.testResult?.map(
                      (exam: TestResultUserDetailWithoutTestEntity) => (
                        <Panel
                          key={exam.id}
                          showArrow={false}
                          className={
                            exam.correctCount === exam.totalQuestions
                              ? 'bg-white hover:bg-opacity-45'
                              : 'bg-red-100 hover:bg-opacity-45'
                          }
                          style={{
                            borderRadius: 0,
                            borderLeft: `${exam.correctCount === exam.totalQuestions ? '4px solid #2fa377' : '4px solid #de4c52'}`,
                          }}
                          header={
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                              }}
                            >
                              <Space size="large" className="flex-1">
                                {exam.correctCount === exam.totalQuestions ? (
                                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                                ) : (
                                  <CloseCircleTwoTone twoToneColor="#ff4d4f" />
                                )}
                                <div
                                  style={{
                                    fontWeight: 500,
                                    minWidth: 350,
                                  }}
                                >
                                  {exam.name}
                                </div>
                                <div className="w-[200px]">
                                  <ClockCircleOutlined /> Thời gian làm:{' '}
                                  {exam.timeLimit} phút
                                </div>
                                <div>
                                  <CheckOutlined /> Điểm/câu: {exam.point}
                                </div>
                              </Space>

                              <Badge
                                count={`${exam.correctCount} / ${exam.totalQuestions}`}
                                style={{
                                  backgroundColor:
                                    exam.correctCount === exam.totalQuestions
                                      ? '#52c41a'
                                      : '#ff4d4f',
                                  fontSize: '14px',
                                  borderRadius: '12px',
                                }}
                              />
                            </div>
                          }
                        >
                          <Collapse accordion style={{ borderRadius: 0 }}>
                            {exam.questionGroups.map(group => (
                              <Panel
                                key={group.id}
                                showArrow={false}
                                className={
                                  exam.correctCount === exam.totalQuestions
                                    ? 'bg-white hover:bg-opacity-45'
                                    : 'bg-red-100 hover:bg-opacity-45'
                                }
                                style={{
                                  borderRadius: 0,
                                  borderLeft: `${exam.correctCount === exam.totalQuestions ? '4px solid #2fa377' : '4px solid #de4c52'}`,
                                }}
                                header={
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'start',
                                      justifyContent: 'space-between',
                                      width: '100%',
                                      gap: 24,
                                    }}
                                  >
                                    <Space
                                      size="large"
                                      className="flex-1 items-start"
                                    >
                                      {exam.correctCount ===
                                      exam.totalQuestions ? (
                                        <CheckCircleTwoTone twoToneColor="#52c41a" />
                                      ) : (
                                        <CloseCircleTwoTone twoToneColor="#ff4d4f" />
                                      )}
                                      <div
                                        style={{ fontWeight: 500 }}
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            group?.content ||
                                            'Nhóm câu hỏi không có nội dung',
                                        }}
                                      ></div>
                                    </Space>
                                    <Space direction="vertical">
                                      <Badge
                                        count={`Đúng ${group.correctCountQuestionGroup} / ${group.numberOfQuestions}`}
                                        style={{
                                          backgroundColor:
                                            group.correctCountQuestionGroup ===
                                            group.numberOfQuestions
                                              ? '#52c41a'
                                              : '#ff4d4f',
                                          fontSize: '14px',
                                          borderRadius: '12px',
                                        }}
                                      />
                                      <Badge
                                        count={`Điểm: ${group.correctCountQuestionGroup * exam.point}`}
                                        style={{
                                          backgroundColor:
                                            group.correctCountQuestionGroup ===
                                            group.numberOfQuestions
                                              ? '#52c41a'
                                              : '#ff4d4f',
                                          fontSize: '14px',
                                          borderRadius: '12px',
                                        }}
                                      />
                                    </Space>
                                  </div>
                                }
                              >
                                <List
                                  dataSource={group.questions}
                                  renderItem={(question, idxq) => (
                                    <>
                                      <List.Item>
                                        <Space
                                          direction="vertical"
                                          className="w-full"
                                        >
                                          <div
                                            style={{ fontWeight: 500 }}
                                            dangerouslySetInnerHTML={{
                                              __html: `${idxq + 1} - ${
                                                question?.content ||
                                                'Câu hỏi không có nội dung'
                                              }`,
                                            }}
                                          ></div>
                                          <div className="flex gap-6 items-center justify-between">
                                            <div className="flex-1">
                                              <span>Đấp án đúng</span>
                                              {question.correctAnswers.map(
                                                (cr, idx) => (
                                                  <div
                                                    key={idx}
                                                    className="bg-green-100 p-3 rounded-sm mb-1"
                                                  >
                                                    {'content' in cr &&
                                                      cr.content}
                                                  </div>
                                                ),
                                              )}
                                            </div>
                                            <div className="flex-1">
                                              <span>Học viên chọn</span>
                                              {question.userAnswers.length >
                                              0 ? (
                                                question.userAnswers.map(
                                                  (ua, idx) => (
                                                    <div
                                                      key={idx}
                                                      className={`${'isCorrect' in ua && ua.isCorrect ? 'bg-green-100' : 'bg-red-100'} p-3 rounded-sm mb-1`}
                                                    >
                                                      {'content' in ua &&
                                                        ua.content}
                                                    </div>
                                                  ),
                                                )
                                              ) : (
                                                <div
                                                  className={`bg-red-100 p-3 rounded-sm`}
                                                >
                                                  Chưa chọn đáp án
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </Space>
                                      </List.Item>
                                    </>
                                  )}
                                />
                              </Panel>
                            ))}
                          </Collapse>
                        </Panel>
                      ),
                    )}
                  </Collapse>
                </Tabs.TabPane>
              ))}
          </Tabs>
        </Card>
      </div>
    </>
  );
};

export default ResultDetail;
