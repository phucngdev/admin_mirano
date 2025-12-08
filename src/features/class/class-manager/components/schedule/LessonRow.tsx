// LessonRow.tsx
import React from 'react';
import { Checkbox } from 'antd';
import {
  PlusOutlined,
  MinusOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

interface LessonRowProps {
  courseId: string;
  sessonId: string;
  lesson: any;
  lessonIndex: number;
  dates: string[];
  selectedLessonIds: string[];
  toggleLessonSelection: (id: string) => void;
  isLessonScheduled: (
    courseId: string,
    sessonId: string,
    date: string,
    lessonId?: string,
  ) => boolean;
  isSelected: (
    courseId: string,
    sessonId: string,
    date: string,
    lessonId?: string,
  ) => boolean;
  isDateInSessonRange: (
    courseId: string,
    sessonId: string,
    date: string,
  ) => boolean;
  isCellLoading: (
    courseId: string,
    sessonId: string,
    date: string,
    lessonId?: string,
  ) => boolean;
  onDateCellClick: (
    courseId: string,
    sessonId: string,
    date: string,
    lessonId?: string,
  ) => void;
  onDateCellDoubleClick: () => void;
  registerRef: (el: HTMLDivElement | null) => void;
}

const LessonRow: React.FC<LessonRowProps> = React.memo(
  ({
    courseId,
    sessonId,
    lesson,
    lessonIndex,
    dates,
    selectedLessonIds,
    toggleLessonSelection,
    isLessonScheduled,
    isSelected,
    isDateInSessonRange,
    isCellLoading,
    onDateCellClick,
    onDateCellDoubleClick,
    registerRef,
  }) => {
    return (
      <div
        className="row lesson-row"
        key={`lesson-${sessonId}-${courseId}-${lesson.id || lessonIndex}`}
      >
        <div className="title-row-fixed">
          <div className="title-row"></div>

          <div className="title-row flex items-center gap-2">
            <Checkbox
              checked={selectedLessonIds.includes(lesson.id)}
              onChange={() => toggleLessonSelection(lesson.id)}
            >
              {lesson.title || `Bài học ${lessonIndex + 1}`}
            </Checkbox>
          </div>
        </div>
        <div className="list-date-select" ref={registerRef}>
          {dates.map(date => {
            const scheduled = isLessonScheduled(
              courseId,
              sessonId,
              date,
              lesson.id,
            );
            const selected = isSelected(courseId, sessonId, date, lesson.id);
            const isInRange = isDateInSessonRange(courseId, sessonId, date);
            const loading = isCellLoading(courseId, sessonId, date, lesson.id);
            const isDisabled = !isInRange;

            return (
              <div
                key={`lesson-${courseId}|${sessonId}|${lesson.id}|${date}`}
                className={`item-calender lesson-item ${
                  isDisabled
                    ? 'disabled-item'
                    : scheduled && selected
                      ? 'selected-item-scheduled'
                      : scheduled
                        ? 'scheduled-item'
                        : selected
                          ? 'selectd-item'
                          : 'unselected-item'
                }`}
                onClick={
                  !isDisabled && !loading
                    ? () => onDateCellClick(courseId, sessonId, date, lesson.id)
                    : undefined
                }
                onDoubleClick={
                  !isDisabled && !loading ? onDateCellDoubleClick : undefined
                }
                style={
                  isDisabled
                    ? {
                        opacity: 0.3,
                        cursor: 'not-allowed',
                        pointerEvents: 'none',
                      }
                    : loading
                      ? {
                          cursor: 'wait',
                          pointerEvents: 'none',
                        }
                      : {}
                }
              >
                <div className="border-dashed-item">
                  {loading ? (
                    <LoadingOutlined spin />
                  ) : isDisabled ? (
                    <MinusOutlined />
                  ) : (
                    <PlusOutlined />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

export default LessonRow;
