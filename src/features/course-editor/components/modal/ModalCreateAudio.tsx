import { useAppDispatch } from '#/src/redux/store/store';
import { createAudioLesson } from '#/src/redux/thunk/audio-lesson.thunk';
import {
  CloseOutlined,
  LoadingOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Upload, UploadFile } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { uploadFileToS3 } from '#/api/services/uploadS3';
import { beforeUploadAudio } from '#/shared/props/beforeUpload';

interface ModalCreateProps {
  open: boolean;
  onClose: () => void;
  lessonId: string;
}

const ModalCreateAudio = ({ open, onClose, lessonId }: ModalCreateProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFileList([]);
  }, []);

  const handleSubmit = async () => {
    const values = await form.validateFields();

    const result = await dispatch(
      createAudioLesson({
        ...values,
        lessonId: lessonId,
        blanks:
          values.blanks?.map((item: any, idx: number) => ({
            index: item.index ?? idx,
            answer: item.answer,
            explanation: item.explanation,
          })) || [],
      }),
    );
    if (result.payload.statusCode === 201) {
      message.success('Thêm thành công');
      form.resetFields();
      onClose();
    } else {
      message.error('Thêm thất bại');
    }
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
          <Button onClick={handleCancel}>Huỷ</Button>,
          <Button onClick={handleSubmit} type="primary">
            Lưu
          </Button>,
        ]}
        onCancel={handleCancel}
        open={open}
        style={{ top: 20 }}
        title={
          <>
            <span
              style={{
                color: 'rgba(16, 24, 40, 1)',
                fontSize: '30px',
                fontWeight: '500',
              }}
            >
              Thêm audio/script
            </span>
          </>
        }
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          validateTrigger={['onBlur', 'onSubmit']}
        >
          <Form.Item
            name="audioUrl"
            label="Audio:"
            rules={[{ required: true, message: 'Không được để trống' }]}
          >
            <Upload
              beforeUpload={beforeUploadAudio}
              listType="picture"
              fileList={fileList}
              customRequest={async ({ file, onSuccess, onError }) => {
                if (!file) return;
                try {
                  setLoading(true);
                  const { publicUrl } = await uploadFileToS3(file as File);
                  form.setFieldValue('audioUrl', publicUrl);
                  setFileList([
                    {
                      uid: (file as any).uid,
                      name: publicUrl,
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
                Modal.confirm({
                  cancelText: 'Hủy',
                  content: `Bạn có chắc chắn muốn xóa audio?`,
                  okText: 'Xóa',
                  okType: 'danger',
                  onOk: async () => {
                    form.setFieldsValue({ audioUrl: '' });
                    setFileList([]);
                  },
                  title: 'Xác nhận xóa',
                });
              }}
            >
              <Button icon={loading ? <LoadingOutlined /> : <UploadOutlined />}>
                Click to Upload
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="question"
            label="Câu hoàn chỉnh (Lưu ý thay thế từ cần điền bằng ký tự '__'):"
            rules={[{ required: true, message: 'Không được để trống' }]}
          >
            <TextArea
              rows={4}
              placeholder="Câu hoàn chỉnh"
              className="custom-input"
            />
          </Form.Item>
          <Form.List name="blanks">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, idx) => (
                  <div
                    key={field.key}
                    style={{
                      display: 'flex',
                      marginBottom: '24px',
                      gap: '24px',
                      alignContent: 'center',
                    }}
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, 'index']}
                      style={{ width: 50, marginBottom: '0px' }}
                      initialValue={idx + 1}
                    >
                      <Input
                        placeholder="Vị trí"
                        type="number"
                        readOnly
                        style={{ textAlign: 'center' }}
                      />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'answer']}
                      rules={[{ required: true, message: 'Từ cần điền?' }]}
                      style={{ width: 200, marginBottom: '0px' }}
                    >
                      <Input placeholder="Từ cần điền" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'explanation']}
                      // rules={[{ required: true, message: 'Giải thích?' }]}
                      style={{ flex: 1, marginBottom: '0px' }}
                    >
                      <Input placeholder="Giải thích" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Thêm từ cần điền
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateAudio;
