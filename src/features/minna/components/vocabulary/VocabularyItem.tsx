import { DeleteOutlined } from '@ant-design/icons';
import { message, Modal } from 'antd';
import { useState } from 'react';
import ModalCreateUpdateVocabulary from '../modal/ModalCreateUpdateVocabulary';
import { useAppDispatch } from '#/src/redux/store/store';
import { deleteVocab, getAllVocab } from '#/src/redux/thunk/vocab.thunk';
import { useParams } from 'react-router-dom';
import { TopicVocabEntity } from '#/api/requests';

interface VocabularyItemProps {
  item: TopicVocabEntity;
}

const VocabularyItem = ({ item }: VocabularyItemProps) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [isOpeModal, setIsOpenModal] = useState(false);
  const handleOpen = () => {
    setIsOpenModal(true);
  };

  const handleDeleteVocab = async () => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa từ vựng "${item?.originText}"?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        if (!id) return;
        const result = await dispatch(deleteVocab(item.id));
        if (result.payload.statusCode === 200) {
          message.success('Xoá thành công');
          await dispatch(
            getAllVocab({
              id: id,
              limit: 20,
              offset: 0,
            }),
          );
        }
      },
      title: 'Xác nhận xóa',
    });
  };

  return (
    <>
      <ModalCreateUpdateVocabulary
        open={isOpeModal}
        onClose={setIsOpenModal}
        itemUpdate={item}
      />
      <div className="vocabulary-item" onClick={() => handleOpen()}>
        <div className="head-top">
          <h4 className="vocabulary-detail">{item.originText}</h4>
          <DeleteOutlined
            onClick={e => {
              e.stopPropagation();
              handleDeleteVocab();
            }}
            className="delete-button"
          />
        </div>

        <div className="transcription">
          <p>{item.japanesePronounce}</p>
        </div>
        <div className="transcription">
          <p>{item.vietnamesePronounce}</p>
        </div>
      </div>
    </>
  );
};

export default VocabularyItem;
