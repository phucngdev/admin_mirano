import { UpdateExamDto } from '#/api/requests';
import {
  deleteExamService,
  getAllExamService,
  updateExamService,
} from '#/api/services/examService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllExam = createAsyncThunk(
  'exam/get-exam',
  async ({
    limit,
    offset,
    query,
  }: {
    limit: number;
    offset: number;
    query: string;
  }) => {
    try {
      const response = await getAllExamService(limit, offset, query);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const updateExam = createAsyncThunk(
  'exam/put-exam',
  async ({ id, data }: { id: string; data: UpdateExamDto }) => {
    try {
      const response = await updateExamService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const deleteExam = createAsyncThunk(
  'exam/delete-exam',
  async (id: string) => {
    try {
      const response = await deleteExamService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);
