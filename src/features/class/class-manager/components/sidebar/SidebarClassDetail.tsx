import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { DeleteTwoTone, PlusOutlined } from '@ant-design/icons';
import { Badge, Button, Checkbox, message, Modal } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ModalSelectCourse from '../modal/ModalSelectCourse';
import { useNavigate, useParams } from 'react-router-dom';
import {
  deleteCourseInClass,
  deleteTeacherInClass,
} from '#/src/redux/thunk/class.thunk';
import { CourseEntity, UserEntity } from '#/api/requests';
import ModalSelectUser from '../modal/ModalSelectUser';

const SidebarClassDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => state.class.classEdit);
  const [openModalSelect, setOpenModalSelect] = useState<
    'user' | 'course' | ''
  >('');

  const handleDeleteCourse = (record: CourseEntity) => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa khoá học "${record.title}" khỏi lớp "${data?.name}"?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        if (!id) return;
        const result = await dispatch(
          deleteCourseInClass({
            classId: id,
            courseId: record.id,
          }),
        );
        if (result.payload.statusCode === 200) {
          message.success('Xóa thành công!');
        } else {
          message.error('Xoá thất bại');
        }
      },
      title: 'Xác nhận xóa',
    });
  };

  const handleDeleteTeacher = (record: UserEntity) => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa giảng viên "${record.fullName}" khỏi lớp "${data?.name}"?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        if (!id) return;
        const result = await dispatch(
          deleteTeacherInClass({
            classId: id,
            teacherId: record.id,
          }),
        );
        if (result.payload.statusCode === 200) {
          message.success('Xóa thành công!');
        } else {
          message.error('Xoá thất bại');
        }
      },
      title: 'Xác nhận xóa',
    });
  };

  return (
    <>
      <ModalSelectCourse
        open={openModalSelect === 'course'}
        onClose={() => setOpenModalSelect('')}
      />
      <ModalSelectUser
        open={openModalSelect === 'user'}
        onClose={() => setOpenModalSelect('')}
        role="TEACHER"
      />
      <div className="sidebar-class-detail">
        <span className="span-title">
          Giảng viên{' '}
          <Badge
            className="site-badge-count-109"
            count={data?.teachers?.length}
            showZero
            style={{ backgroundColor: '#1677fe' }}
          />
        </span>
        <div className="list-teacher">
          <Button
            className="w-full"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setOpenModalSelect('user')}
          >
            Thêm giảng viên
          </Button>
          {data?.teachers.map(user => (
            <div className="teacher-item" key={user.id}>
              <span>{user.fullName}</span>
              <button
                className="btn-delete-teacher"
                onClick={() => handleDeleteTeacher(user)}
              >
                <DeleteTwoTone twoToneColor="#eb2f96" />
              </button>
            </div>
          ))}
        </div>
        <hr />
        <br />
        {/* <span className="span-title">
          Trợ giảng{' '}
          <Badge
            className="site-badge-count-109"
            count={data?.teachers?.length}
            showZero
            style={{ backgroundColor: '#1677fe' }}
          />
        </span>
        <div className="list-teacher">
          <Button
            className="w-full"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setOpenModalSelect('user')}
          >
            Thêm trợ giảng
          </Button>
          {data?.teachers.map(user => (
            <div className="teacher-item">
              <span>{user.fullName}</span>
              <button
                className="btn-delete-teacher"
                onClick={() => handleDeleteTeacher(user)}
              >
                <DeleteTwoTone twoToneColor="#eb2f96" />
              </button>
            </div>
          ))}
        </div>
        <hr />
        <br /> */}
        <span className="span-title">
          Khoá học{' '}
          <Badge
            className="site-badge-count-109"
            count={data?.courses?.length}
            showZero
            style={{ backgroundColor: '#1677fe' }}
          />
        </span>
        <div className="list-course">
          <Button
            className="w-full"
            onClick={() => setOpenModalSelect('course')}
            icon={<PlusOutlined />}
            type="primary"
          >
            Thêm khoá học
          </Button>
          {data?.courses &&
            data?.courses.map(course => (
              <div className="course-item" key={course.id}>
                <span>{course.title}</span>
                <button
                  onClick={() => handleDeleteCourse(course)}
                  className="btn-delete-course"
                >
                  <DeleteTwoTone twoToneColor="#eb2f96" />
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default SidebarClassDetail;
