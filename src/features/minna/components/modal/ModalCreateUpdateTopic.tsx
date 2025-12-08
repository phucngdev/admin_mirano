import {
  CloseOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { message, Upload, Button, Modal, Input } from 'antd';
import type { UploadFile } from 'antd';
import { useEffect, useState } from 'react';
import './index.scss';
import {
  createTopic,
  getAllTopic,
  getOneTopic,
  updateTopic,
} from '#/src/redux/thunk/topic.thunk';
import { useAppDispatch } from '#/src/redux/store/store';
import { useParams } from 'react-router-dom';
import { uploadFileToS3 } from '#/api/services/uploadS3';
import { beforeUploadImage } from '#/shared/props/beforeUpload';
import { TopicEntity } from '#/api/requests';

interface ModalCreateUpdateTopicProps {
  open: boolean;
  onClose: (prev: boolean) => void;
  itemUpdate?: TopicEntity | null;
}

const ModalCreateUpdateTopic = ({
  open,
  onClose,
  itemUpdate,
}: ModalCreateUpdateTopicProps) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);
  const [topicName, setTopicname] = useState('');

  useEffect(() => {
    if (itemUpdate) {
      setTopicname(itemUpdate.name);
      setImageFileList([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: itemUpdate.image,
        },
      ]);
    } else {
      setImageFileList([]);
      setTopicname('');
    }
  }, [itemUpdate, open]);

  const handleClose = () => {
    onClose(false);
    setLoading(false);
    if (!itemUpdate) {
      setTopicname('');
    }
    // setImageUrl('');
  };

  const handleCreate = async () => {
    if (!imageFileList[0].url) return;
    const result = await dispatch(
      createTopic({
        name: topicName,
        image: imageFileList[0].url,
      }),
    );
    if (result.payload.statusCode === 201) {
      message.success('Thêm thành công');
      await dispatch(getAllTopic({ limit: 28, offset: 0, query: '' }));
      handleClose();
    } else if (result.payload.response.status === 400) {
      message.warning('Tên chủ đề đã tồn tại');
    } else {
      message.error('Thêm mới thất bại');
    }
  };

  const handleUpdate = async () => {
    if (!id || !imageFileList[0].url) return;
    const result = await dispatch(
      updateTopic({
        id: id,
        data: {
          name: topicName,
          image: imageFileList[0].url,
        },
      }),
    );
    if (result.payload.statusCode === 200) {
      message.success('Chỉnh sửa thành công');
      await dispatch(getOneTopic(id));
      handleClose();
    } else {
      message.error('Chỉnh sửa thất bại');
    }
  };

  const handleSubmit = async () => {
    if (!topicName) {
      message.warning('Vui lòng nhập tên chủ đề');
      return;
    }
    if (!imageFileList[0].url) {
      message.warning('Vui lòng cung cấp ảnh chủ đề chủ đề');
      return;
    }
    if (itemUpdate) handleUpdate();
    else handleCreate();
  };

  return (
    <>
      <Modal
        closeIcon={<CloseOutlined />}
        footer={[
          <Button key="cancel" onClick={handleClose}>
            Hủy
          </Button>,
          <Button
            // disabled={!isFormValid}
            key="submit"
            onClick={handleSubmit}
            type="primary"
          >
            {itemUpdate ? 'Lưu chủ đề' : 'Tạo chủ đề'}
          </Button>,
        ]}
        onCancel={handleClose}
        open={open}
        style={{ top: 20, right: 20 }}
        title={
          <div>
            <span
              style={{
                color: 'rgba(16, 24, 40, 1)',
                fontSize: '30px',
                fontWeight: '500',
              }}
            >
              Thêm chủ đề
            </span>
          </div>
        }
        width={500}
      >
        <div className="modal-create-topic">
          <div className="row-modal">
            <span>Ảnh chủ đề:</span>
            <Upload
              listType="picture-card"
              fileList={imageFileList}
              beforeUpload={beforeUploadImage}
              customRequest={async ({ file, onSuccess, onError }) => {
                if (!file) return;
                setLoading(true);
                try {
                  const { publicUrl } = await uploadFileToS3(file as File);
                  setImageFileList([
                    {
                      uid: Date.now().toString(),
                      name: (file as File).name,
                      status: 'done',
                      url: publicUrl,
                    },
                  ]);
                  onSuccess?.({}, new XMLHttpRequest());
                } catch (error) {
                  onError?.(error as Error);
                  message.error('Tải ảnh lên thất bại');
                } finally {
                  setLoading(false);
                }
              }}
              onRemove={() => {
                setImageFileList([]);
              }}
            >
              {imageFileList.length < 1 && (
                <button style={{ border: 0, background: 'none' }} type="button">
                  {loading ? <LoadingOutlined /> : <PlusOutlined />}
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              )}
            </Upload>
          </div>
          <div className="row-modal">
            <span>Tên chủ đề:</span>
            <Input
              placeholder="Tên chủ đề"
              className="custom-input"
              value={topicName}
              onChange={e => setTopicname(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalCreateUpdateTopic;
