import './Register.scss';
// image
import logo from '#/src/assets/images/Logomark.png';
//end image
import { Form, Input } from 'antd';
import { useAppDispatch } from '#/src/redux/store/store';
import { PASSWORD_REGEX } from '#/shared/constants';

function ChangePass() {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    const values = await form.validateFields();
  };

  return (
    <>
      <div className="loginPages-t-t">
        <div className="login">
          <div className="login__body">
            <div className="login__header">
              <div className="login__header-logo">
                <img alt="logo" src={logo} />
              </div>
            </div>
            <Form
              form={form}
              layout="vertical"
              validateTrigger={['onBlur', 'onSubmit']}
            >
              <div className="body-login-t">
                <div className="login__body-title">
                  <p className="login__body-title--up">Đặt mật khẩu mới</p>
                </div>
                <div className="login__body-title-text">
                  <p className="login__body-title--up">Tối thiểu 8 ký tự</p>
                </div>
                <div className="login__body-form">
                  <Form.Item
                    name="password"
                    label="Nhập mật khẩu:"
                    rules={[
                      { required: true, message: 'Không được để trống' },
                      {
                        pattern: PASSWORD_REGEX,
                        message:
                          'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.',
                      },
                    ]}
                  >
                    <Input.Password
                      className="custom-input"
                      placeholder="Nhập mật khẩu"
                    />
                  </Form.Item>
                  <Form.Item
                    name="confirmPassword"
                    label="Xác nhận mật khẩu:"
                    rules={[
                      { required: true, message: 'Không được để trống' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error('Mật khẩu xác nhận không khớp'),
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      className="custom-input"
                      placeholder="Xác nhận mật khẩu"
                    />
                  </Form.Item>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="login__body-form__button"
                  >
                    <p>Xác nhận</p>
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePass;
