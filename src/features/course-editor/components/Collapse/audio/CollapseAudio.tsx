import { AudioUrlEntity } from '#/api/requests';
import { uploadFileToS3 } from '#/api/services/uploadS3';
import { beforeUploadAudio } from '#/shared/props/beforeUpload';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import {
  deleteAudioLesson,
  updateAudioLesson,
} from '#/src/redux/thunk/audio-lesson.thunk';
import {
  DeleteTwoTone,
  LoadingOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  Button,
  Collapse,
  Form,
  FormInstance,
  Input,
  message,
  Modal,
  Tooltip,
  Upload,
  UploadFile,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface CollapseAudioProps {
  form: FormInstance;
  item: AudioUrlEntity;
  index: number;
}

const CollapseAudio = ({ form, item, index }: CollapseAudioProps) => {
  const dispatch = useAppDispatch();
  const { lessonEdit } = useSelector((state: RootState) => state.lesson);
  const [initAudio, setInitAudio] = useState<string>('');
  const [audioFileList, setAudioFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      audioScript: {
        [index]: {
          id: item.id,
          audioUrl: item.audioUrl,
          question: item.question,
          blanks: item.blanks,
        },
      },
    });
    setInitAudio(JSON.stringify(item));
    setAudioFileList([
      {
        uid: item.audioUrl,
        name: item.audioUrl,
        status: 'done',
        url: item.audioUrl,
      },
    ]);
  }, [item, lessonEdit]);

  const handleUpdate = async () => {
    const values = await form.validateFields();

    const result = await dispatch(
      updateAudioLesson({
        id: values.audioScript[index].id,
        data: {
          ...values.audioScript[index],
          audioUrl: audioFileList[0].url,
        },
      }),
    );
    if (result.payload.statusCode === 200) {
      message.success('Cập nhật thành công!');
    } else {
      message.error('Cập nhật thất bại');
    }
  };

  const handleCancel = () => {
    const jsonParse = JSON.parse(initAudio);
    setAudioFileList([
      {
        uid: jsonParse.audioUrl,
        name: jsonParse.audioUrl,
        status: 'done',
        url: jsonParse.audioUrl,
      },
    ]);
    form.setFieldsValue({
      audioScript: {
        [index]: {
          audioUrl: jsonParse.audioUrl,
          question: jsonParse.question,
          explanation: jsonParse.explanation,
          answer: jsonParse.answer,
          id: jsonParse.id,
        },
      },
    });
  };

  const handleDeleteQuestion = async () => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa câu hỏi?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        const result = await dispatch(deleteAudioLesson(item.id));
        if (result.payload.statusCode === 200) {
          message.success('Xóa câu hỏi thành công!');
        } else {
          message.error('Xoá thất bại');
        }
      },
      title: 'Xác nhận xóa',
    });
  };

  return (
    <>
      <Collapse
        className="bg-[#ffffff]"
        defaultActiveKey={['1']}
        expandIconPosition="end"
        items={[
          {
            key: '1',
            label: `Câu hỏi ${index + 1}`,
            extra: (
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '15px' }}
              >
                <Tooltip title="Xoá">
                  <button
                    type="button"
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onClick={handleDeleteQuestion}
                  >
                    <DeleteTwoTone twoToneColor="#f33832" /> Xoá câu hỏi
                  </button>
                </Tooltip>
              </div>
            ),
            children: (
              <>
                <Form.Item
                  name={['audioScript', index, 'audioUrl']}
                  label="Audio:"
                  rules={[{ required: true, message: 'Không được để trống' }]}
                >
                  <Upload
                    beforeUpload={beforeUploadAudio}
                    fileList={audioFileList}
                    customRequest={async ({ file, onSuccess, onError }) => {
                      if (!file) return;
                      setLoading(true);
                      try {
                        const { publicUrl } = await uploadFileToS3(
                          file as File,
                        );
                        form.setFieldValue('audioUrl', publicUrl);
                        setAudioFileList([
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
                      setAudioFileList([]);
                    }}
                    showUploadList={{
                      showPreviewIcon: false,
                      showRemoveIcon: true,
                    }}
                  >
                    <Button
                      icon={loading ? <LoadingOutlined /> : <UploadOutlined />}
                    >
                      Tải audio lên
                    </Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  name={['audioScript', index, 'question']}
                  label="Câu hoàn chỉnh: (Lưu ý thay từ cần điền bằng ký tự '__')"
                  rules={[{ required: true, message: 'Không được để trống' }]}
                >
                  <TextArea
                    rows={4}
                    placeholder="VD: Tôi __ cơm"
                    className="custom-input"
                  />
                </Form.Item>
                <Form.Item name={['audioScript', index, 'id']} hidden>
                  <Input />
                </Form.Item>
                <Form.List name={['audioScript', index, 'blanks']}>
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
                            rules={[
                              { required: true, message: 'Từ cần điền?' },
                            ]}
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
                          <MinusCircleOutlined
                            onClick={() => remove(field.name)}
                          />
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
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    justifyContent: 'end',
                  }}
                >
                  <Button onClick={handleCancel}>Huỷ</Button>
                  <Button onClick={handleUpdate} type="primary">
                    Lưu
                  </Button>
                </div>
              </>
            ),
          },
        ]}
      />
    </>
  );
};

export default CollapseAudio;
