import React, { useState } from 'react';
import { Button, Collapse, message, Popover, Tag } from 'antd';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { useSelector } from 'react-redux';
import { createLesson } from '#/src/redux/thunk/lesson.thunk';
import { createChapter } from '#/src/redux/thunk/chapter.thunk';
import { useParams } from 'react-router-dom';
import { LessonEntity } from '#/api/requests/models/LessonEntity';
import { CourseEntity, SessonEntity } from '#/api/requests';
import {
  LoadingOutlined,
  LockOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
const { Panel } = Collapse;

export const lessonTypeLabels = [
  { type: LessonEntity.type.VIDEO, label: 'Video' },
  { type: LessonEntity.type.QUIZ, label: 'Bài kiểm tra' },
  { type: LessonEntity.type.TEXT, label: 'Bài đọc' },
  {
    type: LessonEntity.type.AUDIO,
    label: 'Audio / Script',
  },
  { type: LessonEntity.type.SLIDE, label: 'Tài liệu PDF' },
  {
    type: LessonEntity.type.FLASH_CARD,
    label: 'Thẻ ghi nhớ',
  },

  { type: LessonEntity.type.KANJI, label: 'Kanji' },
  { type: LessonEntity.type.VOCAB, label: 'Từ vựng' },
  {
    type: LessonEntity.type.READING,
    label: 'Đọc hiểu',
  },
  {
    type: LessonEntity.type.LISTENING,
    label: 'Nghe hiểu',
  },
  { type: LessonEntity.type.GRAMMAR, label: 'Ngữ pháp' },
  { type: LessonEntity.type.PRACTICE_THROUGH, label: 'Luyện tập' },
];

interface ChapterListProps {
  items: SessonEntity[];
  setItems: (prev: any) => void;
  activeKey: string;
  handleDragEnd: (result: any) => void;
  handleCollapseChange: (key: string) => void;
  handleItemClick: (item: SessonEntity) => void;
  setSelectedLesson: (lesson: LessonEntity | null) => void;
  setSelectedMode: (mode: 'lesson' | 'chapter') => void;
  selectedLesson: LessonEntity | null;
}

const CollapseCourse: React.FC<ChapterListProps> = ({
  items,
  activeKey,
  handleDragEnd,
  handleCollapseChange,
  setSelectedLesson,
  setSelectedMode,
  handleItemClick,
  selectedLesson,
}) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { courseEdit } = useSelector((state: RootState) => state.course);

  const [lessonTypeLessonType, setLessonType] = useState(false); // đóng mở list type
  const [loading, setLoading] = useState<'sesson' | 'lesson' | ''>('');

  const handleAddLesson = async (
    sesson: SessonEntity,
    type: LessonEntity.type | LessonEntity.type,
  ) => {
    setLoading('lesson');
    const result = await dispatch(
      createLesson({
        type: type,
        title: 'Tiêu đề bài giảng',
        sessonId: sesson.id,
        isRequired: false,
      }),
    );
    if (result.payload.statusCode === 201) {
      setSelectedLesson(result.payload.data);
      setSelectedMode('lesson');
      setLessonType(false);
    } else {
      message.error('Thêm thất bại, vui lòng tải lại trang và thử lại');
    }
    setLoading('');
  };

  const handleAddChapter = async () => {
    if (!id) return;
    setLoading('sesson');
    const result = await dispatch(
      createChapter({
        title: 'Chương mới',
        courseId: id,
      }),
    );
    if (result.payload.statusCode === 201) {
      handleCollapseChange(result.payload.data.id);
      handleItemClick(result.payload.data);
    } else if (result.payload.response.status === 400) {
      message.info('Tên chương đã tồn tại');
    } else {
      message.error('Lỗi khi tạo chương');
    }
    setLoading('');
  };

  return (
    courseEdit && (
      <div className="content-left">
        <div className="chapter-scroll">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="chapters" type="CHAPTERS">
              {provided => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="draggable-items"
                >
                  {items?.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {provided => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="draggable-panel"
                        >
                          <Collapse
                            accordion
                            activeKey={activeKey}
                            onChange={() => {
                              handleCollapseChange(item.id);
                              handleItemClick(item);
                            }}
                            expandIconPosition="end"
                          >
                            <Panel
                              header={
                                <div className="flex items-center gap-2">
                                  <span>{item.title}</span>
                                  {item.isRequired && (
                                    <LockOutlined className="text-lg text-red-500 p-1 rounded-md bg-red-100" />
                                  )}
                                </div>
                              }
                              key={item.id}
                              id={`panel-${item.id}`}
                            >
                              <Droppable droppableId={item.id} type="LESSONS">
                                {provided => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="lesson-list"
                                  >
                                    {item.lessons?.map(
                                      (lesson, lessonIndex) => (
                                        <Draggable
                                          key={lesson.id}
                                          draggableId={lesson.id}
                                          index={lessonIndex}
                                        >
                                          {(provided, snapshot) => (
                                            <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              className={`lesson-item ${selectedLesson?.id === lesson.id ? 'selected' : ''} ${snapshot.isDragging ? 'dragging' : ''}`}
                                              onClick={() => {
                                                setSelectedLesson(lesson);
                                                setSelectedMode('lesson');
                                              }}
                                            >
                                              <div className="w-full flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                  <div className="lesson-drag-handle">
                                                    ⋮⋮
                                                  </div>
                                                  <span className="lesson-title">
                                                    {lesson.title}
                                                  </span>
                                                </div>
                                                {lesson.isRequired && (
                                                  <LockOutlined className="text-lg text-red-500 p-1 rounded-md bg-red-100" />
                                                )}
                                              </div>
                                            </div>
                                          )}
                                        </Draggable>
                                      ),
                                    )}
                                    {provided.placeholder}
                                  </div>
                                )}
                              </Droppable>
                              <div className="flex items-center justify-between mt-7">
                                <Button
                                  onClick={() =>
                                    setLessonType(!lessonTypeLessonType)
                                  }
                                  icon={
                                    loading === 'lesson' ? (
                                      <LoadingOutlined />
                                    ) : (
                                      <PlusOutlined />
                                    )
                                  }
                                >
                                  Thêm bài giảng
                                </Button>
                                <Popover
                                  content={
                                    <div>
                                      Lưu ý khi kéo thả bài giảng: <br /> Kéo từ
                                      dưới lên trên
                                    </div>
                                  }
                                  title="Lưu ý"
                                >
                                  <Tag
                                    color="blue"
                                    className="flex items-center gap-2"
                                  >
                                    <QuestionCircleOutlined /> Lưu ý
                                  </Tag>
                                </Popover>
                              </div>
                              <div className="list-lesson-type">
                                {courseEdit.type ===
                                  CourseEntity.type.ADVANCED &&
                                  lessonTypeLessonType &&
                                  [
                                    LessonEntity.type.VIDEO,
                                    LessonEntity.type.TEXT,
                                    LessonEntity.type.QUIZ,
                                    LessonEntity.type.FLASH_CARD,
                                    LessonEntity.type.SLIDE,
                                    LessonEntity.type.AUDIO,
                                  ].map((type, index) => (
                                    <button
                                      className="lesson-type-item"
                                      onClick={() =>
                                        handleAddLesson(item, type)
                                      }
                                      key={index}
                                    >
                                      {
                                        lessonTypeLabels.find(
                                          item => item.type === type,
                                        )?.label
                                      }
                                    </button>
                                  ))}
                                {courseEdit.type === CourseEntity.type.BASIC &&
                                  lessonTypeLessonType &&
                                  [
                                    LessonEntity.type.VOCAB,
                                    LessonEntity.type.KANJI,
                                    LessonEntity.type.PRACTICE_THROUGH,
                                    LessonEntity.type.READING,
                                    LessonEntity.type.LISTENING,
                                    LessonEntity.type.FLASH_CARD,
                                    LessonEntity.type.GRAMMAR,
                                  ].map((type, index) => (
                                    <button
                                      className="lesson-type-item"
                                      onClick={() =>
                                        handleAddLesson(item, type)
                                      }
                                      key={index}
                                    >
                                      {
                                        lessonTypeLabels.find(
                                          item => item.type === type,
                                        )?.label
                                      }
                                    </button>
                                  ))}
                              </div>
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
        <div className="chapter-footer">
          <Button
            icon={loading === 'sesson' ? <LoadingOutlined /> : <PlusOutlined />}
            onClick={handleAddChapter}
            disabled={loading === 'sesson'}
            className=""
            type="primary"
          >
            Thêm chương
          </Button>
        </div>
      </div>
    )
  );
};

export default CollapseCourse;
