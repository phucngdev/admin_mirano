import { useEffect, useState } from 'react';
import './index.scss';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Collapse,
  Empty,
  Form,
  Input,
  message,
  Modal,
  Popover,
  Result,
  Row,
  Tooltip,
  Upload,
} from 'antd';
import {
  DeleteOutlined,
  DeleteTwoTone,
  ImportOutlined,
  MenuOutlined,
  PlusOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import FormTestExam from '../components/form/FormTestExam';
import {
  createTestDetail,
  deleteTestDetail,
  getAllTestDetail,
} from '#/src/redux/thunk/test-detail.thunk';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TestDetailEntity } from '#/api/requests';
import { QuestionGroupEntity } from '#/api/requests/models/QuestionGroupEntity';
import ModalSelectGroup from '../components/modal/ModalSelectGroup';
import { Tool } from '#/shared/utils';
import Cookies from 'js-cookie';
import { deleteQuestionGroupReferenceService } from '#/api/services/questionGroupReference';
import Loading from '#/shared/components/loading/Loading';
import ReadOnlyCK from '#/shared/components/ckeditor/ReadOnlyCK';
import Tree, { DataNode, TreeProps } from 'antd/es/tree';
import { updateTestDetailService } from '#/api/services/testDetailService';

const ExamTest = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { testDetail, testEdit } = useSelector(
    (state: RootState) => state.test,
  );

  const [openModal, setOpenModal] = useState(false);
  const [selectdItem, setSelectditem] = useState<TestDetailEntity | null>(null);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<TestDetailEntity[]>([]);

  useEffect(() => {
    if (testDetail) {
      setDetails(testDetail.items[0]?.details as TestDetailEntity[]);
    }
  }, [testDetail]);

  const treeData: DataNode[] = details
    ?.slice()
    ?.sort((a, b) => a.pos - b.pos)
    ?.map(item => ({
      key: item.id,
      title: (
        <div
          className={`px-2 py-3 rounded cursor-pointer ${
            selectdItem && selectdItem.id === item.id ? ' text-blue-600' : ''
          }`}
          onClick={() => setSelectditem(item)}
        >
          <span>{item.name}</span>
        </div>
      ),
    }));

  const onDrop: TreeProps['onDrop'] = async info => {
    const dragKey = info.dragNode.key as string;
    const dropKey = info.node.key as string;
    const dropPosition = info.dropPosition;
    const dropToGap = info.dropToGap; // true nếu thả vào giữa các node

    const data = [...details];
    const dragIndex = data.findIndex(d => d.id === dragKey);
    const dropIndex = data.findIndex(d => d.id === dropKey);

    if (dragIndex === -1 || dropIndex === -1) return;

    const draggedItem = data[dragIndex];

    let newPosition = draggedItem.pos;

    if (dropToGap) {
      // Trường hợp thả vào khoảng trống giữa các node
      if (dropPosition === 0 || dropPosition === -1) {
        // Thả lên đầu
        const first = data[0];
        newPosition = first ? first.pos - 1 : 0;
      } else if (dropPosition === data.length) {
        // Thả xuống cuối
        const last = data[data.length - 1];
        newPosition = last ? last.pos + 1 : 0;
      } else {
        // Thả vào giữa 2 node
        const before = data[dropIndex];
        const after = data[dropIndex + 1];
        if (before && after) {
          newPosition = (before.pos + after.pos) / 2;
        }
      }
    } else {
      // Thả trực tiếp vào node (cùng vị trí)
      const dropItem = data[dropIndex];
      newPosition = dropItem.pos + 0.5;
    }

    // Cập nhật position của draggedItem
    const updatedItem = { ...draggedItem, pos: newPosition };

    // Xoá item cũ và chèn lại vào danh sách
    data.splice(dragIndex, 1);
    data.splice(dropIndex, 0, updatedItem);

    setDetails(data);
    try {
      await updateTestDetailService(draggedItem.id, {
        ...draggedItem,
        pos: newPosition,
      });
    } catch (error) {
      setDetails(testDetail.items[0]?.details as TestDetailEntity[]);
    }
  };

  const fetchData = async () => {
    if (!id) return;
    setLoading(true);
    await dispatch(
      getAllTestDetail({
        testId: id,
      }),
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleCreateTestDetail = async () => {
    if (!id) return;
    const newTestDetail = {
      name: 'Phần thi mới',
      testId: id,
      timeLimit: 0,
      point: 0,
    };
    const result = await dispatch(createTestDetail(newTestDetail));
    if (result.payload.statusCode === 201) {
      message.success('Thêm thành công');
      setSelectditem(result.payload.data);
    } else {
      message.error('Thêm thất bại');
    }
  };

  const handleDeleteQuestionGroup = (item: QuestionGroupEntity) => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa nhóm câu hỏi?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        if (!selectdItem) return;
        const result = await deleteQuestionGroupReferenceService(
          selectdItem.id,
          item.id,
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

  const handleDeleteTestDetail = () => {
    if (selectdItem)
      Modal.confirm({
        cancelText: 'Hủy',
        content: `Bạn có chắc chắn muốn xóa phần thi ${selectdItem.name}?`,
        okText: 'Xóa',
        okType: 'danger',
        onOk: async () => {
          const result = await dispatch(deleteTestDetail(selectdItem.id));
          if (result.payload.statusCode === 200) {
            message.success('Xoá thành công');
            setSelectditem(null);
          } else {
            message.error('Xoá thất bại');
          }
        },
        title: 'Xác nhận xóa',
      });
  };

  if (loading) return <Loading />;

  return (
    <>
      <ModalSelectGroup
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          fetchData();
        }}
        itemUpdate={selectdItem}
      />
      <div className="exam-test">
        <Card style={{ marginBottom: '16px' }}>
          <div className="exam-test-header">
            <Breadcrumb
              items={[
                {
                  title: 'Quản lý thi thử',
                },
                {
                  title: <Link to="/test">Danh sách bài thi thử</Link>,
                },
                {
                  title: (
                    <Link
                      to={`/test/${testEdit?.id ?? JSON.parse(Cookies.get('test-active') ?? '').id}`}
                    >
                      {testEdit?.name ??
                        JSON.parse(Cookies.get('test-active') ?? '').name}
                    </Link>
                  ),
                },
                {
                  title: <span>{testDetail?.items[0]?.testId?.name}</span>,
                },
              ]}
            />
            <Button></Button>
          </div>
        </Card>
        <div className="exam-test-content">
          <div className="content-left-exam">
            <div className="header-list-exam">
              Danh sách phần thi <br />
              <div className="header-list-total">
                {testDetail?.meta.total || 0}
              </div>
            </div>
            <div className="content-list-exam">
              {testDetail?.items ? (
                // testDetail?.items[0]?.details.map(item => (
                //   <Button
                //     onClick={() => setSelectditem(item as TestDetailEntity)}
                //     type={
                //       selectdItem && selectdItem.id === item.id
                //         ? 'primary'
                //         : 'default'
                //     }
                //     className="item-exam"
                //   >
                //     {item.name}
                //   </Button>
                // ))
                <Tree draggable blockNode treeData={treeData} onDrop={onDrop} />
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </div>
            <div className="bottom-lisst-exam">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleCreateTestDetail}
              >
                Thêm phần thi
              </Button>
            </div>
          </div>
          <div className="content-right-exam">
            {selectdItem ? (
              <>
                <div className="content-right-top">
                  <FormTestExam selectdItem={selectdItem} />
                  <Button
                    type="default"
                    onClick={() => setOpenModal(true)}
                    icon={<PlusOutlined />}
                  >
                    Thêm nhóm câu hỏi
                  </Button>
                  <div className="list-questions">
                    <Collapse defaultActiveKey={['1']} expandIconPosition="end">
                      {testDetail.items[0].details
                        .find(item => item.id === selectdItem.id)
                        ?.questionGroups?.map((item, index) => (
                          <Collapse.Panel
                            header={
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}
                              >
                                <span>Chi tiết nhóm câu hỏi {index + 1}</span>
                                <Button
                                  danger
                                  icon={
                                    <DeleteTwoTone twoToneColor="#f33832" />
                                  }
                                  onClick={() => {
                                    handleDeleteQuestionGroup(item);
                                  }}
                                >
                                  Xoá
                                </Button>
                              </div>
                            }
                            key={`question-${item.id}`}
                          >
                            <Row gutter={16}>
                              {item.imageUrl && (
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
                                          name: item.imageUrl,
                                          status: 'done',
                                          url: item.imageUrl,
                                        },
                                      ]}
                                    ></Upload>
                                  </Form.Item>
                                </Col>
                              )}
                              {item.audioUrl && (
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
                                          name: item.audioUrl,
                                          status: 'done',
                                          url: item.audioUrl,
                                        },
                                      ]}
                                      listType="picture"
                                    ></Upload>
                                  </Form.Item>
                                </Col>
                              )}
                            </Row>
                            <Form layout="vertical">
                              <div key={item.id} className="mb-4">
                                <Form.Item label={`Nội dung câu hỏi`}>
                                  <ReadOnlyCK value={item.content} />
                                </Form.Item>
                                <Collapse
                                  defaultActiveKey={['1']}
                                  expandIconPosition="end"
                                >
                                  {item.questions?.map(
                                    (qs: any, idx2: number) => (
                                      <Collapse.Panel
                                        header={
                                          <div
                                            style={{
                                              display: 'flex',
                                              justifyContent: 'space-between',
                                              alignItems: 'center',
                                            }}
                                          >
                                            <span>
                                              Chi tiết câu hỏi {idx2 + 1}
                                            </span>
                                          </div>
                                        }
                                        key={`question-${qs.id}`}
                                      >
                                        <Form layout="vertical">
                                          <div key={qs.id} className="mb-4">
                                            <Form.Item
                                              label={`Câu hỏi ${idx2 + 1}`}
                                            >
                                              <ReadOnlyCK value={qs.content} />
                                            </Form.Item>
                                            <div className="list-answer">
                                              {qs.multipleChoiceAnswers.map(
                                                (ans: any, idx: number) => (
                                                  <Form.Item key={idx}>
                                                    <Input
                                                      value={ans.content}
                                                      readOnly
                                                      className={`custom-input ${ans.isCorrect ? 'isCorrect' : 'unCorrect'}`}
                                                    />
                                                  </Form.Item>
                                                ),
                                              )}
                                            </div>
                                            {qs.explain && (
                                              <Form.Item label="Giải thích">
                                                <ReadOnlyCK
                                                  value={qs.explain}
                                                />
                                              </Form.Item>
                                            )}
                                          </div>
                                        </Form>
                                      </Collapse.Panel>
                                    ),
                                  )}
                                </Collapse>
                              </div>
                            </Form>
                          </Collapse.Panel>
                        ))}
                    </Collapse>
                  </div>
                </div>
                <div className="btn-delete-wrapper">
                  <Button
                    type="primary"
                    className="btn-delete-bottom-exam"
                    danger
                    onClick={handleDeleteTestDetail}
                    icon={<DeleteOutlined />}
                  >
                    Xoá phần thi
                  </Button>
                </div>
              </>
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                }}
                className=""
              >
                <Result
                  icon={<SmileOutlined />}
                  title="Tuyệt, hãy bắt đầu tạo phần thi ngay nào!"
                  extra={
                    <Button type="primary" onClick={handleCreateTestDetail}>
                      Thêm phần thi
                    </Button>
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamTest;
