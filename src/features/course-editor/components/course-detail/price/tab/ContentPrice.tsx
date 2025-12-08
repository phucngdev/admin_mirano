import { QuestionCircleOutlined } from '@ant-design/icons';
import { Input, InputNumber, Popover, Switch } from 'antd';

const ContentPrice = () => {
  return (
    <>
      <div className="content-price">
        <form className="form-setup-price">
          <div className="title">
            <h2>Giá bán</h2>
            <button>Cập nhật</button>
          </div>
          <h3>Giá bán của khoá học</h3>
          <p>Cài đặt giá gốc, chưa có khuyến mại và affiliate</p>
          <InputNumber<number>
            placeholder="Giá bán"
            className="custom-input-number"
            formatter={value =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            min={0}
            parser={value => {
              const parsed = value?.replace(/[^\d]/g, '');
              return parsed ? parseInt(parsed, 10) : 0;
            }}
          />
          <div className="switch-title">
            <Switch defaultChecked onChange={checked => console.log(checked)} />{' '}
            Ẩn giá bán{' '}
            <Popover
              content={
                <div style={{ maxWidth: 250 }}>
                  Giá khoá học sẽ không hiển thị tại các box khoá học, trang
                  giới thiệu chi tiết khoá học. Giá sẽ hiển thị tại trang thanh
                  toán nếu khoá học được cài đặt giá và đang bán!
                </div>
              }
              title="Gợi ý"
            >
              <QuestionCircleOutlined />
            </Popover>
          </div>
        </form>
        <hr />
        <form className="form-limit-day">
          <div className="title">
            <h2>Số ngày sử dụng</h2>
            <button>Cập nhật</button>
          </div>
          <div className="switch-title">
            <Switch defaultChecked onChange={checked => console.log(checked)} />{' '}
            Giới hạn ngày sử dụng khoá học{' '}
            <Popover
              content={
                <div style={{ maxWidth: 250 }}>
                  Số ngày người dùng có thể sử dụng khoá học. Hết thời gian này
                  khoá học sẽ bị khoá và học viên không được tham gia khoá học
                  cho đến khi kích hoạt lại khoá. Để trống nếu không thiết lập
                  tham số này.
                </div>
              }
              title="Gợi ý"
            >
              <QuestionCircleOutlined />
            </Popover>
          </div>
          <Input
            placeholder="Số ngày sử dụng"
            className="custom-input limit-day-input"
          />
          <div className="switch-title">
            <Switch defaultChecked onChange={checked => console.log(checked)} />{' '}
            Hiển thị số ngày sử dụng tại trang giới thiệu{' '}
          </div>
        </form>
      </div>
    </>
  );
};

export default ContentPrice;
