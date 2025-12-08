import { CloneScheduleDto, CreateClassSessonScheduleDto } from '#/api/requests';
import {
  addLessonToSessonScheduleService,
  cloneSessonScheduleService,
  createSessonScheduleService,
  deleteSessonScheduleService,
  getSessonScheduleService,
  removeLessonFromSessonScheduleService,
} from '#/api/services/sessonScheduleService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getSessonSchedule = createAsyncThunk(
  'sesson-schedule/get-sesson-schedule',
  async ({ classId, courseId }: { classId: string; courseId: string }) => {
    try {
      const response = await getSessonScheduleService(classId, courseId);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const createSessonSchedule = createAsyncThunk(
  'sesson-schedule/post-sesson-schedule',
  async (data: CreateClassSessonScheduleDto) => {
    try {
      const response = await createSessonScheduleService(data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const createLessonSchedule = createAsyncThunk(
  'lesson-schedule/put-lesson-schedule',
  async ({
    id,
    data,
  }: {
    id: string;
    data: { sessonScheduleIds: string[] };
  }) => {
    try {
      const response = await addLessonToSessonScheduleService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const deleteLessonSchedule = createAsyncThunk(
  'lesson-schedule/delete-lesson-schedule',
  async ({
    id,
    data,
  }: {
    id: string;
    data: { sessonScheduleIds: string[] };
  }) => {
    try {
      const response = await removeLessonFromSessonScheduleService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const cloneSessonSchedule = createAsyncThunk(
  'sesson-schedule/post-clone-sesson-schedule',
  async (data: CloneScheduleDto) => {
    try {
      const response = await cloneSessonScheduleService(data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const deleteSessonSchedule = createAsyncThunk(
  'sesson-schedule/delete-sesson-schedule',
  async (id: string) => {
    try {
      const response = await deleteSessonScheduleService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);
