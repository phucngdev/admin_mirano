import { CreateSessonDto, UpdateSessonDto } from '#/api/requests';
import {
  createChapterService,
  deleteChapterService,
  getAllChapterService,
  updatechapterService,
} from '#/api/services/chapterService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllChapter = createAsyncThunk(
  'chapter/get-all-chapter',
  async (id: string) => {
    try {
      const response = await getAllChapterService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const createChapter = createAsyncThunk(
  'chapter/post-create-chapter',
  async (data: CreateSessonDto) => {
    try {
      const response = await createChapterService(data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const updateChapter = createAsyncThunk(
  'chapter/put-update-chapter',
  async ({ id, data }: { id: string; data: UpdateSessonDto }) => {
    try {
      const response = await updatechapterService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const deleteChapter = createAsyncThunk(
  'chapter/delete-chapter',
  async (id: string) => {
    try {
      const response = await deleteChapterService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);
