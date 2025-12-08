import { CreateCourseVocabDto, UpdateCourseVocabDto } from '#/api/requests';
import {
  createVocabLessonService,
  deleteVocabLessonService,
  getVocabLessonService,
  updateVocabLessonService,
} from '#/api/services/vocabLessonService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createVocabLesson = createAsyncThunk(
  'vocab-lesson/post-create-vocab-lesson',
  async (data: CreateCourseVocabDto) => {
    try {
      const response = await createVocabLessonService(data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const updateVocabLesson = createAsyncThunk(
  'vocab-lesson/put-vocab-lesson',
  async ({ id, data }: { id: string; data: UpdateCourseVocabDto }) => {
    try {
      const response = await updateVocabLessonService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const deleteVocabLesson = createAsyncThunk(
  'vocab-lesson/delete-vocab-lesson',
  async (id: string) => {
    try {
      const response = await deleteVocabLessonService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const getVocabLesson = createAsyncThunk(
  'vocab-lesson/get-vocab-lesson',
  async (id: string) => {
    try {
      const response = await getVocabLessonService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);
