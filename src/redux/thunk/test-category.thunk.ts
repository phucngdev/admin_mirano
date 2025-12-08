import { CreateTestCategoryDto, UpdateTestCategoryDto } from '#/api/requests';
import {
  createTestCategoryService,
  getOneTestCategoryService,
  getTestCategoryService,
  updateTestCategoryService,
} from '#/api/services/testCategoryService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createTestCategory = createAsyncThunk(
  'test-category/post-test-category',
  async (data: CreateTestCategoryDto) => {
    try {
      const response = await createTestCategoryService(data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const updateTestCategory = createAsyncThunk(
  'test-category/put-test-category',
  async ({ id, data }: { id: string; data: UpdateTestCategoryDto }) => {
    try {
      const response = await updateTestCategoryService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const getOneTestCategory = createAsyncThunk(
  'test-category/get-one-test-category',
  async (id: string) => {
    try {
      const response = await getOneTestCategoryService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const getTestCategory = createAsyncThunk(
  'test-category/get-test-category',
  async ({ limit, offset }: { limit: number; offset: number }) => {
    try {
      const response = await getTestCategoryService(limit, offset);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);
