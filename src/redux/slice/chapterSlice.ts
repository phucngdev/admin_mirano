import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMeta, LessonEntity, SessonEntity } from '#/api/requests';
import {
  createChapter,
  deleteChapter,
  getAllChapter,
  updateChapter,
} from '../thunk/chapter.thunk';
import {
  createLesson,
  deleteLesson,
  updateLesson,
} from '../thunk/lesson.thunk';

interface ChapterState {
  data: {
    items: SessonEntity[];
    meta: IMeta;
  };
  chapterEdit: SessonEntity | null;
}

const initialState: ChapterState = {
  data: {
    items: [],
    meta: {
      limit: 0,
      offset: 0,
      total: 0,
      totalPages: 0,
    },
  },
  chapterEdit: null,
};

const chapterSlice = createSlice({
  initialState,
  name: 'chapter',
  reducers: {
    updateLessonPosition: (
      state,
      action: PayloadAction<{
        chapterId: string;
        lesson: { id: string; pos: number };
      }>,
    ) => {
      const { chapterId, lesson } = action.payload;
      const chapter = state.data.items.find(item => item.id === chapterId);
      if (chapter && chapter.lessons) {
        chapter.lessons = chapter.lessons
          .map(l => (l.id === lesson.id ? { ...l, pos: lesson.pos } : l))
          .sort((a, b) => a.pos - b.pos);
      }
    },
    resetChapter: state => {
      state.data = {
        items: [],
        meta: {
          limit: 0,
          offset: 0,
          total: 0,
          totalPages: 0,
        },
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllChapter.fulfilled, (state, action) => {
        state.data.items = action.payload.data;
      })
      .addCase(updateChapter.fulfilled, (state, { payload }) => {
        const chapter = payload.data;
        if (chapter) {
          state.data.items = state.data.items
            .map(item =>
              item.id === chapter.id
                ? { ...chapter, lessons: item.lessons }
                : item,
            )
            .sort((a, b) => a.pos - b.pos);
        }
      })
      .addCase(createChapter.fulfilled, (state, { payload }) => {
        const chapter = payload.data;
        if (chapter) {
          state.data.items.push({ ...chapter, lessons: [] });
          state.data.meta.total++;
        }
      })
      .addCase(deleteChapter.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.data.items = state.data.items.filter(
            item => item.id !== action.meta.arg,
          );
          state.data.meta.total--;
        }
      })
      .addCase(createLesson.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        const { sessonId } = action.meta.arg;
        if (statusCode === 201) {
          const chapter = state.data.items.find(ch => ch.id === sessonId);
          if (chapter && chapter.lessons) {
            chapter.lessons.push(data);
          }
        }
      })
      .addCase(deleteLesson.fulfilled, (state, action) => {
        const { statusCode } = action.payload;
        const id = action.meta.arg;
        if (statusCode === 200) {
          const chapter = state.data.items.find(
            ch => ch.lessons && ch.lessons.some(lesson => lesson.id === id),
          );
          if (chapter && chapter.lessons) {
            chapter.lessons = chapter.lessons
              .filter(lesson => lesson.id !== id)
              .sort((a: LessonEntity, b: LessonEntity) => a.pos - b.pos);
          }
        }
      })
      .addCase(updateLesson.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        const { id } = action.meta.arg;
        if (statusCode === 200) {
          const chapter = state.data.items.find(
            ch => ch.lessons && ch.lessons.some(lesson => lesson.id === id),
          );
          if (chapter && chapter.lessons) {
            chapter.lessons = chapter.lessons
              .map(lesson =>
                lesson.id === data.id ? { ...lesson, ...data } : lesson,
              )
              .sort((a: LessonEntity, b: LessonEntity) => a.pos - b.pos);
          }
        }
      });
  },
});

export default chapterSlice.reducer;
export const { updateLessonPosition, resetChapter } = chapterSlice.actions;
