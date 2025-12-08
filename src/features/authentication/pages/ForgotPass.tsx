import './Register.scss';
// image
import logo from '#/src/assets/images/Featured icon.png';
//end image
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';
function ForgotPass() {
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
                <p className="login__body-title--up">Quên mật khẩu?</p>
              </div>
              <div className="login__body-form">
                <div className="login__body-form__item">
                  <label htmlFor="">Email</label>
                  <Input placeholder="Enter your email" />
                </div>
                <br />
                <div className="login__body-form__button">
                  <p>Đặt lại mật khẩu</p>
                </div>
              </div>
              <div className="login__body-footer">
                <Link to="/login">
                  <p
                    className="login__body-footer--up"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    <ArrowLeft size={20} />
                    Quay lại đăng nhập
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPass;
