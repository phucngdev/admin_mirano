import { RootState, useAppDispatch } from '#/src/redux/store/store';
import {
  createLessonSchedule,
  createSessonSchedule,
  deleteLessonSchedule,
  deleteSessonSchedule,
  getSessonSchedule,
} from '#/src/redux/thunk/sesson-schedule.thunk';
import {
  Button,
  DatePicker,
  Spin,
  Tabs,
  Card,
  List,
  Typography,
  Space,
  TimePicker,
  Row,
  Col,
  Checkbox,
  Input,
  Select,
  Tag,
  DatePickerProps,
  message,
  Calendar,
  Modal,
} from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  BookOutlined,
  SettingOutlined,
  VideoCameraOutlined,
  SoundOutlined,
  FileTextOutlined,
  BorderOutlined,
  FilePdfOutlined,
  TranslationOutlined,
  ReadOutlined,
  CarryOutOutlined,
  ReconciliationOutlined,
  SolutionOutlined,
  MutedOutlined,
  ClusterOutlined,
} from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import {
  CreateClassSessonScheduleDto,
  LessonEntity,
  SessonEntity,
  SessonScheduleWithLessonEntity,
} from '#/api/requests';
import { lessonTypeLabels } from '#/features/course-editor/components/Collapse/chapter/CollapseCourse';
import './index.scss';

const { Title, Text } = Typography;
const { Option } = Select;

const renderDateCell = (dates: Dayjs[]) => (value: Dayjs) => {
  const isSelected = dates.some(date => value.isSame(date, 'day'));
  return isSelected ? (
    <div className="size-[6px] rounded-full bg-[#1890ff]" />
  ) : null;
};

