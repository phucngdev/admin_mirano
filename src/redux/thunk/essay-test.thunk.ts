import { UpdateEssayTestDto } from '#/api/requests';
import {
  getAllExamCourseInClassService,
  getAllResultByExamIdService,
  updateScoreEssayTestService,
} from '#/api/services/essayTestService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllExamCourseInClass = createAsyncThunk(
  'essay-test/get-all-exam-course-in-class',
  async (courseId: string) => {
    try {
      const response = await getAllExamCourseInClassService(courseId);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const getAllResultByExamId = createAsyncThunk(
  'essay-test/get-all-result-by-examid',
  async ({ examId, classId }: { examId: string; classId: string }) => {
    try {
      const response = await getAllResultByExamIdService(examId, classId);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const updateScoreEssayTest = createAsyncThunk(
  'essay-test/update-score-essay',
  async ({ id, data }: { id: string; data: UpdateEssayTestDto }) => {
    try {
      const response = await updateScoreEssayTestService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);
