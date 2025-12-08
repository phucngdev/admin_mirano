import { CreateLessonDto, UpdateLessonDto } from '#/api/requests';
import {
  createLessonService,
  deleteLessonService,
  getAllLessonService,
  getOneLessonService,
  updateLessonService,
} from '#/api/services/lessonService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllLesson = createAsyncThunk(
  'lesson/get-all-lesson',
  async (id: string) => {
    try {
      const response = await getAllLessonService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const getOneLesson = createAsyncThunk(
  'lesson/get-one-lesson',
  async (id: string) => {
    try {
      const response = await getOneLessonService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const createLesson = createAsyncThunk(
  'lesson/post-create-lesson',
  async (data: CreateLessonDto) => {
    try {
      const response = await createLessonService(data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const updateLesson = createAsyncThunk(
  'lesson/put-update-lesson',
  async ({ id, data }: { id: string; data: UpdateLessonDto }) => {
    try {
      const response = await updateLessonService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const deleteLesson = createAsyncThunk(
  'lesson/delete-lesson',
  async (id: string) => {
    try {
      const response = await deleteLessonService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);