const ScheduleClassV2 = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { classEdit, setup } = useSelector((state: RootState) => state.class);

  const [loading, setLoading] = useState<'course' | 'sesson' | 'lesson' | ''>(
    '',
  );
  const [activeTabKey, setActiveTabKey] = useState<string>('');
  const [sessons, setSessons] = useState<SessonEntity[]>([]);
  const [lessons, setLessons] = useState<LessonEntity[]>([]);
  const [selectedSesson, setSelectedSesson] = useState<SessonEntity | null>(
    null,
  );
  const [selectedLesson, setSelectedLesson] = useState<LessonEntity | null>(
    null,
  );
  const [selectedDatesSesson, setSelectedDatesSesson] = useState<dayjs.Dayjs[]>(
    [],
  );
  const [selectedDatesLesson, setSelectedDatesLesson] = useState<dayjs.Dayjs[]>(
    [],
  );
  const [newSelectDateSesson, setNewSelectDateSesson] = useState<dayjs.Dayjs[]>(
    [],
  );
  const [removedDatesSesson, setRemovedDatesSesson] = useState<Dayjs[]>([]);
  const [newSelectDateLesson, setNewSelectDateLesson] = useState<dayjs.Dayjs[]>(
    [],
  );
  const [removedDatesLesson, setRemovedDatesLesson] = useState<Dayjs[]>([]);

  const fetchData = async () => {
    if (!id || !classEdit || !activeTabKey) return;

    setLoading('course');
    await dispatch(
      getSessonSchedule({
        classId: id,
        courseId: activeTabKey,
      }),
    );
    setLoading('');
  };

  useEffect(() => {
    fetchData();
  }, [id, activeTabKey]);

  useEffect(() => {
    if (classEdit && classEdit.courses.length > 0) {
      setActiveTabKey(classEdit.courses[0].id);
    }
  }, [classEdit]);

  useEffect(() => {
    if (classEdit) {
      const list_sessons =
        classEdit.courses.find(c => c.id === activeTabKey)?.sessons || [];
      setSessons(list_sessons);
      setSelectedSesson(list_sessons[0]);
      setSelectedDatesLesson([]);
    }
  }, [activeTabKey]);

  useEffect(() => {
    if (classEdit && selectedSesson) {
      const list_lessons =
        selectedSesson.lessons?.slice().sort((a, b) => a.pos - b.pos) || [];

      setLessons(list_lessons);
      setSelectedDatesLesson([]);
    }
  }, [selectedSesson]);

  const disabledDateInClassRange = (current: dayjs.Dayjs): boolean => {
    if (!classEdit?.startDate || !classEdit?.endDate) return false;

    const start = dayjs(classEdit.startDate).startOf('day');
    const end = dayjs(classEdit.endDate).endOf('day');

    return current.isBefore(start) || current.isAfter(end);
  };

  const disabledDateForLesson = (current: dayjs.Dayjs): boolean => {
    if (!selectedDatesSesson || selectedDatesSesson.length === 0) return true;
    return !selectedDatesSesson.some(date => current.isSame(date, 'day'));
  };

  const getDisabledDateCalender =
    (allowedDates: Dayjs[]) => (current: Dayjs) => {
      return !allowedDates.some(date => current.isSame(date, 'day'));
    };

  const handleTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  const getDiffDates = (listA: Dayjs[], listB: Dayjs[]): Dayjs[] => {
    return listA.filter(a => !listB.some(b => b.isSame(a, 'day')));
  };

  // const onChangeDateSesson = (dates: Dayjs[]) => {
  //   const newDates = dates || [];

  //   const addedDates = getDiffDates(newDates, selectedDatesSesson); // Ngày mới được chọn
  //   const removedDates = getDiffDates(selectedDatesSesson, newDates); // Ngày bị xóa

  //   setSelectedDatesSesson(newDates);
  //   setNewSelectDateSesson(addedDates);
  //   setRemovedDatesSesson(removedDates);
  // };

  // const onChangeDateLesson = (dates: dayjs.Dayjs[]) => {
  //   const newDates = dates || [];

  //   const addedDates = getDiffDates(newDates, selectedDatesLesson); // Ngày mới được chọn
  //   const removedDates = getDiffDates(selectedDatesLesson, newDates); // Ngày bị xóa

  //   setSelectedDatesLesson(dates || []);
  //   setNewSelectDateLesson(addedDates);
  //   setRemovedDatesLesson(removedDates);
  // };

  const removeDuplicateDates = (dates: Dayjs[]): Dayjs[] => {
    const uniqueDates = new Map<string, Dayjs>();
    dates.forEach(date => {
      const key = date.format('YYYY-MM-DD');
      if (!uniqueDates.has(key)) {
        uniqueDates.set(key, date);
      }
    });
    return Array.from(uniqueDates.values());
  };

  const renderDateCell = (dates: Dayjs[]) => (value: Dayjs) => {
    const isSelected = dates.some(date => value.isSame(date, 'day'));
    return isSelected ? (
      <div
        key={value.format('YYYY-MM-DD')}
        className="size-[6px] rounded-full bg-[#1890ff]"
      />
    ) : null;
  };

  useEffect(() => {
    if (!selectedSesson || !setup) return;
    setLoading('sesson');
    const findDate = setup?.filter(
      (s: SessonScheduleWithLessonEntity) => s.sessonId === selectedSesson.id,
    );
    const uniqueByIdMap = new Map<string, SessonScheduleWithLessonEntity>();
    findDate.forEach((s: SessonScheduleWithLessonEntity) => {
      if (!uniqueByIdMap.has(s.id)) {
        uniqueByIdMap.set(s.id, s);
      }
    });
    const uniqueSchedules = Array.from(uniqueByIdMap.values());

    const dates = uniqueSchedules.map(d => dayjs(d.dueDate));
    setSelectedDatesSesson(removeDuplicateDates(dates));
    setLoading('');
  }, [setup, selectedSesson]);

  useEffect(() => {
    if (!selectedLesson || !setup) return;
    setLoading('lesson');
    const findDate = setup?.filter(
      (s: SessonScheduleWithLessonEntity) => s.lessonId === selectedLesson.id,
    );
    if (findDate) {
      const dates = findDate.map((d: SessonScheduleWithLessonEntity) =>
        dayjs(d.dueDate),
      );
      setSelectedDatesLesson(removeDuplicateDates(dates));
    }
    setLoading('');
  }, [setup, selectedLesson]);

  const onChangeDateSesson = (dates: Dayjs[]) => {
    const newDates = removeDuplicateDates(dates || []);

    const addedDates = getDiffDates(newDates, selectedDatesSesson);
    const removedDates = getDiffDates(selectedDatesSesson, newDates);

    setSelectedDatesSesson(newDates);
    setNewSelectDateSesson(addedDates);
    setRemovedDatesSesson(removedDates);
  };

  const onChangeDateLesson = (dates: dayjs.Dayjs[]) => {
    const newDates = removeDuplicateDates(dates || []);

    const addedDates = getDiffDates(newDates, selectedDatesLesson);
    const removedDates = getDiffDates(selectedDatesLesson, newDates);

    setSelectedDatesLesson(newDates);
    setNewSelectDateLesson(addedDates);
    setRemovedDatesLesson(removedDates);
  };

  const handleSessonSchedule = async () => {
    if (!id || !selectedSesson) return;
    if (newSelectDateSesson.length === 0 && removedDatesSesson.length === 0) {
      message.warning('Không có thay đổi nào để lưu');
      return;
    }
    try {
      setLoading('sesson');

      if (newSelectDateSesson.length > 0) {
        const result = await dispatch(
          createSessonSchedule({
            classId: id,
            courseId: activeTabKey,
            sessonId: selectedSesson.id,
            dueDate: newSelectDateSesson.map(date =>
              dayjs(date)
                .tz('Asia/Ho_Chi_Minh')
                .hour(7)
                .minute(0)
                .second(0)
                .format(),
            ),
          }),
        );
        if (result.payload.statusCode === 201) {
          setNewSelectDateSesson([]);
          setRemovedDatesSesson([]);
          message.success('Lưu lịch học thành công');
          fetchData();
        } else {
          message.error('Xoá lịch học thất bại');
        }
      }

      if (removedDatesSesson.length > 0) {
        const removedIds = setup
          .filter(
            (item: SessonScheduleWithLessonEntity) =>
              removedDatesSesson.some(removed =>
                dayjs(item.dueDate).isSame(removed, 'day'),
              ) && item.sessonId === selectedSesson.id,
          )
          .map((item: SessonScheduleWithLessonEntity) => item.id);

        const result = await dispatch(
          deleteSessonSchedule(JSON.stringify(removedIds)),
        );
        if (result.payload.statusCode === 200) {
          setNewSelectDateSesson([]);
          setRemovedDatesSesson([]);
          message.success('Lưu lịch học thành công');
          fetchData();
        } else {
          message.error('Xoá lịch học thất bại');
        }
      }
    } catch (error) {
      message.error('Lưu thất bại');
    } finally {
      setLoading('');
    }
  };

  const handleLessonSchedule = async () => {
    if (!selectedSesson) {
      message.warning('Vui lòng chọn chương cần lên lịch');
      return;
    }
    if (!selectedLesson) {
      message.warning('Vui lòng chọn bài học cần lên lịch');
      return;
    }
    if (!setup) return;

    if (newSelectDateLesson.length === 0 && removedDatesLesson.length === 0) {
      message.warning('Không có thay đổi nào để lưu');
      return;
    }

    setLoading('lesson');

    try {
      if (newSelectDateLesson.length > 0) {
        const sessonScheduleIds = setup
          .filter(
            (item: SessonScheduleWithLessonEntity) =>
              newSelectDateLesson.some(removed =>
                dayjs(item.dueDate).isSame(removed, 'day'),
              ) && item.sessonId === selectedSesson.id,
          )
          .map((item: SessonScheduleWithLessonEntity) => item.id);
        const uniqueSessonScheduleIds: string[] = [
          ...new Set<string>(sessonScheduleIds),
        ];

        if (!sessonScheduleIds.length) {
          message.warning(
            'Vui lòng lưu lịch chương trước khi lưu lịch bài học',
          );
          return;
        }

        const result = await dispatch(
          createLessonSchedule({
            id: selectedLesson.id,
            data: {
              sessonScheduleIds: uniqueSessonScheduleIds,
            },
          }),
        );
        if (result.payload.statusCode === 200) {
          setNewSelectDateLesson([]);
          setRemovedDatesLesson([]);
          message.success('Lưu lịch bài học thành công');
          fetchData();
        } else {
          message.error('Lưu lịch học thất bại');
        }
      }

      if (removedDatesLesson.length > 0) {
        const removedIds = setup
          .filter(
            (item: SessonScheduleWithLessonEntity) =>
              removedDatesLesson.some(removed =>
                dayjs(item.dueDate).isSame(removed, 'day'),
              ) && item.lessonId === selectedLesson.id,
          )
          .map((item: SessonScheduleWithLessonEntity) => item.id);

        const result = await dispatch(
          deleteLessonSchedule({
            id: selectedLesson.id,
            data: {
              sessonScheduleIds: removedIds,
            },
          }),
        );
        if (result.payload.statusCode === 200) {
          setNewSelectDateLesson([]);
          setRemovedDatesLesson([]);
          message.success('Lưu lịch bài học thành công');
          fetchData();
        } else {
          message.error('Xoá lịch học thất bại');
        }
      }
    } catch (error) {
      message.error('Lưu lịch bài học thất bại');
    } finally {
      setLoading('');
    }
  };

  const getLessonSetupDates = (lessonId: string): Dayjs[] => {
    if (!setup) return [];

    const lessonSetup = setup.filter(
      (item: SessonScheduleWithLessonEntity) => item.lessonId === lessonId,
    );

    if (!lessonSetup.length) return [];

    const dates = lessonSetup.map((item: SessonScheduleWithLessonEntity) =>
      dayjs(item.dueDate),
    );

    return removeDuplicateDates(dates);
  };

  const getLessonTypeIcon = (type: LessonEntity['type']) => {
    switch (type) {
      case LessonEntity.type.VIDEO:
        return <VideoCameraOutlined />;
      case LessonEntity.type.PRACTICE_THROUGH:
        return <ReconciliationOutlined />;
      case LessonEntity.type.QUIZ:
        return <SolutionOutlined />;
      case LessonEntity.type.FLASH_CARD:
        return <CarryOutOutlined />;
      case LessonEntity.type.KANJI:
        return <TranslationOutlined />;
      case LessonEntity.type.SLIDE:
        return <FilePdfOutlined />;
      case LessonEntity.type.AUDIO:
        return <SoundOutlined />;
      case LessonEntity.type.READING:
        return <ReadOutlined />;
      case LessonEntity.type.LISTENING:
        return <MutedOutlined />;
      case LessonEntity.type.GRAMMAR:
        return <ClusterOutlined />;
      case LessonEntity.type.TEXT:
        return <FileTextOutlined />;
      case LessonEntity.type.VOCAB:
        return <TranslationOutlined />;
      default:
        return <FileTextOutlined />;
    }
  };

  const getLessonTypeColor = (type: LessonEntity['type']) => {
    switch (type) {
      case LessonEntity.type.VIDEO:
        return 'red';
      case LessonEntity.type.AUDIO:
        return 'orange';
      case LessonEntity.type.LISTENING:
        return 'gold';
      case LessonEntity.type.READING:
        return 'purple';
      case LessonEntity.type.TEXT:
        return 'blue';
      case LessonEntity.type.QUIZ:
        return 'green';
      case LessonEntity.type.PRACTICE_THROUGH:
        return 'cyan';
      case LessonEntity.type.SLIDE:
        return 'geekblue';
      case LessonEntity.type.FLASH_CARD:
        return 'error';
      case LessonEntity.type.GRAMMAR:
        return 'magenta';
      case LessonEntity.type.VOCAB:
        return 'success';
      case LessonEntity.type.VOCAB:
        return 'processing';
      default:
        return 'default';
    }
  };

  if (loading === 'course')
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Spin />
      </div>
    );

  return (
    <div className="schedule-manager-v2 mt-5">
      <Title level={3}>Lịch học</Title>

      {classEdit?.courses && classEdit.courses.length > 0 ? (
        <Tabs activeKey={activeTabKey} onChange={handleTabChange} type="card">
          {classEdit.courses.map((course: any) => (
            <TabPane tab={course.title} key={course.id}>
              <Row gutter={24} style={{ marginTop: 20 }}>
                {/* Cột 1: Danh sách Sessions */}
                <Col span={6}>
                  <Card title="Danh sách chương" size="small">
                    <div
                      style={{
                        maxHeight: 'calc(100vh - 390px)',
                        overflowY: 'auto',
                      }}
                    >
                      <List
                        size="small"
                        dataSource={sessons}
                        renderItem={session => (
                          <List.Item
                            style={{
                              cursor: 'pointer',
                              backgroundColor:
                                selectedSesson &&
                                selectedSesson.id === session.id
                                  ? '#e6f7ff'
                                  : 'transparent',
                              borderRadius: 4,
                              marginBottom: 4,
                              padding: 8,
                            }}
                          >
                            <Space
                              direction="vertical"
                              size="small"
                              style={{ width: '100%' }}
                              onClick={() => {
                                if (
                                  newSelectDateSesson.length > 0 ||
                                  removedDatesSesson.length > 0
                                ) {
                                  Modal.confirm({
                                    cancelText: 'Hủy',
                                    content: `Bạn chưa lưu thay đổi thời gian chương học`,
                                    okText: 'Lưu thay đổi',
                                    okType: 'danger',
                                    onOk: () => {
                                      handleSessonSchedule();
                                      setSelectedSesson(session);
                                      setSelectedLesson(null);
                                      setNewSelectDateLesson([]);
                                      setRemovedDatesLesson([]);
                                    },
                                    onCancel: () => {
                                      setNewSelectDateSesson([]);
                                      setRemovedDatesSesson([]);
                                      setSelectedSesson(session);
                                      setSelectedLesson(null);
                                      setNewSelectDateLesson([]);
                                      setRemovedDatesLesson([]);
                                    },
                                    title: 'Cảnh báo',
                                  });
                                  return;
                                }
                                setSelectedSesson(session);
                                setSelectedLesson(null);
                                setNewSelectDateLesson([]);
                                setRemovedDatesLesson([]);
                              }}
                            >
                              <Space>
                                <Text
                                  strong={
                                    selectedSesson
                                      ? selectedSesson.id === session.id
                                      : false
                                  }
                                >
                                  {session.title}
                                </Text>
                                {session.isRequired && (
                                  <Tag color="red">Bắt buộc</Tag>
                                )}
                              </Space>
                              <Space>
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                  {session.lessons?.length || 0} bài học
                                </Text>
                              </Space>
                            </Space>
                          </List.Item>
                        )}
                      />
                    </div>
                  </Card>
                </Col>

                {/* Cột 2: Danh sách Lessons */}
                <Col span={6}>
                  <Card title="Danh sách bài học" size="small">
                    <div
                      style={{
                        maxHeight: 'calc(100vh - 390px)',
                        overflowY: 'auto',
                      }}
                    >
                      {selectedSesson ? (
                        <List
                          size="small"
                          dataSource={lessons}
                          renderItem={lesson => {
                            const lessonSetupDates = getLessonSetupDates(
                              lesson.id,
                            );
                            return (
                              <List.Item
                                style={{
                                  cursor: 'pointer',
                                  backgroundColor:
                                    selectedLesson &&
                                    selectedLesson.id === lesson.id
                                      ? '#e6f7ff'
                                      : 'transparent',
                                  borderRadius: 4,
                                  marginBottom: 4,
                                  padding: 8,
                                }}
                              >
                                <Space
                                  direction="vertical"
                                  size="small"
                                  style={{ width: '100%' }}
                                  onClick={() => {
                                    if (
                                      newSelectDateLesson.length > 0 ||
                                      removedDatesLesson.length > 0
                                    ) {
                                      Modal.confirm({
                                        cancelText: 'Hủy',
                                        content: `Bạn chưa lưu thay đổi thời gian làm bài học`,
                                        okText: 'Lưu thay đổi',
                                        okType: 'danger',
                                        onOk: () => {
                                          handleLessonSchedule();
                                          setSelectedLesson(lesson);
                                        },
                                        onCancel: () => {
                                          setNewSelectDateLesson([]);
                                          setRemovedDatesLesson([]);
                                          setSelectedLesson(lesson);
                                        },
                                        title: 'Cảnh báo',
                                      });
                                      return;
                                    }
                                    setSelectedLesson(lesson);
                                  }}
                                >
                                  <Space>
                                    {getLessonTypeIcon(lesson.type)}
                                    <Text
                                      strong={
                                        selectedLesson
                                          ? selectedLesson.id === lesson.id
                                          : false
                                      }
                                    >
                                      {lesson.title}
                                    </Text>
                                  </Space>
                                  <Space>
                                    <Tag
                                      color={getLessonTypeColor(lesson.type)}
                                    >
                                      {
                                        lessonTypeLabels.find(
                                          item => item.type === lesson.type,
                                        )?.label
                                      }
                                    </Tag>
                                    {lesson.isRequired && (
                                      <Tag color="red">Bắt buộc</Tag>
                                    )}
                                  </Space>
                                  {lessonSetupDates.length > 0 && (
                                    <div style={{ marginTop: 4 }}>
                                      <Text
                                        type="secondary"
                                        style={{
                                          fontSize: 11,
                                          marginBottom: 2,
                                          display: 'block',
                                        }}
                                      >
                                        Ngày học:
                                      </Text>
                                      <Space wrap size={[2, 2]}>
                                        {lessonSetupDates.map((date, index) => (
                                          <Tag
                                            key={`${lesson.id}-${date.format('YYYY-MM-DD')}-${index}`}
                                            color="blue"
                                            style={{
                                              fontSize: 10,
                                              padding: '0 4px',
                                              margin: '1px',
                                            }}
                                          >
                                            {date.format('DD/MM')}
                                          </Tag>
                                        ))}
                                      </Space>
                                    </div>
                                  )}
                                </Space>
                              </List.Item>
                            );
                          }}
                        />
                      ) : (
                        <Text type="secondary">Chọn chương để xem bài học</Text>
                      )}
                    </div>
                  </Card>
                </Col>

                {/* Cột 3: Lên lịch và Setup */}
                <Col span={12}>
                  <div
                    style={{
                      maxHeight: 'calc(100vh - 350px)',
                      overflowY: 'auto',
                    }}
                  >
                    {selectedSesson && (
                      <Space
                        direction="vertical"
                        size="large"
                        style={{ width: '100%' }}
                      >
                        {/* Phần lên lịch cho Session */}
                        <Card
                          title={
                            <Space>
                              <CalendarOutlined />
                              Lên lịch cho {selectedSesson.title}
                            </Space>
                          }
                          extra={
                            <Button
                              onClick={handleSessonSchedule}
                              type="primary"
                            >
                              Lưu lịch chương
                            </Button>
                          }
                        >
                          <Row
                            gutter={16}
                            style={{ marginBottom: 10, padding: '0 8px' }}
                          >
                            <Col span={24}>
                              <Text strong>Ngày học:</Text>
                            </Col>
                            <Col span={24}>
                              <div className="relative mt-2">
                                <DatePicker
                                  multiple
                                  placeholder="Chọn ngày học"
                                  onChange={onChangeDateSesson}
                                  value={selectedDatesSesson}
                                  maxTagCount="responsive"
                                  size="large"
                                  disabledDate={disabledDateInClassRange}
                                  className="w-full"
                                  disabled={loading === 'sesson'}
                                />
                                {loading === 'sesson' && (
                                  <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10 rounded-md">
                                    <Spin />
                                  </div>
                                )}
                              </div>
                            </Col>
                            <Col span={24}>
                              <Calendar
                                fullscreen={false}
                                dateCellRender={renderDateCell(
                                  selectedDatesSesson,
                                )}
                                disabledDate={getDisabledDateCalender(
                                  selectedDatesSesson,
                                )}
                              />
                            </Col>
                          </Row>
                        </Card>

                        {/* Phần setup cho từng Lesson */}
                        <Card
                          title={
                            <Space>
                              <SettingOutlined />
                              Lên lịch cho bài học {selectedLesson?.title}
                            </Space>
                          }
                          extra={
                            <Button
                              onClick={handleLessonSchedule}
                              type="primary"
                            >
                              Lưu lịch bài học
                            </Button>
                          }
                        >
                          <Row
                            gutter={16}
                            style={{ marginBottom: 10, padding: '0 8px' }}
                          >
                            <Col span={24}>
                              <Text strong>Ngày học:</Text>
                            </Col>
                            <Col span={24}>
                              <div className="relative mt-2">
                                <DatePicker
                                  multiple
                                  placeholder="Chọn ngày học"
                                  onChange={onChangeDateLesson}
                                  value={selectedDatesLesson}
                                  maxTagCount="responsive"
                                  disabledDate={disabledDateForLesson}
                                  size="large"
                                  className="mt-2"
                                  disabled={loading === 'lesson'}
                                />
                                {loading === 'lesson' && (
                                  <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10 rounded-md">
                                    <Spin />
                                  </div>
                                )}
                              </div>
                            </Col>
                            <Col span={24}>
                              <Calendar
                                fullscreen={false}
                                dateCellRender={renderDateCell(
                                  selectedDatesLesson,
                                )}
                                disabledDate={getDisabledDateCalender(
                                  selectedDatesLesson,
                                )}
                              />
                            </Col>
                          </Row>
                        </Card>
                      </Space>
                    )}
                  </div>
                </Col>
              </Row>
            </TabPane>
          ))}
        </Tabs>
      ) : (
        <div className="empty-courses">
          <p>Không có khóa học nào để hiển thị</p>
        </div>
      )}
    </div>
  );
};

export default ScheduleClassV2;
