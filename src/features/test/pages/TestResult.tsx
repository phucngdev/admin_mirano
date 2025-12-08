import { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Card,
  Input,
  Space,
  Tabs,
  Table,
  Row,
  Col,
  Statistic,
  Spin,
  Empty,
  Typography,
  message,
  Breadcrumb,
} from 'antd';
import {
  ExportOutlined,
  SearchOutlined,
  BarChartOutlined,
  TableOutlined,
} from '@ant-design/icons';
import { Column, Pie } from '@ant-design/charts';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { getAllTest } from '#/src/redux/thunk/test.thunk';
import { getTestCategory } from '#/src/redux/thunk/test-category.thunk';
import { useSelector } from 'react-redux';
import Loading from '#/shared/components/loading/Loading';
import { getAllTestResult } from '#/src/redux/thunk/test-result.thunk';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { exportScoreTestResultService } from '#/api/services/testResultService';
import DrawerExport from '../components/drawer/DrawerExport';

const { Text } = Typography;

const TestResult = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, dataTest, testRessult } = useSelector(
    (state: RootState) => state.test,
  );

  const [open, setOpen] = useState<'drawer' | ''>('');
  const [selectedTestCategoryId, setSelectedTestCategoryId] = useState('');
  const [selectedTestId, setSelectedTestId] = useState('');
  const [viewMode, setViewMode] = useState<'scores' | 'statistics'>('scores');
  const [loading, setLoading] = useState<
    'test-category' | 'test' | 'result' | ''
  >('');
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
    current: 1,
  });

  const handleTableChange = (pagination: any) => {
    const { current, pageSize } = pagination;

    setPagination(prev => ({
      ...prev,
      current,
      limit: pageSize,
      offset: (current - 1) * pageSize,
    }));
  };

  const fetchDataTestCategory = async () => {
    setLoading('test-category');
    dispatch(
      getTestCategory({
        limit: 100,
        offset: 0,
      }),
    );
    setLoading('');
  };

  useEffect(() => {
    fetchDataTestCategory();
  }, []);

  const fetchDataTest = async () => {
    setLoading('test');
    await dispatch(
      getAllTest({
        categoryId: selectedTestCategoryId,
        limit: 100,
        offset: 0,
      }),
    );
    setLoading('');
  };

  useEffect(() => {
    fetchDataTest();
  }, [selectedTestCategoryId]);

  useEffect(() => {
    if (data && data.items.length) {
      setSelectedTestCategoryId(data.items[0].id);
    }
  }, [data]);

  const fetchDataRsult = async () => {
    if (!selectedTestId) return;
    setLoading('result');
    await dispatch(
      getAllTestResult({
        testId: selectedTestId,
      }),
    );
    setLoading('');
  };

  useEffect(() => {
    fetchDataRsult();
  }, [selectedTestId]);

  const getScoreColumns = [
    { title: 'Mã học viên', dataIndex: 'userCode', key: 'userCode' },
    { title: 'Tên học viên', dataIndex: 'userName', key: 'userName' },
    {
      title: 'Số lần làm',
      dataIndex: 'totalAttempts',
      key: 'totalAttempts',
      render: (_: any, record: any) => record.totalAttempts,
    },
    {
      title: 'Điểm',
      key: 'scores',
      render: (_: any, record: any) => {
        return (
          <div>
            {record.allScores.map((score: number, index: number) => (
              <div key={index}>
                Lần {index + 1}: <strong>{score}</strong>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      title: 'Trung bình',
      dataIndex: 'averageScore',
      key: 'averageScore',
      render: (score: number) => <strong>{score ?? '—'}</strong>,
    },
    {
      title: 'Thời gian nộp',
      dataIndex: 'allSubmittedTimes',
      key: 'allSubmittedTimes',
      render: (date: any[]) => {
        return (
          <div>
            {date.map((time: number, index: number) => (
              <div key={index}>
                Lần {index + 1}:{' '}
                <strong>{new Date(time).toLocaleString('vi-VN')}</strong>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      key: 'action',
      render: (__: any, record: any) => (
        <Text
          strong
          style={{ color: '#1890ff', cursor: 'pointer' }}
          onClick={() => {
            localStorage.setItem(
              `${record.userId}-${selectedTestId}`,
              JSON.stringify({
                userCode: record.userCode,
                userName: record.userName,
                totalAttempts: record.totalAttempts,
              }),
            );
            navigate(`/test/test-result/${selectedTestId}/${record.userId}`);
          }}
        >
          Xem chi tiết
        </Text>
      ),
    },
  ];

  if (loading === 'test-category') return <Loading />;
  if (loading === 'test') return <Spin fullscreen />;

  return (
    <>
      <DrawerExport
        open={open === 'drawer'}
        onClose={() => {
          setOpen('');
        }}
      />
      <div className="test-result space-y-4">
        <Card>
          <Breadcrumb
            items={[
              {
                title: 'Quản lý thi thử',
              },
              {
                title: <Link to="/test">Kết quả thi thử</Link>,
              },
            ]}
          />
          <div className="flex justify-between items-center mb-4 mt-5">
            <h3 style={{ fontSize: '20px' }}>Danh sách kết quả thi thử</h3>
            {/* <Space>
            <Input
              allowClear
              placeholder="Tìm kiếm..."
              prefix={<SearchOutlined />}
              onChange={e => setQuery(e.target.value)}
              value={query}
              disabled
            />
            <Button icon={<ExportOutlined />} disabled type="primary">
              Xuất bảng điểm
            </Button>
          </Space> */}
          </div>

          <Tabs
            className="mt-5"
            activeKey={selectedTestCategoryId}
            onChange={setSelectedTestCategoryId}
            size="large"
            tabPosition="left"
          >
            {data.items.map(exam => (
              <Tabs.TabPane tab={exam.name} key={exam.id}>
                <div className="mb-4 flex items-center justify-between">
                  <Space>
                    <Button
                      type={viewMode === 'scores' ? 'primary' : 'default'}
                      icon={<TableOutlined />}
                      onClick={() => setViewMode('scores')}
                    >
                      Bảng điểm
                    </Button>
                    <Button
                      type={viewMode === 'statistics' ? 'primary' : 'default'}
                      icon={<BarChartOutlined />}
                      disabled
                      onClick={() => setViewMode('statistics')}
                    >
                      Thống kê
                    </Button>
                  </Space>
                  <Button
                    icon={<ExportOutlined />}
                    onClick={() => setOpen('drawer')}
                  >
                    Xuất bảng điểm
                  </Button>
                </div>
                {viewMode === 'scores' ? (
                  dataTest && dataTest.items.length ? (
                    <Tabs
                      activeKey={selectedTestId}
                      onChange={setSelectedTestId}
                      tabPosition="top"
                      size="middle"
                      type="line"
                    >
                      {dataTest?.items.map(test => (
                        <Tabs.TabPane tab={test.name} key={test.id}>
                          <Table
                            columns={getScoreColumns}
                            dataSource={testRessult || []}
                            rowKey="id"
                            pagination={{
                              pageSize: pagination.limit,
                              showSizeChanger: true,
                              showTotal: total => `Tổng số ${total} bài thi`,
                              total: testRessult?.length,
                            }}
                            onChange={handleTableChange}
                          />
                        </Tabs.TabPane>
                      ))}
                    </Tabs>
                  ) : (
                    <>
                      <Empty />
                    </>
                  )
                ) : (
                  <></>
                )}
              </Tabs.TabPane>
            ))}
          </Tabs>
        </Card>
      </div>
    </>
  );
};

export default TestResult;
