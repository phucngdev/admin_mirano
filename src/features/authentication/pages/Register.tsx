import './Register.scss';
// image
import logo from '/src/assets/images/login/logoMankai.png';
import google from '/src/assets/images/login/google.png';
//end image
import { Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
// import { register } from '#/src/redux/thunk/auth.thunk';
import { useAppDispatch } from '#/src/redux/store/store';
import { PASSWORD_REGEX } from '#/shared/constants';
import { GoogleLogin } from '@react-oauth/google';
import { loginGoogleService } from '#/api/services/authService';

function Register() {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    const values = await form.validateFields();
    // const result = await dispatch(register(values));
  };

  const handleSuccess = async (credentialResponse: any) => {
    const idToken = credentialResponse.credential;
    const params = new URLSearchParams(window.location.search);
    const referredUserCodeRaw = params.get('ref');
    const referredUserCode = referredUserCodeRaw?.trim() || '';

    try {
      const response = await loginGoogleService({
        idToken,
        referredUserCode,
      });

      const { accessToken, user } = response.data;
      console.log('🚀 ~ handleSuccess ~ accessToken:', accessToken);
      console.log('Đăng nhập thành công:', user);
    } catch (err) {
      console.error('Đăng nhập thất bại:', err);
    }
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
            <div className="body-login-t">
              <div className="login__body-title">
                <p className="login__body-title--up">Tạo tài khoản</p>
              </div>
              <Form
                form={form}
                layout="vertical"
                validateTrigger={['onBlur', 'onSubmit']}
              >
                <div className="login__body-form">
                  <Form.Item
                    name="fullName"
                    label="Họ và tên:"
                    rules={[{ required: true, message: 'Không được để trống' }]}
                  >
                    <Input className="custom-input" placeholder="Họ và tên" />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="Email:"
                    rules={[{ required: true, message: 'Không được để trống' }]}
                  >
                    <Input className="custom-input" placeholder="Email" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="Mật khẩu:"
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
                      placeholder="Mật khẩu"
                    />
                  </Form.Item>
                  <Form.Item
                    name="phoneNumber"
                    label="Số điện thoại:"
                    rules={[{ required: true, message: 'Không được để trống' }]}
                  >
                    <Input
                      className="custom-input"
                      placeholder="Số điện thoại"
                    />
                  </Form.Item>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="login__body-form__button"
                  >
                    <p>Đăng ký</p>
                  </button>
                  <br />
                  {/* <div className="login__body-form__google">
                    <img alt="icon" src={google} />
                    <p>Đăng nhập với Google</p>
                  </div> */}
                  <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={() => {
                      console.log('Đăng nhập Google thất bại');
                    }}
                  />
                </div>
              </Form>
              <div className="login__body-footer">
                <p className="login__body-footer--up">Đã có tài khoản?</p>
                <Link to="/login">
                  <p className="login__body-footer--down">Đăng nhập</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
