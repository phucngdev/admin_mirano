import { CreateTestDto, UpdateTestDto } from '#/api/requests';
import {
  createTestService,
  getAllTestService,
  updateTestService,
} from '#/api/services/testService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createTest = createAsyncThunk(
  'test/post-test',
  async (data: CreateTestDto) => {
    try {
      const response = await createTestService(data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const updateTest = createAsyncThunk(
  'test/put-test',
  async ({ id, data }: { id: string; data: UpdateTestDto }) => {
    try {
      const response = await updateTestService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const getAllTest = createAsyncThunk(
  'test/get-all-test',
  async ({
    categoryId,
    limit,
    offset,
  }: {
    categoryId: string;
    limit: number;
    offset: number;
  }) => {
    try {
      const response = await getAllTestService(categoryId, limit, offset);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);
