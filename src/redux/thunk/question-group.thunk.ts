import { CreateQuestionGroupDto, UpdateQuestionGroupDto } from '#/api/requests';
import {
  createQuestionGroupService,
  deleteQuestionGroupService,
  getQuestionGroupService,
  updateQuestionGroupService,
} from '#/api/services/questionGroupService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createQuestionGroup = createAsyncThunk(
  'question-group/post-create-question-group',
  async (data: CreateQuestionGroupDto) => {
    try {
      const response = await createQuestionGroupService(data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const updateQuestionGroup = createAsyncThunk(
  'question-group/put-question-group',
  async ({ id, data }: { id: string; data: UpdateQuestionGroupDto }) => {
    try {
      const response = await updateQuestionGroupService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const deleteQuestionGroup = createAsyncThunk(
  'question-group/delete-question-group',
  async (id: string) => {
    try {
      const response = await deleteQuestionGroupService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const getQuestionGroup = createAsyncThunk(
  'question-group/get-question-group',
  async ({
    limit,
    offset,
    query,
    tag,
  }: {
    limit: number;
    offset: number;
    query: string;
    tag: string;
  }) => {
    try {
      const response = await getQuestionGroupService(limit, offset, query, tag);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);
