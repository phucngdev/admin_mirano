import React, { useEffect, useMemo, useState } from 'react';
import './CourseEditor.scss';
import CollapseCourse from '../components/Collapse/chapter/CollapseCourse';
import { useNavigate, useParams } from 'react-router-dom';
import ChapterDetail from '../components/course-detail/chapter-detail/chapter/ChapterDetail';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { getOneCourse } from '#/src/redux/thunk/course.thunk';
import { Empty, message } from 'antd';
import Loading from '#/shared/components/loading/Loading';
import { updateLesson } from '#/src/redux/thunk/lesson.thunk';
import { getAllChapter, updateChapter } from '#/src/redux/thunk/chapter.thunk';
import { resetLessonEdit } from '#/src/redux/slice/lessonSlice';
import { resetChapter } from '#/src/redux/slice/chapterSlice';
import { LessonEntity, SessonEntity } from '#/api/requests';
import LessonDetail from '../components/course-detail/chapter-detail/lesson/LessonDetail';

type SelectedMode = 'chapter' | 'lesson';

const CourseEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const chapterStore = useSelector(
    (state: RootState) => state.chapter.data.items,
  );

  const [items, setItems] = useState<SessonEntity[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SessonEntity | null>(null);
  const [activeKey, setActiveKey] = useState('');
  // const [activeTab, setActiveTab] = useState(tabs[0]);
  const [selectedLesson, setSelectedLesson] = useState<LessonEntity | null>(
    null,
  );
  const [selectedMode, setSelectedMode] = useState<SelectedMode>('chapter');

  const fetchData = async () => {
    if (!id) return;
    setLoading(true);
    await Promise.all([
      dispatch(getOneCourse(id)),
      dispatch(getAllChapter(id)),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    if (chapterStore) {
      setItems(chapterStore);
      if (chapterStore.length) {
        const firstChapter = chapterStore[0];
        setSelectedItem(prev =>
          chapterStore.some(c => c.id === prev?.id) ? prev : firstChapter,
        );
        setActiveKey(prev =>
          chapterStore.some(c => c.id === prev) ? prev : firstChapter.id,
        );
      }
    }
  }, [chapterStore]);

  const handleItemClick = (item: (typeof items)[0]) => {
    if (item.id === activeKey) {
      setSelectedItem(null);
      setSelectedLesson(null); // Clear lesson nếu có
      setSelectedMode('chapter'); // đang chọn chương
      setActiveKey('');
    } else {
      setSelectedItem(item);
      setSelectedLesson(null); // Clear lesson nếu có
      setSelectedMode('chapter'); // đang chọn chương
      setActiveKey(item.id);
    }
  };

  const handleChangeChapterTitle = (id: string, newTitle: string) => {
    setItems(prevItems =>
      prevItems.map(chapter =>
        chapter.id === id ? { ...chapter, title: newTitle } : chapter,
      ),
    );

    // Nếu chapter đang được chọn, cập nhật luôn selectedItem
    if (selectedItem?.id === id) {
      setSelectedItem(prev => {
        if (!prev) return null;
        return { ...prev, title: newTitle };
      });
    }
  };

  const handleDragEnd = async (result: any) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (type === 'CHAPTERS') {
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      const updated = [...items];

      const draggedChapter = updated[source.index];
      let newPosition: number;

      const prevItem =
        destination.index === 0
          ? undefined
          : updated[
              destination.index === updated.length - 1
                ? destination.index
                : destination.index - 1
            ];

      const nextItem =
        destination.index === updated.length - 1
          ? undefined
          : updated[destination.index === 0 ? 0 : destination.index];
      if (!prevItem) {
        // kéo lên đầu danh sách
        newPosition = updated[0].pos - 1;
      } else if (!nextItem) {
        // kéo xuống cuối danh sách
        newPosition = updated[updated.length - 1].pos + 1;
      } else {
        // Nằm giữa 2 item
        newPosition = (prevItem.pos + nextItem.pos) / 2;
      }

      const [movedItem] = updated.splice(source.index, 1);
      updated.splice(destination.index, 0, movedItem);
      setItems(updated);
      await dispatch(
        updateChapter({
          id: draggedChapter.id,
          data: {
            title: draggedChapter.title,
            isRequired: draggedChapter.isRequired,
            pos: newPosition,
          },
        }),
      );
    } else if (type === 'LESSONS') {
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      const chapterId = source.droppableId;
      const updated = [...items];
      const chapterIndex = updated.findIndex(ch => ch.id === chapterId);

      if (chapterIndex === -1) return;

      const chapter = updated[chapterIndex];
      let dataCopy: any = [];
      if (chapter.lessons) {
        dataCopy = [...chapter.lessons];
      }

      const dragIndex = dataCopy.findIndex(
        (node: LessonEntity) => node.id === dataCopy[source.index].id,
      );
      const dropIndex = dataCopy.findIndex(
        (node: LessonEntity) => node.id === dataCopy[destination.index].id,
      );

      if (dragIndex === -1 || dropIndex === -1) return;

      const draggedItem = dataCopy[dragIndex];

      let newPosition = draggedItem.pos;

      if (dropIndex === 0) {
        // Thả trên cùng
        newPosition = dataCopy[0].pos - 1;
      } else if (dropIndex === dataCopy.length - 1) {
        // Thả xuống cuối
        newPosition = dataCopy[dataCopy.length - 1].pos + 1;
      } else {
        const before = dataCopy[dropIndex - 1];
        const after = dataCopy[dropIndex];

        newPosition = (before.pos + after.pos) / 2;
      }

      await dispatch(
        updateLesson({
          id: draggedItem.id,
          data: {
            ...draggedItem,
            pos: newPosition,
          },
        }),
      );
    }
  };

  const handleCollapseChange = (key: string | string[]) => {
    if (typeof key !== 'string') return;

    setActiveKey(prevKey => {
      const newKey = prevKey === key ? '' : key;

      // Nếu mở panel mới
      if (newKey) {
        const item = items.find(i => i.id === newKey);
        if (item) {
          setSelectedItem(item);
          const el = document.getElementById(`panel-${newKey}`);
          el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      return newKey;
    });
  };

  const handleDeleteChapter = (id: string) => {
    setItems(prevItems => prevItems.filter(chapter => chapter.id !== id));
    setSelectedItem(null);
    setActiveKey(prev => (prev === id ? items[0]?.id || '' : prev));
  };

  const isActive = useMemo(() => {
    return selectedLesson || selectedItem;
  }, [selectedLesson, selectedItem, items]);

  if (loading) return <Loading />;

  return (
    <div className="dashboard-container">
      <header className="custom-header">
        <div
          className="header-left"
          onClick={() => {
            navigate('/content/courses');
            setSelectedItem(null);
            Promise.all([
              dispatch(resetChapter()),
              dispatch(resetLessonEdit()),
            ]);
            setActiveKey('');
            setSelectedLesson(null);
          }}
        >
          <span className="header-icon">✖</span>
        </div>
        <span className="header-label">Khoá học</span>
        <div className="header-title">Website khởi tạo từ RikaSoft</div>
        <div className="header-right">
          <span
            className="header-preview"
            onClick={() => {
              message.info('Chức năng chưa phát triển');
            }}
          >
            Xem trước
          </span>
        </div>
      </header>

      <main className="content">
        <>
          <CollapseCourse
            items={items}
            setItems={setItems}
            activeKey={activeKey}
            handleDragEnd={handleDragEnd}
            handleCollapseChange={handleCollapseChange}
            handleItemClick={handleItemClick}
            setSelectedLesson={setSelectedLesson}
            setSelectedMode={setSelectedMode}
            selectedLesson={selectedLesson}
          />
          <div className="content-right">
            <div className="component-content">
              {isActive ? (
                <>
                  {selectedMode === 'lesson' && selectedLesson && (
                    <LessonDetail
                      chapterId={activeKey}
                      lesson={selectedLesson}
                      handleItemClick={handleItemClick}
                    />
                  )}
                  {selectedMode === 'chapter' && selectedItem && (
                    <ChapterDetail
                      selectedItem={selectedItem}
                      onChangeTitle={handleChangeChapterTitle}
                      onDeleteChapter={handleDeleteChapter}
                    />
                  )}
                </>
              ) : (
                <Empty description="Thêm chương mới" />
              )}
            </div>
          </div>
        </>
      </main>
    </div>
  );
};

export default CourseEditor;
