import { useEffect } from 'react';
import { Button, Col, Form, Input, message, Row } from 'antd';
import { updateTestDetail } from '#/src/redux/thunk/test-detail.thunk';
import { useAppDispatch } from '#/src/redux/store/store';
import { TestDetailEntity } from '#/api/requests';

interface FormTestExamProps {
  selectdItem: TestDetailEntity;
}

const FormTestExam = ({ selectdItem }: FormTestExamProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectdItem) {
      form.setFieldsValue({
        name: selectdItem.name,
        timeLimit: selectdItem.timeLimit,
        point: selectdItem.point,
      });
    }
  }, [selectdItem]);

  const handleUpdate = async () => {
    if (!selectdItem) return;
    const values = await form.validateFields();
    const data = {
      name: values.name,
      timeLimit: +values.timeLimit,
      point: +values.point,
    };
    const result = await dispatch(
      updateTestDetail({ id: selectdItem.id, data: data }),
    );
    if (result.payload.statusCode === 200) {
      message.success('Cập nhật thành công');
    } else {
      message.error('Cập nhật thất bại');
    }
  };

  const handleSubmit = async () => {
    handleUpdate();
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        validateTrigger={['onBlur', 'onSubmit']}
        style={{ width: '100%' }}
      >
        <div className="header-content-right">
          <h4>Phần thi</h4>
          <Button type="primary" onClick={handleSubmit}>
            Lưu phần thi
          </Button>
        </div>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Tên phần thi:"
              rules={[{ required: true, message: 'Không được để trống' }]}
            >
              <Input className="custom-input" placeholder="Tên phần thi" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="timeLimit"
                  label="Thời gian làm bài:"
                  rules={[{ required: true, message: 'Không được để trống' }]}
                >
                  <Input
                    className="custom-input"
                    placeholder="Thời gian làm bài"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="point"
                  label="Điểm câu hỏi:"
                  rules={[{ required: true, message: 'Không được để trống' }]}
                >
                  <Input className="custom-input" placeholder="Điểm câu hỏi" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default FormTestExam;
