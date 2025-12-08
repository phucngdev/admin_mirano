import { CreateGrammarDto, UpdateGrammarDto } from '#/api/requests';
import {
  createGrammarService,
  deleteGrammarService,
  getGrammarService,
  updateGrammarService,
} from '#/api/services/grammarService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createGrammar = createAsyncThunk(
  'grammar/post-create-grammar',
  async (data: CreateGrammarDto) => {
    try {
      const response = await createGrammarService(data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const updateGrammar = createAsyncThunk(
  'grammar/put-grammar',
  async ({ id, data }: { id: string; data: UpdateGrammarDto }) => {
    try {
      const response = await updateGrammarService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const deleteGrammar = createAsyncThunk(
  'grammar/delete-grammar',
  async (id: string) => {
    try {
      const response = await deleteGrammarService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const getGrammar = createAsyncThunk(
  'grammar/get-grammar',
  async (id: string) => {
    try {
      const response = await getGrammarService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);
