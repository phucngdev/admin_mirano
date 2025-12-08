import './ChapterDetail.scss';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import { useAppDispatch } from '#/src/redux/store/store';
import { useEffect, useState } from 'react';
import { deleteChapter, updateChapter } from '#/src/redux/thunk/chapter.thunk';
import { SessonEntity } from '#/api/requests';

interface ChapterDetailProps {
  selectedItem: SessonEntity;
  onChangeTitle: (id: string, newTitle: string) => void;
  onDeleteChapter: (id: string) => void;
}

const ChapterDetail = ({
  selectedItem,
  onDeleteChapter,
}: ChapterDetailProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      title: selectedItem.title,
      isRequired: selectedItem.isRequired,
    });
  }, [selectedItem]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    setLoading(true);
    const result = await dispatch(
      updateChapter({
        id: selectedItem.id,
        data: {
          title: values.title,
          isRequired: values.isRequired,
          pos: selectedItem.pos,
        },
      }),
    );
    if (result.payload.statusCode === 200) {
      message.success('Chỉnh sửa thành công');
    } else if (result.payload.response.status === 400) {
      message.info('Tên chương đã tồn tại');
    } else {
      message.error('Lỗi khi chỉnh sửa');
    }
    setLoading(false);
  };

  const handleDelete = () => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa "${selectedItem.title}"?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        const result = await dispatch(deleteChapter(selectedItem.id));
        if (result.payload.statusCode === 200) {
          message.success('Xoá thành công');
          onDeleteChapter(selectedItem.id);
        } else {
          message.error('Xoá thất bại');
        }
      },
      title: 'Xác nhận xóa',
    });
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        validateTrigger={['onBlur', 'onSubmit']}
        className="chapter-header"
      >
        <div className="chapter-title-top mb-4">
          <h2>Tiêu đề: {selectedItem.title}</h2>
          <Button type="primary" disabled={loading} onClick={handleSubmit}>
            Cập nhật
          </Button>
        </div>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title"
              label="Tiêu đề của chương:"
              rules={[{ required: true, message: 'Không được để trống' }]}
            >
              <Input
                className="custom-input"
                placeholder="Tiêu đề của chương"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              validateTrigger={['onBlur', 'onChange']}
              name="isRequired"
              label="Bắt buộc làm:"
              style={{
                width: '100%',
              }}
              rules={[{ required: true, message: 'Không được để trống' }]}
            >
              <Select
                onChange={value => {
                  form.setFieldValue('isRequired', value);
                }}
                style={{ height: '40px' }}
                placeholder="Chọn loại"
                className="custom-select"
                options={[
                  {
                    value: true,
                    label: 'Bắt buộc',
                  },
                  {
                    value: false,
                    label: 'Không bắt buộc',
                  },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Button onClick={handleDelete} type="primary" danger className="mt-7">
          <DeleteOutlined /> Xoá chương
        </Button>
      </Form>
    </>
  );
};

export default ChapterDetail;
