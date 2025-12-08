import { Breadcrumb, Button, Card, Empty, Input, Typography } from 'antd';
import './Minna.scss';
import { useEffect, useState } from 'react';
import ModalCreateUpdateTopic from '../components/modal/ModalCreateUpdateTopic';
import { SearchOutlined } from '@ant-design/icons';
import { getAllTopic } from '#/src/redux/thunk/topic.thunk';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { useSelector } from 'react-redux';
import TopicItem from '../components/topic/TopicItem';
import { Link } from 'react-router-dom';
import { TopicEntity } from '#/api/requests';
import Loading from '#/shared/components/loading/Loading';

const MinnaTopic = () => {
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => state.topic.data);

  const [topic, setTopic] = useState<TopicEntity[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    limit: 20,
    offset: 0,
    current: 1,
  });

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    await dispatch(
      getAllTopic({
        limit: pagination.limit,
        offset: pagination.offset,
        query: query,
      }),
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [pagination, query]);

  useEffect(() => {
    if (data && data?.items) {
      setTopic(data.items);
    }
  }, [data]);

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
    if (
      data &&
      data.meta.totalPages &&
      pagination.current < data.meta.totalPages
    ) {
      setPagination(prev => {
        return {
          ...prev,
          current: prev.current + 1,
          offset: prev.offset + prev.limit,
        };
      });
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <ModalCreateUpdateTopic open={isOpenModal} onClose={setIsOpenModal} />
      <Card>
        <div className="minna-topic">
          <Breadcrumb
            items={[
              {
                title: <Link to="/minna">Minna</Link>,
              },
              {
                title: <Link to="/minna">Danh sách chủ đề</Link>,
              },
            ]}
          />
          <div className="content-topic">
            <div className="title">
              <span className="span-title">Danh sách chủ đề</span>
              <div className="top-button">
                <Input
                  placeholder="Tìm kiếm chủ đề"
                  className="input-search"
                  prefix={<SearchOutlined />}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
                {/* <UploadExcel /> */}
                <Button onClick={() => setIsOpenModal(true)} type="primary">
                  Thêm mới chủ đề
                </Button>
              </div>
            </div>
            {topic.length > 0 ? (
              <div className="list-topic">
                {topic.map(topic => (
                  <TopicItem key={topic.id} topic={topic} />
                ))}
              </div>
            ) : query ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                styles={{ image: { height: 60 } }}
                description={
                  <Typography.Text>
                    Không có chủ đề nào chứa ký tự "{query}"
                  </Typography.Text>
                }
              ></Empty>
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                styles={{ image: { height: 60 } }}
                description={
                  <Typography.Text>Chưa có chủ đề nào</Typography.Text>
                }
              >
                <Button onClick={() => setIsOpenModal(true)} type="primary">
                  Tạo chủ đề ngay
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
                Trang {pagination.current} trong {data?.meta?.totalPages}
              </span>
              <Button
                disabled={pagination.current === data?.meta?.totalPages}
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

export default MinnaTopic;
