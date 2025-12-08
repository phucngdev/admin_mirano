import { RootState, useAppDispatch } from '#/src/redux/store/store';
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  Badge,
  Button,
  Input,
  message,
  Modal,
  Popover,
  Space,
  Table,
  Tag,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ms_excel from '#/assets/images/icon_button/ms_excel.png';
import ModalSelectUser from '../modal/ModalSelectUser';
import { deleteUserInClass } from '#/src/redux/thunk/class.thunk';
import './index.scss';
import { UserEntity } from '#/api/requests';
import { createReviewService } from '#/api/services/classReviewService';
import { AxiosError } from 'axios';

const TableStudent = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const data = useSelector((state: RootState) => state.class.classEdit);

  const [openCommentId, setOpenCommentId] = useState<UserEntity | null>(null);
  const [openModalSelect, setOpenModalSelect] = useState(false);
  const [review, setReview] = useState('');
  const [query, setQuery] = useState('');
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
    current: 1,
  });

  const handleDeleteStudent = (record: UserEntity) => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa học viên "${record.fullName}"?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        if (!id) return;
        const result = await dispatch(
          deleteUserInClass({
            classId: id,
            userId: record.id,
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

  const handleReview = async () => {
    if (!id || !openCommentId) return;
    try {
      await createReviewService({
        classId: id,
        studentId: openCommentId.id,
        note: review,
      });
      setOpenCommentId(null);
      setReview('');
    } catch (error) {
      const err = error as AxiosError;
      if (err.response && err.response.status === 400) {
        message.info('Bạn không có quyền nhận xét');
      } else {
        message.error('Đã có lỗi xảy ra');
      }
    }
  };

  const handleClick = (id: string) => {
    navigate(`/accounts/students/${id}`);
  };

  const columnsStudent: ColumnsType<UserEntity> = [
    {
      dataIndex: 'userCode',
      key: 'userCode',
      render: (userCode: string) => (
        <span
          style={{
            color: 'rgba(16, 24, 40, 1)',
            fontWeight: '500',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          {userCode}
        </span>
      ),
      title: 'Mã học viên',
      width: 150,
    },
    {
      dataIndex: 'fullName',
      key: 'fullName',
      render: (_, record: UserEntity) => {
        return (
          <span onClick={() => handleClick(record.id)} className="span-table">
            {record.fullName}
          </span>
        );
      },
      title: 'Tên học viên',
    },
    {
      dataIndex: 'email',
      key: 'email',
      render: email => (
        <>
          <span
            style={{
              color: 'rgba(16, 24, 40, 1)',
              fontWeight: '500',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            {email}
          </span>
        </>
      ),
      title: 'Email',
    },
    {
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      render: phoneNumber => (
        <>
          <span
            style={{
              color: 'rgba(16, 24, 40, 1)',
              fontWeight: '500',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            {phoneNumber}
          </span>
        </>
      ),
      title: 'Số điện thoại',
    },
    {
      dataIndex: 'userType',
      key: 'userType',
      render: (userType: string) => (
        <Tag
          color={
            userType === UserEntity.userType.NEW_USER ? 'success' : 'error'
          }
        >
          {userType === UserEntity.userType.NEW_USER ? 'Miễn phí' : 'Trả phí'}
        </Tag>
      ),
      title: 'Dối tượng',
    },
    {
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={e => {
              e.stopPropagation();
              handleDeleteStudent(record);
            }}
          >
            Xóa
          </Button>
          <Popover
            title={`Nhận xét cho ${record.fullName}`}
            trigger="click"
            placement="left"
            open={openCommentId ? openCommentId.id === record.id : false}
            onOpenChange={visible => {
              setOpenCommentId(visible ? record : null);
              setReview('');
            }}
            content={
              <div
                style={{ maxWidth: 500, width: 400 }}
                onClick={e => e.stopPropagation()}
              >
                <Input.TextArea
                  autoSize={{ minRows: 3, maxRows: 10 }}
                  placeholder="Nhập nhận xét..."
                  style={{ marginBottom: 8 }}
                  value={review}
                  onChange={e => setReview(e.target.value)}
                />
                <Button type="primary" block onClick={handleReview}>
                  Gửi
                </Button>
              </div>
            }
          >
            <Button onClick={e => e.stopPropagation()} icon={<EditOutlined />}>
              Nhận xét
            </Button>
          </Popover>
        </Space>
      ),
      title: 'Hành động',
      width: 250,
    },
  ];

  const filterStudent = useMemo(() => {
    if (!data) return [];
    if (!query) return data.students;

    const lowerQuery = query.toLowerCase();

    return data.students.filter(student =>
      student.fullName?.toLowerCase().includes(lowerQuery),
    );
  }, [query, data]);

  return (
    <>
      <ModalSelectUser
        open={openModalSelect}
        onClose={() => setOpenModalSelect(false)}
        role="STUDENT"
      />
      <div className="table-student-class">
        <div className="header-table-student-class">
          <span className="span-title">
            Danh sách học viên{' '}
            <Badge
              className="site-badge-count-109"
              count={data?.students?.length}
              showZero
              style={{ backgroundColor: '#1677fe' }}
            />
          </span>
          <Space>
            <Input
              allowClear
              onChange={e => {
                e.preventDefault();
                setQuery(e.target.value);
              }}
              placeholder="Tìm kiếm học viên"
              prefix={<SearchOutlined />}
              value={query}
            />
            <Popover
              title="Menu"
              trigger="click"
              placement="bottomRight"
              content={
                <div className="flex flex-col items-start gap-2">
                  <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    className="w-full"
                  >
                    Tải file mẫu
                  </Button>
                  <Button icon={<UploadOutlined />} className="w-full">
                    Import danh sách
                  </Button>
                </div>
              }
            >
              <Button>
                <img src={ms_excel} alt="icon-excel" />
                Tải danh sách
              </Button>
            </Popover>
            <Button
              icon={<PlusOutlined />}
              onClick={() => setOpenModalSelect(true)}
              type="primary"
            >
              Thêm học viên
            </Button>
          </Space>
        </div>
        <Table
          columns={columnsStudent}
          dataSource={filterStudent}
          bordered
          rowKey="id"
          pagination={false}
          onRow={record => ({
            onClick: () => handleClick(record.id),
            style: { cursor: 'pointer' },
          })}
        />
      </div>
    </>
  );
};

export default TableStudent;
