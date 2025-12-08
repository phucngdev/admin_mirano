import { CreateCourseDto, UpdateCourseDto } from '#/api/requests';
import {
  createCourseService,
  deleteCourseService,
  getAllCourseService,
  getOneCourseService,
  updateCourseService,
} from '#/api/services/courseService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllCourse = createAsyncThunk(
  'course/get-all-course',
  async ({
    limit,
    offset,
    query,
    status,
    order,
    classId,
  }: {
    limit: number;
    offset: number;
    query: string;
    status?: 'ACTIVE' | 'INACTIVE' | '';
    order?: 'updatedAt' | 'createdAt' | '';
    classId?: string;
  }) => {
    try {
      const response = await getAllCourseService(
        limit,
        offset,
        query,
        status,
        order,
        classId,
      );
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const getOneCourse = createAsyncThunk(
  'course/get-one-course',
  async (id: string) => {
    try {
      const response = await getOneCourseService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const createCourse = createAsyncThunk(
  'course/post-create-course',
  async (data: CreateCourseDto) => {
    try {
      const response = await createCourseService(data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const updateCourse = createAsyncThunk(
  'course/put-update-course',
  async ({ id, data }: { id: string; data: UpdateCourseDto }) => {
    try {
      const response = await updateCourseService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const deleteCourse = createAsyncThunk(
  'course/delete-course',
  async (id: string) => {
    try {
      const response = await deleteCourseService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);
