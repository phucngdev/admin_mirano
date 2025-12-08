import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Space, Tour, TourProps } from 'antd';
import React, { useRef, useState } from 'react';
import './index.scss';

interface ModalBeginTourPros {
  open: boolean;
  onClose: () => void;
}

const ModalBeginTour = ({ open, onClose }: ModalBeginTourPros) => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const [openTour, setOpenTour] = useState<boolean>(false);

  const steps: TourProps['steps'] = [
    {
      title: 'Nút chọn ngày',
      description:
        'Click để chọn ngày muốn setup, chỉ được chọn liên tục cùng 1 hàng',
      target: () => ref1.current,
    },
    {
      title: 'Đã chọn ngày',
      description:
        'Đã chọn ngày sẽ có background màu xanh nhạt, sau khi chọn các ngày mong muốn thì double click vào đó để xác nhận lên lịch',
      target: () => ref2.current,
    },
    {
      title: 'Đã lên lịch',
      description: 'Đã lên lịch sẽ có background màu xanh đậm',
      target: () => ref3.current,
    },
    {
      title: 'Xoá lịch',
      description:
        'Click vào những ô lịch muốn xoá sẽ có background màu đỏ, sau khi chọn các ngày muốn xoá thì double click vào để xác nhận',
      target: () => ref4.current,
    },
  ];
  return (
    <>
      <Modal
        closeIcon={<CloseOutlined />}
        className="begin-tour"
        footer={null}
        onCancel={onClose}
        open={open}
        width={450}
      >
        <Button type="primary" onClick={() => setOpenTour(true)}>
          Bắt đầu
        </Button>
        <br />
        <br />
        <Space>
          <div className="item-calender" ref={ref1}>
            <div className="border-dashed-item">
              <PlusOutlined />
            </div>
          </div>
          <div className="item-calender selectd-item" ref={ref2}>
            <div className="border-dashed-item">
              <PlusOutlined />
            </div>
          </div>
          <div className="item-calender scheduled-item" ref={ref3}>
            <div className="border-dashed-item">
              <PlusOutlined />
            </div>
          </div>
          <div className="item-calender selected-item-scheduled" ref={ref4}>
            <div className="border-dashed-item">
              <PlusOutlined />
            </div>
          </div>
        </Space>
        <Tour
          open={openTour}
          onClose={() => setOpenTour(false)}
          steps={steps}
        />
      </Modal>
    </>
  );
};

export default ModalBeginTour;
