import {
  CreateQuestionDto,
  QuestionEntity,
  UpdateQuestionDto,
} from '#/api/requests';
import {
  createQuestionService,
  createQuestionToGroupService,
  deleteQuestionService,
  getAllQuestionService,
  updateQuestionService,
} from '#/api/services/questionService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllQuestion = createAsyncThunk(
  'question/get-all-question',
  async ({
    limit,
    offset,
    query,
    tag,
    type,
  }: {
    limit: number;
    offset: number;
    query: string;
    tag: string;
    type: QuestionEntity.type | null;
  }) => {
    try {
      const response = await getAllQuestionService(
        limit,
        offset,
        query,
        tag,
        type,
      );
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const createQuestion = createAsyncThunk(
  'question/post-create-question',
  async (data: CreateQuestionDto) => {
    try {
      const response = await createQuestionService(data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const createQuestionToGroup = createAsyncThunk(
  'question/post-create-question-to-group',
  async ({ id, data }: { id: string; data: CreateQuestionDto }) => {
    try {
      const response = await createQuestionToGroupService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const updateQuestion = createAsyncThunk(
  'question/put-question',
  async ({ id, data }: { id: string; data: UpdateQuestionDto }) => {
    try {
      const response = await updateQuestionService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const deleteQuestion = createAsyncThunk(
  'question/delete-question',
  async (id: string) => {
    try {
      const response = await deleteQuestionService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);
