import { QuestionCircleOutlined } from '@ant-design/icons';
import { DatePicker, Input, InputNumber, Popover, Switch } from 'antd';

const ContentSale = () => {
  return (
    <>
      <div className="content-sale">
        <form className="form-setup-sale">
          <div className="title">
            <h2>Khuyến mãi</h2>
            <button>Cập nhật</button>
          </div>
          <div className="switch-title">
            <Switch defaultChecked onChange={checked => console.log(checked)} />{' '}
            Cho phép áp dụng chương trình khuyến mãi{' '}
          </div>
          <div className="switch-title">
            <Switch defaultChecked onChange={checked => console.log(checked)} />{' '}
            Áp dụng chương trình giảm giá riêng{' '}
            <Popover
              content={
                <div style={{ maxWidth: 250 }}>
                  Khoá học sẽ được áp dụng chương trình khuyến mại trên hệ thống
                  - được thiết lập tại 'Cài đặt Marketing'. Bật và thiết lập
                  tham số bên dưới nếu muốn sử dụng chương trình giảm giá riêng
                  cho khoá học này!
                </div>
              }
              title="Gợi ý"
            >
              <QuestionCircleOutlined />
            </Popover>
          </div>
          <div className="switch-title">
            <Switch defaultChecked onChange={checked => console.log(checked)} />{' '}
            Ẩn thời gian khuyến mãi{' '}
          </div>
          <div className="setup-sale">
            <p>Thiết lập khuyến mãi</p>
            <div className="row-setup">
              <label htmlFor="">Giá khuyến mãi</label>
              <InputNumber<number>
                className="custom-input-number"
                placeholder="Nhập giá khuyến mãi"
                formatter={value =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                min={0}
                parser={value => {
                  const parsed = value?.replace(/[^\d]/g, '');
                  return parsed ? parseInt(parsed, 10) : 0;
                }}
              />
            </div>
            <div className="row-setup">
              <label htmlFor="">Thời gian áp dụng</label>
              <DatePicker.RangePicker
                showTime
                onChange={(date, dateString) => {
                  console.log(date, dateString);
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContentSale;
