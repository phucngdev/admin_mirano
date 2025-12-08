import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { Breadcrumb, Button, Card, message } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import LessonScheduleBoard from '../components/schedule/ScheduleClass';
import { getOneClass, getSetupClass } from '#/src/redux/thunk/class.thunk';
import Cookies from 'js-cookie';
import ModalCloneSchedule from '../components/modal/ModalCloneSchedule';
import { getSessonSchedule } from '#/src/redux/thunk/sesson-schedule.thunk';
import Loading from '#/shared/components/loading/Loading';
import ModalBeginTour from '../components/modal/ModalBeginTour';
import ScheduleClassV2 from '../components/schedule/ScheduleClassV2';

const SetupSchedule = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { classEdit } = useSelector((state: RootState) => state.class);
  const [openModal, setOpenModal] = useState<'tour' | 'clone' | ''>('');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!id) return;
    setLoading(true);
    await dispatch(getOneClass(id));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) return <Loading />;

  return (
    <>
      <ModalCloneSchedule
        open={openModal === 'clone'}
        onClose={() => {
          setOpenModal('');
        }}
      />
      <ModalBeginTour
        open={openModal === 'tour'}
        onClose={() => {
          setOpenModal('');
        }}
      />
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
                    {classEdit?.name || Cookies.get('class-active')}
                  </Link>
                ),
              },
              {
                title: 'Setup lịch học',
              },
            ]}
          />
          <div className="group-btn">
            <Button onClick={() => setOpenModal('tour')} type="default">
              Hướng dẫn
            </Button>
            <Button
              onClick={() => {
                if (
                  classEdit?.startDate &&
                  new Date(classEdit.startDate) <= new Date()
                ) {
                  message.info('Lớp học đã bắt đầu không thể sao chép');
                  return;
                }
                setOpenModal('clone');
              }}
              type="primary"
            >
              Sao chép lịch học
            </Button>
          </div>
        </div>
        {/* <LessonScheduleBoard /> */}
        <ScheduleClassV2 />
      </Card>
    </>
  );
};

export default SetupSchedule;
