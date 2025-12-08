import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import topicSlice from '../slice/topicSlice';
import vocabSlice from '../slice/vocabSlice';
import courseSlice from '../slice/courseSlice';
import lessonSlice from '../slice/lessonSlice';
import chapterSlice from '../slice/chapterSlice';
import questionSlice from '../slice/questionSlice';
import authSlice from '../slice/authSlice';
import classSlice from '../slice/classSlice';
import testSlice from '../slice/testCategorySlice';
import userSlice from '../slice/userSlice';

const store = configureStore({
  reducer: {
    topic: topicSlice,
    vocab: vocabSlice,
    course: courseSlice,
    lesson: lessonSlice,
    chapter: chapterSlice,
    question: questionSlice,
    auth: authSlice,
    class: classSlice,
    test: testSlice,
    users: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
