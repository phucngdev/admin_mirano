import { CreateTestDetailDto, UpdateTestDetailDto } from '#/api/requests';
import {
  createTestDetailService,
  deleteTestDetailService,
  getAllTestDetailService,
  updateTestDetailService,
} from '#/api/services/testDetailService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllTestDetail = createAsyncThunk(
  'test-detail/get-all-test-detail',
  async ({
    testId,
    limit,
    offset,
  }: {
    testId: string;
    limit?: number;
    offset?: number;
  }) => {
    try {
      const response = await getAllTestDetailService(testId, limit, offset);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const createTestDetail = createAsyncThunk(
  'test-detail/post-test-detail',
  async (data: CreateTestDetailDto) => {
    try {
      const response = await createTestDetailService(data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const updateTestDetail = createAsyncThunk(
  'test-detail/put-test-detail',
  async ({ id, data }: { id: string; data: UpdateTestDetailDto }) => {
    try {
      const response = await updateTestDetailService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const deleteTestDetail = createAsyncThunk(
  'test-detail/delete-test-detail',
  async (id: string) => {
    try {
      const response = await deleteTestDetailService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);
