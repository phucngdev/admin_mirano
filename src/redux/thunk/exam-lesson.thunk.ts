import {
  CreateExamAndAddToLessonDto,
  UpdateExamLessonDto,
} from '#/api/requests';
import {
  createAndAddExamLessonService,
  getExamLessonService,
  updateControlExamLessonService,
} from '#/api/services/examLessonService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createAndAddExamLesson = createAsyncThunk(
  'exam-lesson/post-create-and-add-exam-lesson',
  async ({
    lessonId,
    data,
  }: {
    lessonId: string;
    data: CreateExamAndAddToLessonDto;
  }) => {
    try {
      const response = await createAndAddExamLessonService(lessonId, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const getExamLesson = createAsyncThunk(
  'exam-lesson/get-exam-lesson',
  async (lessonId: string) => {
    try {
      const response = await getExamLessonService(lessonId);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const updateControlExamLesson = createAsyncThunk(
  'exam-lesson/put-exam-lesson',
  async ({
    examId,
    lessonId,
    data,
  }: {
    examId: string;
    lessonId: string;
    data: UpdateExamLessonDto;
  }) => {
    try {
      const response = await updateControlExamLessonService(
        examId,
        lessonId,
        data,
      );
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);
