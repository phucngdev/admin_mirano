import { useEffect, useMemo, useRef, useState, useCallback, memo } from 'react';
import { format, eachDayOfInterval, parseISO } from 'date-fns';
import { Modal, Spin, Tabs } from 'antd';
import { vi } from 'date-fns/locale';
import './index.scss';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import {
  CheckOutlined,
  PlusOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import {
  CreateClassSessonScheduleDto,
  SessonScheduleEntity,
  SessonScheduleWithLessonEntity,
} from '#/api/requests';
import { useParams } from 'react-router-dom';
import {
  createLessonSchedule,
  createSessonSchedule,
  deleteLessonSchedule,
  deleteSessonSchedule,
  getSessonSchedule,
} from '#/src/redux/thunk/sesson-schedule.thunk';
import LessonRow from './LessonRow';

const { TabPane } = Tabs;

const DateCell = memo(
  ({
    courseId,
    sessonId,
    date,
    lessonId,
    scheduled,
    selected,
    loading,
    onClick,
    onDoubleClick,
    className = 'item-calender',
  }: {
    courseId: string;
    sessonId: string;
    date: string;
    lessonId?: string;
    scheduled: boolean;
    selected: boolean;
    loading: boolean;
    onClick: () => void;
    onDoubleClick: () => void;
    className?: string;
  }) => {
    const cellClassName = `${className} ${
      scheduled && selected
        ? 'selected-item-scheduled'
        : scheduled
          ? 'scheduled-item'
          : selected
            ? 'selectd-item'
            : 'unselected-item'
    }`;

    return (
      <div
        className={cellClassName}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
      >
        <div className="border-dashed-item" style={{ userSelect: 'none' }}>
          {loading ? (
            <LoadingOutlined spin />
          ) : scheduled ? (
            <CheckOutlined />
          ) : (
            <PlusOutlined />
          )}
        </div>
      </div>
    );
  },
);

const CourseScheduleBoard = ({
  course,
  dates,
  setup,
  selectedLessonIds,
  selectedDates,
  activeLesson,
  loadingCells,
  setupLookup,
  selectedLookup,
  sessonSetupDatesLookup,
  onDateCellClick,
  onDateCellDoubleClick,
  onSessonDoubleClick,
  toggleLessonSelection,
  isSessonScheduled,
  isLessonScheduled,
  isSelected,
  isCellLoading,
  isDateInSessonRange,
  headerScrollRef,
  registerScrollRef,
}: any) => {
  return (
    <div className="table-wrapper">
      <div className="table-header">
        <div className="header-fixed">
          <div className="title-table">Chương học</div>
          <div className="title-table">Bài học</div>
        </div>
        <div className="header-scroll" ref={headerScrollRef}>
          {dates.map((date: string) => (
            <div key={date} className="title-table-date">
              <div>{format(parseISO(date), 'EEE', { locale: vi })}</div>
              <div>{format(parseISO(date), 'dd/MM')}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="table-body">
        {course?.sessons?.flatMap((sesson: any, sessonIndex: number) => {
          const rows = [];

          // Session row
          rows.push(
            <div
              className="row sesson-row"
              key={`sesson-${sesson.id}-${course.id}`}
            >
              <div className="title-row-fixed">
                <div className="title-row">{sesson.title}</div>
                <div className="title-row">Lịch học theo chương</div>
              </div>
              <div className="list-date-select" ref={registerScrollRef}>
                {dates.map((date: string) => (
                  <DateCell
                    key={`sesson-${course.id}|${sesson.id}|${date}`}
                    courseId={course.id}
                    sessonId={sesson.id}
                    date={date}
                    scheduled={isSessonScheduled(course.id, sesson.id, date)}
                    selected={isSelected(course.id, sesson.id, date)}
                    loading={isCellLoading(course.id, sesson.id, date)}
                    onClick={() => onDateCellClick(course.id, sesson.id, date)}
                    onDoubleClick={() =>
                      onSessonDoubleClick(course.id, sesson.id)
                    }
                    className="item-calender sesson-item"
                  />
                ))}
              </div>
            </div>,
          );

          // Lesson rows
          if (sesson?.lessons?.length > 0) {
            sesson.lessons.forEach((lesson: any, lessonIndex: number) => {
              rows.push(
                <LessonRow
                  key={`lesson-${sesson.id}-${course.id}-${lesson.id || lessonIndex}`}
                  courseId={course.id}
                  sessonId={sesson.id}
                  lesson={lesson}
                  lessonIndex={lessonIndex}
                  dates={dates}
                  selectedLessonIds={selectedLessonIds}
                  toggleLessonSelection={toggleLessonSelection}
                  isLessonScheduled={isLessonScheduled}
                  isSelected={isSelected}
                  isDateInSessonRange={isDateInSessonRange}
                  isCellLoading={isCellLoading}
                  onDateCellClick={onDateCellClick}
                  onDateCellDoubleClick={onDateCellDoubleClick}
                  registerRef={registerScrollRef}
                />,
              );
            });
          } else {
            // Empty lesson row
            rows.push(
              <div
                className="row empty-lesson-row"
                key={`empty-${sesson.id + course.id}`}
              >
                <div className="title-row-fixed">
                  <div className="title-row"></div>
                  <div className="title-row">Không có bài học</div>
                </div>
                <div className="list-date-select" ref={registerScrollRef}>
                  {dates.map((date: string) => (
                    <div
                      key={`empty-${course.id}|${sesson.id}|${date}`}
                      className="item-calender disabled-item"
                      style={{ opacity: 0.1, cursor: 'not-allowed' }}
                    >
                      <div className="border-dashed-item">-</div>
                    </div>
                  ))}
                </div>
              </div>,
            );
          }

          return rows;
        })}
      </div>
    </div>
  );
};

const LessonScheduleBoard = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { classEdit, setup } = useSelector((state: RootState) => state.class);

  const headerScrollRef = useRef<HTMLDivElement>(null);
  const bodyScrollRefs = useRef<HTMLDivElement[]>([]);

  const [loading, setLoading] = useState(false);
  const [selectedLessonIds, setSelectedLessonIds] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<
    (CreateClassSessonScheduleDto & {
      lessonId?: string;
      sessonScheduleIds?: string[];
    })[]
  >([]);
  const [activeLesson, setActiveLesson] = useState<{
    sessonId: string;
    courseId: string;
    lessonId?: string;
  } | null>(null);
  const [loadingCells, setLoadingCells] = useState<Set<string>>(new Set());
  const [setupLookup, setSetupLookup] = useState({
    sessonMap: new Map(),
    lessonMap: new Map(),
  });
  const [activeTabKey, setActiveTabKey] = useState<string>('');

  const fetchData = async () => {
    if (!id) return;
    setLoading(true);
    await dispatch(
      getSessonSchedule({
        classId: id,
        courseId: activeTabKey,
      }),
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id, activeTabKey]);

  // Set tab mặc định khi có dữ liệu khóa học
  useEffect(() => {
    if (classEdit && classEdit?.courses?.length > 0 && !activeTabKey) {
      setActiveTabKey(classEdit.courses[0].id);
    }
  }, [classEdit?.courses, activeTabKey]);

  const dates = useMemo(() => {
    if (!classEdit?.startDate || !classEdit?.endDate) return [];

    const start = classEdit.startDate;
    const end = classEdit.endDate;

    return eachDayOfInterval({ start, end }).map(d => format(d, 'yyyy-MM-dd'));
  }, [classEdit?.startDate, classEdit?.endDate]);

  useEffect(() => {
    const sessonMap = new Map<string, boolean>();
    const lessonMap = new Map<string, boolean>();

    setup?.forEach((s: SessonScheduleWithLessonEntity) => {
      const dateStr = format(parseISO(s.dueDate), 'yyyy-MM-dd');
      const sessonKey = `${s.courseId}|${s.sessonId}|${dateStr}`;
      sessonMap.set(sessonKey, true);

      if (s.lessonId) {
        const lessonKey = `${s.courseId}|${s.sessonId}|${dateStr}|${s.lessonId}`;
        lessonMap.set(lessonKey, true);
      }
    });

    setSetupLookup({ sessonMap, lessonMap });
  }, [setup]);

  const selectedLookup = useMemo(() => {
    const map = new Map<string, boolean>();
    selectedDates.forEach(d => {
      d.dueDate.forEach(date => {
        const key = `${d.courseId}|${d.sessonId}|${date}|${d.lessonId || ''}`;
        map.set(key, true);
      });
    });
    return map;
  }, [selectedDates, setup]);

  const sessonSetupDatesLookup = useMemo(() => {
    const map = new Map<string, Set<string>>();
    setup?.forEach((s: SessonScheduleEntity) => {
      const key = `${s.courseId}|${s.sessonId}`;
      const dateStr = format(parseISO(s.dueDate), 'yyyy-MM-dd');

      if (!map.has(key)) {
        map.set(key, new Set());
      }
      map.get(key)!.add(dateStr);
    });
    return map;
  }, [setup]);

  const getCellKey = useCallback(
    (courseId: string, sessonId: string, date: string, lessonId?: string) => {
      return `${courseId}|${sessonId}|${date}|${lessonId || 'sesson'}`;
    },
    [],
  );

  const isSessonScheduled = useCallback(
    (courseId: string, sessonId: string, date: string) => {
      const key = `${courseId}|${sessonId}|${date}`;
      return setupLookup.sessonMap.has(key);
    },
    [setupLookup.sessonMap],
  );

  const isLessonScheduled = useCallback(
    (courseId: string, sessonId: string, date: string, lessonId?: string) => {
      if (!lessonId) return false;
      const key = `${courseId}|${sessonId}|${date}|${lessonId}`;
      return setupLookup.lessonMap.has(key);
    },
    [setupLookup.lessonMap],
  );

  const isSelected = useCallback(
    (
      courseId: string,
      sessonId: string,
      date: string,
      lessonId?: string,
    ): boolean => {
      const key = `${courseId}|${sessonId}|${date}|${lessonId || ''}`;
      return selectedLookup.has(key);
    },
    [selectedLookup],
  );

  const isCellLoading = useCallback(
    (
      courseId: string,
      sessonId: string,
      date: string,
      lessonId?: string,
    ): boolean => {
      const cellKey = getCellKey(courseId, sessonId, date, lessonId);
      return loadingCells.has(cellKey);
    },
    [loadingCells, getCellKey],
  );

  const isDateInSessonRange = useCallback(
    (courseId: string, sessonId: string, date: string): boolean => {
      const key = `${courseId}|${sessonId}`;
      const setupDates = sessonSetupDatesLookup.get(key);
      return setupDates ? setupDates.has(date) : false;
    },
    [sessonSetupDatesLookup],
  );

  const toggleLessonSelection = useCallback((lessonId: string) => {
    setSelectedLessonIds(prev => {
      const isSelected = prev.includes(lessonId);
      return isSelected
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId];
    });
  }, []);

  const setLoadingForSelectedCells = useCallback(
    (
      courseId: string,
      sessonId: string,
      selectedDueDates: string[],
      lessonId?: string,
      isLoading: boolean = true,
    ) => {
      const cellKeys = selectedDueDates.map(date =>
        getCellKey(courseId, sessonId, date, lessonId),
      );

      setLoadingCells(prev => {
        const newSet = new Set(prev);
        if (isLoading) {
          cellKeys.forEach(key => newSet.add(key));
        } else {
          cellKeys.forEach(key => newSet.delete(key));
        }
        return newSet;
      });
    },
    [getCellKey],
  );

  const onDateCellClick = useCallback(
    (courseId: string, sessonId: string, date: string, lessonId?: string) => {
      const targetLessonIds =
        selectedLessonIds.length > 0 ? selectedLessonIds : [lessonId];

      setSelectedDates(prev => {
        let updated = [...prev];

        targetLessonIds.forEach(ID => {
          const existingIndex = updated.findIndex(
            d =>
              d.courseId === courseId &&
              d.sessonId === sessonId &&
              d.lessonId === ID,
          );

          const scheduled = setup.find(
            (s: SessonScheduleEntity) =>
              s.courseId === courseId &&
              s.sessonId === sessonId &&
              format(parseISO(s.dueDate), 'yyyy-MM-dd') === date,
          );

          if (existingIndex !== -1) {
            const existing = updated[existingIndex];
            const isSelected = existing.dueDate.includes(date);

            const updatedDueDates = isSelected
              ? existing.dueDate.filter(d => d !== date)
              : [...existing.dueDate, date];

            const currentScheduleIds = existing.sessonScheduleIds || [];
            const updatedScheduleIds = isSelected
              ? currentScheduleIds.filter(sid => sid !== scheduled?.id)
              : scheduled?.id
                ? [...currentScheduleIds, scheduled.id]
                : currentScheduleIds;

            if (updatedDueDates.length === 0) {
              updated.splice(existingIndex, 1);
            } else {
              updated[existingIndex] = {
                ...existing,
                dueDate: updatedDueDates,
                sessonScheduleIds: updatedScheduleIds,
              };
            }
          } else {
            updated.push({
              classId: id as string,
              courseId,
              sessonId,
              lessonId: ID,
              dueDate: [date],
              sessonScheduleIds: scheduled?.id ? [scheduled.id] : [],
            });
          }
        });

        return updated;
      });

      setActiveLesson({ courseId, sessonId, lessonId });
    },
    [selectedLessonIds, setup, id],
  );

  const onDateCellDoubleClick = useCallback(async () => {
    if (!activeLesson) return;

    const { courseId, sessonId, lessonId } = activeLesson;

    setSelectedDates(currentSelectedDates => {
      const currentSelection = currentSelectedDates.find(
        d =>
          d.courseId === courseId &&
          d.sessonId === sessonId &&
          d.lessonId === lessonId,
      );

      const selectedDueDates = currentSelection?.dueDate || [];
      const selectedScheduleIds: string[] =
        currentSelection?.sessonScheduleIds || [];

      handleDoubleClickAction(
        courseId,
        sessonId,
        lessonId,
        selectedDueDates,
        selectedScheduleIds,
        currentSelection,
        currentSelectedDates,
      );

      return currentSelectedDates;
    });
  }, [activeLesson]);

  const onSessonDoubleClick = useCallback(
    async (courseId: string, sessonId: string) => {
      setSelectedDates(currentSelectedDates => {
        const currentSelection = currentSelectedDates.find(
          d =>
            d.courseId === courseId && d.sessonId === sessonId && !d.lessonId,
        );

        const selectedDueDates = currentSelection?.dueDate || [];
        const selectedScheduleIds: string[] =
          currentSelection?.sessonScheduleIds || [];

        handleSessonDoubleClickAction(
          courseId,
          sessonId,
          selectedDueDates,
          selectedScheduleIds,
          currentSelection,
          currentSelectedDates,
        );

        return currentSelectedDates;
      });
    },
    [setup],
  );

  const handleSessonDoubleClickAction = useCallback(
    async (
      courseId: string,
      sessonId: string,
      selectedDueDates: string[],
      selectedScheduleIds: string[],
      currentSelection: any,
      currentSelectedDates: any[],
    ) => {
      const matchedSetup = setup.filter(
        (s: SessonScheduleWithLessonEntity) =>
          s.courseId === courseId &&
          s.sessonId === sessonId &&
          !s.lessonId &&
          selectedDueDates.includes(format(parseISO(s.dueDate), 'yyyy-MM-dd')),
      );

      const matchedScheduleIds = matchedSetup.map(
        (s: SessonScheduleEntity) => s.id,
      );

      const course = classEdit?.courses.find(c => c.id === courseId);
      const sesson = course?.sessons.find((s: any) => s.id === sessonId);
      const sessonTitle = sesson?.title || 'chương học';

      if (matchedScheduleIds.length > 0) {
        Modal.confirm({
          title: 'Xác nhận xoá lịch',
          content: (
            <div>
              <p>
                Bạn có chắc chắn muốn <b>xóa lịch học</b> của chương "
                {sessonTitle}" vào các ngày:
              </p>
              <ul className="list-disc list-inside">
                {matchedSetup.map((s: SessonScheduleEntity) => (
                  <li key={s.id}>
                    {format(parseISO(s.dueDate), 'dd/MM/yyyy')}
                  </li>
                ))}
              </ul>
            </div>
          ),
          onOk: async () => {
            setLoadingForSelectedCells(
              courseId,
              sessonId,
              selectedDueDates,
              undefined,
              true,
            );

            try {
              const result = await dispatch(
                deleteSessonSchedule(JSON.stringify(matchedScheduleIds)),
              );
              if (result.payload.statusCode === 200) {
                setSelectedDates(prev =>
                  prev
                    .map(d => {
                      if (
                        d.courseId === courseId &&
                        d.sessonId === sessonId &&
                        !d.lessonId
                      ) {
                        return {
                          ...d,
                          dueDate: d.dueDate.filter(
                            date =>
                              !matchedSetup.some(
                                (s: SessonScheduleEntity) =>
                                  format(parseISO(s.dueDate), 'yyyy-MM-dd') ===
                                  date,
                              ),
                          ),
                          sessonScheduleIds: (d.sessonScheduleIds || []).filter(
                            sid => !matchedScheduleIds.includes(sid),
                          ),
                        };
                      }
                      return d;
                    })
                    .filter(d => d.dueDate.length > 0),
                );

                setActiveLesson(null);
              }
            } catch (error) {
              console.error('Error deleting sesson schedule:', error);
            } finally {
              setLoadingForSelectedCells(
                courseId,
                sessonId,
                selectedDueDates,
                undefined,
                false,
              );
            }
          },
        });
      } else {
        setLoadingForSelectedCells(
          courseId,
          sessonId,
          selectedDueDates,
          undefined,
          true,
        );

        try {
          await dispatch(
            createSessonSchedule({
              classId: id as string,
              courseId,
              sessonId,
              dueDate: selectedDueDates.map(date => new Date(date).toString()),
            }),
          );

          setSelectedDates(prev =>
            prev.filter(
              d =>
                !(
                  d.courseId === courseId &&
                  d.sessonId === sessonId &&
                  !d.lessonId
                ),
            ),
          );

          setActiveLesson(null);
        } catch (error) {
          console.error('Error creating sesson schedule:', error);
        } finally {
          setLoadingForSelectedCells(
            courseId,
            sessonId,
            selectedDueDates,
            undefined,
            false,
          );
        }
      }
    },
    [setup, classEdit, dispatch, id, setLoadingForSelectedCells],
  );

  const handleDoubleClickAction = useCallback(
    async (
      courseId: string,
      sessonId: string,
      lessonId: string | undefined,
      selectedDueDates: string[],
      selectedScheduleIds: string[],
      currentSelection: any,
      currentSelectedDates: any[],
    ) => {
      const matchedSetup = setup.filter(
        (s: SessonScheduleWithLessonEntity) =>
          s.courseId === courseId &&
          s.sessonId === sessonId &&
          (lessonId ? s.lessonId === lessonId : !s.lessonId) &&
          selectedDueDates.includes(format(parseISO(s.dueDate), 'yyyy-MM-dd')),
      );

      const matchedScheduleIds = matchedSetup.map(
        (s: SessonScheduleEntity) => s.id,
      );

      const course = classEdit?.courses.find(c => c.id === courseId);
      const sesson = course?.sessons.find((s: any) => s.id === sessonId);
      const lesson = sesson?.lessons?.find((l: any) => l.id === lessonId);
      const lessonTitle = lesson?.title || sesson?.title || 'bài học';

      if (matchedScheduleIds.length > 0) {
        Modal.confirm({
          title: 'Xác nhận xoá lịch',
          content: (
            <div>
              <p>
                Bạn có chắc chắn muốn <b>xóa lịch học</b> của bài "{lessonTitle}
                " vào các ngày:
              </p>
              <ul className="list-disc list-inside">
                {matchedSetup.map((s: SessonScheduleEntity) => (
                  <li key={s.id}>
                    {format(parseISO(s.dueDate), 'dd/MM/yyyy')}
                  </li>
                ))}
              </ul>
            </div>
          ),
          onOk: async () => {
            setLoadingForSelectedCells(
              courseId,
              sessonId,
              selectedDueDates,
              lessonId,
              true,
            );

            try {
              if (currentSelection && currentSelection.lessonId) {
                await dispatch(
                  deleteLessonSchedule({
                    id: currentSelection.lessonId,
                    data: { sessonScheduleIds: selectedScheduleIds },
                  }),
                );
              } else {
                await dispatch(
                  deleteSessonSchedule(JSON.stringify(matchedScheduleIds)),
                );
              }

              setSelectedDates(prev =>
                prev
                  .map(d => {
                    if (
                      d.courseId === courseId &&
                      d.sessonId === sessonId &&
                      d.lessonId === lessonId
                    ) {
                      return {
                        ...d,
                        dueDate: d.dueDate.filter(
                          date =>
                            !matchedSetup.some(
                              (s: SessonScheduleEntity) =>
                                format(parseISO(s.dueDate), 'yyyy-MM-dd') ===
                                date,
                            ),
                        ),
                        sessonScheduleIds: (d.sessonScheduleIds || []).filter(
                          sid => !matchedScheduleIds.includes(sid),
                        ),
                      };
                    }
                    return d;
                  })
                  .filter(d => d.dueDate.length > 0),
              );

              setActiveLesson(null);
            } catch (error) {
              console.error('Error deleting schedule:', error);
            } finally {
              setLoadingForSelectedCells(
                courseId,
                sessonId,
                selectedDueDates,
                lessonId,
                false,
              );
            }
          },
        });
      } else {
        if (selectedLessonIds.length > 0) {
          selectedLessonIds.forEach(id => {
            const selection = currentSelectedDates.find(
              d =>
                d.courseId === courseId &&
                d.sessonId === sessonId &&
                d.lessonId === id,
            );
            if (selection) {
              setLoadingForSelectedCells(
                courseId,
                sessonId,
                selection.dueDate,
                id,
                true,
              );
            }
          });
        } else {
          setLoadingForSelectedCells(
            courseId,
            sessonId,
            selectedDueDates,
            lessonId,
            true,
          );
        }

        try {
          if (
            currentSelection &&
            currentSelection.lessonId &&
            selectedLessonIds.length === 0
          ) {
            await dispatch(
              createLessonSchedule({
                id: currentSelection.lessonId,
                data: {
                  sessonScheduleIds:
                    currentSelection.sessonScheduleIds as string[],
                },
              }),
            );
          } else if (
            currentSelection &&
            currentSelection.lessonId &&
            selectedLessonIds.length > 0
          ) {
            const promises = selectedLessonIds.map(id => {
              const currentSelect = currentSelectedDates.find(
                d =>
                  d.courseId === courseId &&
                  d.sessonId === sessonId &&
                  d.lessonId === id,
              );
              if (currentSelect && currentSelect.lessonId) {
                return dispatch(
                  createLessonSchedule({
                    id: currentSelect.lessonId,
                    data: {
                      sessonScheduleIds:
                        currentSelect.sessonScheduleIds as string[],
                    },
                  }),
                );
              }
            });
            await Promise.all(promises);
          } else {
            await dispatch(
              createSessonSchedule({
                classId: id as string,
                courseId,
                sessonId,
                dueDate: selectedDueDates.map(date =>
                  new Date(date).toString(),
                ),
              }),
            );
          }

          if (selectedLessonIds.length > 0) {
            setSelectedDates(prev =>
              prev.filter(
                d =>
                  !(
                    d.courseId === courseId &&
                    d.sessonId === sessonId &&
                    d.lessonId &&
                    selectedLessonIds.includes(d.lessonId)
                  ),
              ),
            );
          } else {
            setSelectedDates(prev =>
              prev.filter(
                d =>
                  !(
                    d.courseId === courseId &&
                    d.sessonId === sessonId &&
                    d.lessonId === lessonId
                  ),
              ),
            );
          }
          setSelectedLessonIds([]);
          setActiveLesson(null);
        } catch (error) {
          console.error('Error creating schedule:', error);
        } finally {
          if (selectedLessonIds.length > 0) {
            selectedLessonIds.forEach(id => {
              const selection = currentSelectedDates.find(
                d =>
                  d.courseId === courseId &&
                  d.sessonId === sessonId &&
                  d.lessonId === id,
              );
              if (selection) {
                setLoadingForSelectedCells(
                  courseId,
                  sessonId,
                  selection.dueDate,
                  id,
                  false,
                );
              }
            });
          } else {
            setLoadingForSelectedCells(
              courseId,
              sessonId,
              selectedDueDates,
              lessonId,
              false,
            );
          }
        }
      }
    },
    [
      setup,
      classEdit,
      selectedLessonIds,
      dispatch,
      id,
      setLoadingForSelectedCells,
    ],
  );

  // Cải thiện cách register scroll refs với force update
  const [scrollRefsVersion, setScrollRefsVersion] = useState(0);
  const registerScrollRef = useCallback((el: HTMLDivElement | null) => {
    if (el && !bodyScrollRefs.current.includes(el)) {
      bodyScrollRefs.current.push(el);
      // Trigger re-sync khi có refs mới
      setScrollRefsVersion(prev => prev + 1);
    }
  }, []);

  // Reset refs và version khi tab thay đổi
  useEffect(() => {
    bodyScrollRefs.current = [];
    setScrollRefsVersion(0);
  }, [activeTabKey]);

  // Cải thiện scroll synchronization với version tracking
  useEffect(() => {
    const header = headerScrollRef.current;
    const bodyElements = bodyScrollRefs.current.filter(Boolean);

    // Chỉ setup scroll sync khi có đủ elements
    if (!header || bodyElements.length === 0) {
      return;
    }

    const handleScroll = (sourceElement: HTMLElement) => {
      const scrollLeft = sourceElement.scrollLeft;

      // Đồng bộ header
      if (header !== sourceElement && header.scrollLeft !== scrollLeft) {
        header.scrollLeft = scrollLeft;
      }

      // Đồng bộ tất cả body elements
      bodyElements.forEach(element => {
        if (element !== sourceElement && element.scrollLeft !== scrollLeft) {
          element.scrollLeft = scrollLeft;
        }
      });
    };

    const handleHeaderScroll = () => handleScroll(header);
    const bodyScrollHandlers = bodyElements.map(element => {
      const handler = () => handleScroll(element);
      return { element, handler };
    });

    // Thêm event listeners
    header.addEventListener('scroll', handleHeaderScroll, { passive: true });
    bodyScrollHandlers.forEach(({ element, handler }) => {
      element.addEventListener('scroll', handler, { passive: true });
    });

    // Reset scroll position về 0 khi setup mới
    header.scrollLeft = 0;
    bodyElements.forEach(element => {
      element.scrollLeft = 0;
    });

    // Cleanup function
    return () => {
      header.removeEventListener('scroll', handleHeaderScroll);
      bodyScrollHandlers.forEach(({ element, handler }) => {
        element.removeEventListener('scroll', handler);
      });
    };
  }, [scrollRefsVersion, activeTabKey]); // Sử dụng scrollRefsVersion thay vì dates.length và setup?.length

  // Lọc dữ liệu theo khóa học được chọn
  const activeTabCourse = useMemo(() => {
    return classEdit?.courses?.find(course => course.id === activeTabKey);
  }, [classEdit?.courses, activeTabKey]);

  const handleTabChange = (key: string) => {
    setActiveTabKey(key);
    // Reset state khi chuyển tab
    setSelectedLessonIds([]);
    setSelectedDates([]);
    setActiveLesson(null);
    setLoadingCells(new Set());
  };

  if (loading)
    return (
      <>
        <div className="fixed inset-0 flex items-center justify-center">
          <Spin></Spin>
        </div>
      </>
    );

  return (
    <div className="schedule-manager">
      <span className="span-title">Lịch học</span>
      <br />
      <br />
      {classEdit?.courses && classEdit.courses.length > 0 ? (
        <Tabs activeKey={activeTabKey} onChange={handleTabChange} type="card">
          {classEdit.courses.map((course: any) => (
            <TabPane tab={course.title} key={course.id}>
              {activeTabCourse && (
                <CourseScheduleBoard
                  course={activeTabCourse}
                  dates={dates}
                  setup={setup}
                  selectedLessonIds={selectedLessonIds}
                  selectedDates={selectedDates}
                  activeLesson={activeLesson}
                  loadingCells={loadingCells}
                  setupLookup={setupLookup}
                  selectedLookup={selectedLookup}
                  sessonSetupDatesLookup={sessonSetupDatesLookup}
                  onDateCellClick={onDateCellClick}
                  onDateCellDoubleClick={onDateCellDoubleClick}
                  onSessonDoubleClick={onSessonDoubleClick}
                  toggleLessonSelection={toggleLessonSelection}
                  isSessonScheduled={isSessonScheduled}
                  isLessonScheduled={isLessonScheduled}
                  isSelected={isSelected}
                  isCellLoading={isCellLoading}
                  isDateInSessonRange={isDateInSessonRange}
                  headerScrollRef={headerScrollRef}
                  registerScrollRef={registerScrollRef}
                />
              )}
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

export default LessonScheduleBoard;
