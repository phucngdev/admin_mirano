import { RootState } from '#/src/redux/store/store';
import { Breadcrumb, Button, Card } from 'antd';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ms_excel from '#/assets/images/icon_button/ms_excel.png';

const AttendanceHistory = () => {
  const { id } = useParams();
  const data = useSelector((state: RootState) => state.class.classEdit);

  return (
    <>
      <Card className="setup-schedule-page">
        <div className="header-class-manager-page">
          <Breadcrumb
            items={[
              {
                title: 'Quản lý lớp học',
              },
              {
                title: <Link to="/class-manager/class-room">Lớp học</Link>,
              },
              {
                title: (
                  <Link to={`/class-manager/class-room/${id}`}>
                    {data?.name}
                  </Link>
                ),
              },
              {
                title: (
                  <Link to={`/class-manager/class-room/attendances/${id}`}>
                    Điểm danh
                  </Link>
                ),
              },
              {
                title: 'Lịch sử điểm danh',
              },
            ]}
          />{' '}
          <div className="group-btn">
            <Button>
              <img src={ms_excel} alt="icon-excel" />
              Xuất báo cáo
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default AttendanceHistory;
