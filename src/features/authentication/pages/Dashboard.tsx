import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Collapse } from 'antd';
import './Dashboard.scss';

const { Panel } = Collapse;

const menuItems = [
  { id: '1', title: 'Giới thiệu', content: 'Đây là nội dung giới thiệu về hệ thống.' },
  { id: '2', title: 'Tạo và quản lý khóa học', content: 'Hướng dẫn tạo, chỉnh sửa và quản lý khóa học.' },
  { id: '3', title: 'Thay đổi giao diện', content: 'Tùy chỉnh giao diện, bố cục và màu sắc của trang web.' },
  { id: '4', title: 'Cài đặt Email gửi đi từ website', content: 'Cấu hình SMTP, gửi email từ hệ thống.' },
  { id: '5', title: 'Quản trị tài khoản', content: 'Quản lý người dùng, quyền hạn và đăng nhập.' },
  { id: '6', title: 'Cài đặt Affiliate cho khóa học', content: 'Tích hợp tiếp thị liên kết cho các khóa học.' },
  { id: '7', title: 'Cài đặt tự động hóa và webhooks', content: 'Kết nối với webhook, cấu hình hành vi tự động.' },
];

const Dashboard: React.FC = () => {
  const [items, setItems] = useState(menuItems);
  const [selectedItem, setSelectedItem] = useState(menuItems[0]);
  const [activeKey, setActiveKey] = useState<string>(menuItems[0].id); // ✅


  const handleDragEnd = (result: any) => {
    const { destination, source } = result;
    if (!destination) return;

    const updated = [...items];
    const [movedItem] = updated.splice(source.index, 1);
    updated.splice(destination.index, 0, movedItem);
    setItems(updated);
  };

  const handleCollapseChange = (key: string | string[]) => {
    if (typeof key === 'string') {
      if (key === activeKey) {
        // Đang mở thì đóng lại
        setActiveKey('');
      } else {
        // Mở panel mới
        setActiveKey(key);
        const item = items.find((i) => i.id === key);
        if (item) setSelectedItem(item);
      }
    }
  };


  return (
    <div className="dashboard-container">
      <header className="header">
        <div className="header-inner">
          <img className="logo" src="https://via.placeholder.com/164x60" alt="Logo" />
          <h1 className="title">Hướng dẫn sử dụng website khởi tạo từ RikaSoft.vn</h1>
        </div>
      </header>

      <nav className="navbar">
        <ul className="navbar-items">
          <li><a href="#">Bài giảng</a></li>
          <li><a href="#">Thông tin</a></li>
          <li><a href="#">Giá bán</a></li>
          <li><a href="#">Affiliate</a></li>
          <li><a href="#">Xuất bản</a></li>
        </ul>
      </nav>

      <main className="content">
        <div className="content-left">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="draggable-items"
                >
                  {items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="draggable-panel"
                        >
                          <Collapse
                            accordion
                            activeKey={activeKey === item.id ? item.id : undefined}
                            onChange={() =>
                              handleCollapseChange(activeKey === item.id ? '' : item.id)
                            }
                            expandIconPosition="end"
                          >
                            <Panel header={item.title} key={item.id}>
                              <p>{item.content}</p>
                            </Panel>
                          </Collapse>
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <div className="content-right">
          <div className="component-content">
            <h2>{selectedItem?.title}</h2>
            <p>{selectedItem?.content}</p>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Rikasoft.vn. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
