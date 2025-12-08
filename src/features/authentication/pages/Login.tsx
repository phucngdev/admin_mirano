import './Login.scss';
import logo from '/src/assets/images/login/logoMankai.png';
import { Input, Form, message, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useAppDispatch } from '#/src/redux/store/store';
import { login } from '#/src/redux/thunk/auth.thunk';
import { expiresToken } from '#/shared/constants/expises';
import Loading from '#/shared/components/loading/Loading';
import bg_login from '#/assets/images/login/bg_login.png';
import bg_login_2 from '#/assets/images/login/bg_login_2.png';
import { UpsertUserDto } from '#/api/requests';

function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const refreshToken = Cookies.get('refreshToken');
    if (refreshToken) {
      navigate('/content/courses');
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const result = await dispatch(
        login({
          ...values,
          userType: UpsertUserDto.userProfiles.SYSTEM_ADMIN,
        }),
      );

      if (result.payload.statusCode === 201) {
        const { accessToken, refreshToken, user } = result.payload.data;
        const roles = user.userProfiles;
        const hasPermission =
          roles.includes(UpsertUserDto.userProfiles.TEACHER) ||
          roles.includes(UpsertUserDto.userProfiles.SYSTEM_ADMIN);

        if (!hasPermission) {
          message.info('Bạn không có quyền truy cập');
          return;
        }

        const cookieData = [
          {
            key: 'accessToken',
            value: accessToken,
            expires: expiresToken.accessToken,
          },
          {
            key: 'refreshToken',
            value: refreshToken,
            expires: expiresToken.refreshToken,
          },
          {
            key: 'user',
            value: JSON.stringify(user),
            expires: expiresToken.refreshToken,
          },
        ];

        cookieData.forEach(({ key, value, expires }) => {
          Cookies.set(key, value, { expires });
        });

        message.success('Đăng nhập thành công');
        navigate('/content/courses');
      } else {
        throw new Error('USER_NOT_FOUND');
      }
    } catch (error) {
      message.error('Email hoặc mật khẩu không chính xác');
      console.error('Validation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // if (loading) return <Loading />;

  return (
    <div className="loginPages-t">
      <div className="bg-left">
        <img src={bg_login} alt="" className="bg-z-1" />
        <img src={bg_login_2} alt="" className="bg-2" />
        <img alt="logo" className="logo-mankai" src={logo} />
        <div className="slogan-text">Kaiwa siêu tốc, phản xạ thần tốc</div>
      </div>
      <div className="form-right">
        <div className="login">
          <div className="login__body">
            <div className="body-login-t">
              <div className="login__body-title">
                <p className="login__body-title--up">Đăng nhập</p>
                <p className="login__body-subtitle--up">
                  Sử dụng tài khoản được cấp để đăng nhập vào hệ thống
                </p>
              </div>
              <Form
                form={form}
                layout="vertical"
                validateTrigger={['onBlur', 'onSubmit']}
              >
                <div className="login__body-form">
                  <Form.Item
                    name="email"
                    label="Email:"
                    rules={[
                      { required: true, message: 'Không được để trống' },
                      { type: 'email', message: 'Email không hợp lệ' },
                    ]}
                  >
                    <Input className="custom-input" placeholder="Email" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="Mật khẩu:"
                    rules={[{ required: true, message: 'Không được để trống' }]}
                  >
                    <Input.Password
                      className="custom-input"
                      placeholder="Mật khẩu"
                    />
                  </Form.Item>
                  <Link to="" className="forget-password">
                    Quên mật khẩu?
                  </Link>
                  <br />
                  <Button
                    className="login__body-form__button"
                    onClick={handleSubmit}
                    htmlType="submit"
                    loading={loading}
                  >
                    Đăng nhập
                  </Button>
                  <br />
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
