import { useAppDispatch } from '#/src/redux/store/store';
import { CloseOutlined, SoundOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal } from 'antd';
import { useEffect } from 'react';
import {
  createFlashcard,
  deleteFlashcard,
  updateFlashcard,
} from '#/src/redux/thunk/flash-card.thunk';
import { useSpeechSynthesis } from 'react-speech-kit';
import { FlashCardEntity } from '#/api/requests';

interface ModalCreateProps {
  open: boolean;
  onClose: () => void;
  lessonId: string;
  itemUpdate?: FlashCardEntity | null;
}

const ModalCreateUpdateFlashcard = ({
  open,
  onClose,
  lessonId,
  itemUpdate,
}: ModalCreateProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({
    onEnd: () => {},
  });

  useEffect(() => {
    if (itemUpdate) {
      form.setFieldsValue({
        front: itemUpdate.front,
        back: itemUpdate.back,
        reading: itemUpdate.reading,
      });
    } else {
      form.resetFields();
    }
  }, [itemUpdate, open]);

  const handleSpeak = () => {
    const readingValue = form.getFieldValue('reading');

    if (!readingValue || readingValue.trim() === '') {
      message.warning('Vui lòng nhập nội dung cách đọc');
      return;
    }

    if (!supported) {
      message.error('Trình duyệt không hỗ trợ chức năng phát âm');
      return;
    }

    if (speaking) {
      cancel();
      return;
    }

    const japaneseVoices = voices.filter(voice => voice.lang === 'ja-JP');

    const preferredVoice =
      japaneseVoices.find(
        voice =>
          voice.name.includes('Google') ||
          voice.name.includes('Microsoft') ||
          voice.name.includes('Natural') ||
          voice.name.includes('Neural'),
      ) || japaneseVoices[0];

    speak({
      text: readingValue,
      voice: preferredVoice,
      rate: 0.9,
      pitch: 1,
      // volume: 1,
    });
  };

  useEffect(() => {
    if (!open && speaking) {
      cancel();
    }
  }, [open, speaking, cancel]);

  const handleUpdate = async () => {
    if (!itemUpdate) return;
    const values = await form.validateFields();
    const result = await dispatch(
      updateFlashcard({
        id: itemUpdate.id,
        data: {
          front: values.front,
          back: values.back,
          reading: values.reading,
        },
      }),
    );
    if (result.payload.statusCode === 200) {
      message.success('Cập nhật thành công');
      onClose();
    } else {
      message.error('Cập nhật thất bại');
    }
  };

  const handleCreate = async () => {
    const values = await form.validateFields();
    const result = await dispatch(
      createFlashcard({
        front: values.front,
        back: values.back,
        reading: values.reading,
        lessonId: lessonId,
      }),
    );
    if (result.payload.statusCode === 201) {
      message.success('Thêm thành công');
      onClose();
    } else {
      message.error('Thêm thất bại');
    }
  };

  const handleSubmit = async () => {
    if (itemUpdate) handleUpdate();
    else handleCreate();
  };

  const handleDelete = async () => {
    if (!itemUpdate) return;
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa card?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        const result = await dispatch(deleteFlashcard(itemUpdate.id));
        if (result.payload.statusCode === 200) {
          message.success('Xoá thành công');
          onClose();
        } else {
          message.error('Xoá thất bại');
        }
      },
      title: 'Xác nhận xóa',
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <>
      <Modal
        closeIcon={<CloseOutlined />}
        className=""
        footer={[
          itemUpdate && (
            <Button key="delete" danger onClick={handleDelete}>
              Xoá
            </Button>
          ),
          <Button onClick={handleCancel}>Huỷ</Button>,
          <Button onClick={handleSubmit} type="primary">
            Lưu
          </Button>,
        ]}
        onCancel={handleCancel}
        open={open}
        title={
          <>
            <span
              style={{
                color: 'rgba(16, 24, 40, 1)',
                fontSize: '30px',
                fontWeight: '500',
              }}
            >
              {itemUpdate ? 'Chỉnh sửa card' : 'Thêm card'}
            </span>
          </>
        }
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          validateTrigger={['onBlur', 'onSubmit']}
        >
          <Form.Item
            name="front"
            label="Mặt trước:"
            rules={[{ required: true, message: 'Không được để trống' }]}
          >
            <Input className="custom-input" placeholder="Mặt trước" />
          </Form.Item>
          <Form.Item
            name="back"
            label="Mặt sau:"
            rules={[{ required: true, message: 'Không được để trống' }]}
          >
            <Input className="custom-input" placeholder="Mặt sau" />
          </Form.Item>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Form.Item name="reading" label="Cách đọc:" className="flex-1">
              <Input
                className="custom-input"
                placeholder="Cách đọc"
                style={{ flex: 1 }}
              />
            </Form.Item>
            <Form.Item name="reading" label=" ">
              <Button
                type="text"
                icon={<SoundOutlined />}
                onClick={handleSpeak}
                loading={speaking}
                disabled={!supported}
                title={speaking ? 'Dừng phát âm' : 'Phát âm'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '40px',
                  height: '40px',
                  color: speaking ? '#1890ff' : '#666',
                  backgroundColor: speaking ? '#f0f8ff' : 'transparent',
                  border: '1px solid #d9d9d9',
                  borderRadius: '6px',
                }}
                onMouseEnter={e => {
                  if (!speaking) {
                    e.currentTarget.style.backgroundColor = '#f5f5f5';
                    e.currentTarget.style.color = '#1890ff';
                  }
                }}
                onMouseLeave={e => {
                  if (!speaking) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#666';
                  }
                }}
              />
            </Form.Item>
          </div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            {supported ? `` : 'Trình duyệt không hỗ trợ phát âm'}
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateUpdateFlashcard;
