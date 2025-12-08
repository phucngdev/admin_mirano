import { TopicEntity } from '#/api/requests';
import { Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';

interface TopicItemProps {
  topic: TopicEntity;
}

const TopicItem = ({ topic }: TopicItemProps) => {
  const navigate = useNavigate();
  const handleEdit = (id: string) => {
    navigate(`/minna/topic/${id}`);
  };

  return (
    <>
      <Tooltip title={topic.name} color="#1677ff">
        <div className="topic-item" onClick={() => handleEdit(topic.id)}>
          <div className="topic-image">
            <img src={topic.image} alt={topic.name} />
          </div>
          <div className="info-topic">
            <div className="name-topic">
              <h4>{topic.name}</h4>
              <p>{topic.count} Từ vựng</p>
            </div>
          </div>
        </div>
      </Tooltip>
    </>
  );
};

export default TopicItem;
