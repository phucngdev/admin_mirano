import { CreateTestDto, UpdateTestDto } from '#/api/requests';
import {
  getAllTestResultService,
  getAttemptsService,
  getTestResultDetailService,
} from '#/api/services/testResultService';
import {
  createTestService,
  getAllTestService,
  updateTestService,
} from '#/api/services/testService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllTestResult = createAsyncThunk(
  'test-result/get-all-test-result',
  async ({ testId }: { testId: string }) => {
    try {
      const response = await getAllTestResultService(testId);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const getAttempts = createAsyncThunk(
  'test-result/get-all-test-result-by-testid-and-userid',
  async ({ testId, userId }: { testId: string; userId: string }) => {
    try {
      const response = await getAttemptsService(testId, userId);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const getTestResultDetail = createAsyncThunk(
  'test-result/get-all-test-result-detail',
  async (testResultId: string) => {
    try {
      const response = await getTestResultDetailService(testResultId);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);
