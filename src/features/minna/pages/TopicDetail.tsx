import {
  Breadcrumb,
  Button,
  Card,
  Empty,
  Input,
  message,
  Modal,
  Popover,
  Tooltip,
  Typography,
  Upload,
} from 'antd';
import './TopicDetail.scss';
import ms_excel from '#/assets/images/icon_button/ms_excel.png';
import {
  DeleteTwoTone,
  DownloadOutlined,
  EditTwoTone,
  SearchOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import VocabularyItem from '../components/vocabulary/VocabularyItem';
import ModalCreateUpdateVocabulary from '../components/modal/ModalCreateUpdateVocabulary';
import ModalCreateUpdateTopic from '../components/modal/ModalCreateUpdateTopic';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { deleteTopic, getOneTopic } from '#/src/redux/thunk/topic.thunk';
import { getAllVocab, ImportVocabExcel } from '#/src/redux/thunk/vocab.thunk';
import Loading from '#/shared/components/loading/Loading';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';
import { beforeUploadExcel } from '#/shared/props/beforeUpload';

const TopicDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { topicEdit } = useSelector((state: RootState) => state.topic);
  const { items, meta } = useSelector((state: RootState) => state.vocab.data);

  const [isOpenModalUpdateTopic, setIsOpenModalUpdateTopic] =
    useState<boolean>(false);
  const [isOpeModalCreateVocab, setIsOpenModalCreateVocab] = useState(false);
  const [pagination, setPagination] = useState({
    limit: 20, // Số item mỗi trang
    offset: 0, // Vị trí bắt đầu
    current: 1, // Trang hiện tại
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!id) return;
    setLoading(true);
    await Promise.all([
      dispatch(
        getAllVocab({
          id: id,
          limit: pagination.limit,
          offset: pagination.offset,
        }),
      ),
      dispatch(getOneTopic(id)),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [pagination]);

  const handleOpenCreateVocab = () => {
    setIsOpenModalCreateVocab(true);
  };

  const handleOpenUpdateTopic = () => {
    setIsOpenModalUpdateTopic(true);
  };

  const handleDeleteTopic = async () => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa chủ đề "${topicEdit?.name}"?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        if (!id) return;
        const result = await dispatch(deleteTopic(id));
        if (result.payload.statusCode === 200) {
          navigate('/minna');
        }
      },
      title: 'Xác nhận xóa',
    });
  };

  const handlePrev = () => {
    if (pagination.current > 1) {
      setPagination(prev => {
        return {
          ...prev,
          current: prev.current - 1,
          offset: prev.offset - prev.limit,
        };
      });
    }
  };

  const handleNext = () => {
    if (meta.totalPages && pagination.current < meta.totalPages) {
      setPagination(prev => {
        return {
          ...prev,
          current: prev.current + 1,
          offset: prev.offset + prev.limit,
        };
      });
    }
  };

  const handleDownloadSampleExcel = () => {
    const data = [
      {
        OriginText: 'せんせい',
        JapanesePronounce: 'sensei',
        VietnamesePronounce: 'Thầy cô giáo',
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Từ vựng mẫu');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    });

    saveAs(blob, 'mau_tu_vung.xlsx');
  };

  if (loading) return <Loading />;

  return (
    <>
      <ModalCreateUpdateVocabulary
        open={isOpeModalCreateVocab}
        onClose={setIsOpenModalCreateVocab}
      />

      <ModalCreateUpdateTopic
        open={isOpenModalUpdateTopic}
        onClose={setIsOpenModalUpdateTopic}
        itemUpdate={topicEdit}
      />

      <Card>
        <div className="topic-detail">
          <Breadcrumb
            items={[
              {
                title: <Link to="/minna">Minna</Link>,
              },
              {
                title: <Link to="/minna">Danh sách chủ đề</Link>,
              },
              {
                title: <Link to="#">{topicEdit?.name}</Link>,
              },
            ]}
          />
          <div className="content-topic-detail">
            <div className="title">
              <span className="span-title">Danh sách từ vựng</span>
              <div className="top-button">
                <Input
                  placeholder="Tìm kiếm"
                  className="input-search"
                  prefix={<SearchOutlined />}
                />

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
                        beforeUpload={beforeUploadExcel}
                        customRequest={async ({ file, onSuccess, onError }) => {
                          if (!file || !id) return;
                          try {
                            await dispatch(
                              ImportVocabExcel({ id: id, data: file as File }),
                            );
                          } catch (error) {
                            onError?.(error as Error);
                            message.error('Tải lên thất bại');
                          } finally {
                            fetchData();
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
                  <Button>
                    <img src={ms_excel} alt="icon-excel" />
                    Tải danh sách
                  </Button>
                </Popover>
                <Button onClick={handleOpenCreateVocab} type="primary">
                  Thêm mới từ vựng
                </Button>
              </div>
            </div>
            <div className="topic-overview">
              <img
                src={topicEdit?.image}
                className="image-topic"
                alt="image topic"
              />
              <h4>{topicEdit?.name}</h4>
              <Tooltip title="Cập nhật">
                <EditTwoTone
                  onClick={handleOpenUpdateTopic}
                  className="btn-edit-minna"
                />
              </Tooltip>
              <Tooltip title="Xoá">
                <DeleteTwoTone
                  onClick={e => {
                    e.stopPropagation(), handleDeleteTopic();
                  }}
                  className="delete-button btn-delete-minna"
                />
              </Tooltip>
            </div>
            {items?.length > 0 ? (
              <div className="list-vocabulary">
                {items?.map(item => (
                  <VocabularyItem item={item} key={item.id} />
                ))}
              </div>
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                styles={{ image: { height: 60 } }}
                description={
                  <Typography.Text>
                    Chưa có từ vựng nào của chủ đề này
                  </Typography.Text>
                }
              >
                <Button onClick={handleOpenCreateVocab} type="primary">
                  Tạo từ vựng ngay
                </Button>
              </Empty>
            )}
            <div className="bottom-current-button">
              <Button
                disabled={pagination.current === 1}
                onClick={handlePrev}
                style={{ opacity: pagination.current === 1 ? 0.5 : 1 }}
              >
                {'<'} Trang trước
              </Button>
              <span>
                Trang {pagination.current} trong {meta.totalPages}
              </span>
              <Button
                disabled={pagination.current === meta.totalPages}
                onClick={handleNext}
                style={{ opacity: pagination.current === 1 ? 0.5 : 1 }}
              >
                Trang sau {'>'}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default TopicDetail;
