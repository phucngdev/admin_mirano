import { CreateAudioUrlDto, UpdateAudioUrlDto } from '#/api/requests';
import {
  createAudioLessonService,
  deleteAudioLessonService,
  getAudioLessonService,
  updateAudioLessonService,
} from '#/api/services/audioService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAudioLesson = createAsyncThunk(
  'audio/get-audio',
  async (id: string) => {
    try {
      const response = await getAudioLessonService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const deleteAudioLesson = createAsyncThunk(
  'audio/delete-audio',
  async (id: string) => {
    try {
      const response = await deleteAudioLessonService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const createAudioLesson = createAsyncThunk(
  'audio/post-create-audio',
  async (data: CreateAudioUrlDto) => {
    try {
      const response = await createAudioLessonService(data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const updateAudioLesson = createAsyncThunk(
  'audio/put-audio',
  async ({ id, data }: { id: string; data: UpdateAudioUrlDto }) => {
    try {
      const response = await updateAudioLessonService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);
