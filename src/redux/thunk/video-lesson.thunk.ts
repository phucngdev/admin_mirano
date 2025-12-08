import {
  CreateDocumentType,
  CreateVideoUrlDto,
  DeleteDocumentType,
  UpdateVideoUrlDto,
} from '#/api/requests';
import {
  createDocumentVideoLessonService,
  createVideoLessonService,
  deleteDocumentVideoLessonService,
  getVideoLessonService,
  updateVideoLessonService,
} from '#/api/services/videoService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getVideoLesson = createAsyncThunk(
  'video-lesson/get-video-lesson',
  async (id: string) => {
    try {
      const response = await getVideoLessonService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const createVideoLesson = createAsyncThunk(
  'video-lesson/post-create-video-lesson',
  async (data: CreateVideoUrlDto) => {
    try {
      const response = await createVideoLessonService(data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const updateVideoLesson = createAsyncThunk(
  'video-lesson/put-video-lesson',
  async ({ id, data }: { id: string; data: UpdateVideoUrlDto }) => {
    try {
      const response = await updateVideoLessonService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const createDocumentVideoLesson = createAsyncThunk(
  'video-lesson/post-document-lesson',
  async ({ id, data }: { id: string; data: CreateDocumentType }) => {
    try {
      const response = await createDocumentVideoLessonService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const deleteDocumentVideoLesson = createAsyncThunk(
  'video-lesson/delete-document-lesson',
  async ({ id, data }: { id: string; data: DeleteDocumentType }) => {
    try {
      const response = await deleteDocumentVideoLessonService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);
