import {
  createVocabService,
  deleteVocabbService,
  getAllVocabService,
  updateVocabService,
} from '#/api/services/vocabService';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ImportVocabExcelService } from '../../api/services/vocabService';
import { CreateTopicVocabDto, UpdateTopicVocabDto } from '#/api/requests';

export const getAllVocab = createAsyncThunk(
  'vocab/get-all-vocab',
  async ({
    id,
    limit,
    offset,
  }: {
    id: string;
    limit: number;
    offset: number;
  }) => {
    try {
      const response = await getAllVocabService(id, limit, offset);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
    }
  },
);

export const createVocab = createAsyncThunk(
  'vocab/post-create-vocab',
  async (data: CreateTopicVocabDto) => {
    try {
      const response = await createVocabService(data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const updateVocab = createAsyncThunk(
  'vocab/patch-update-vocab',
  async ({ id, data }: { id: string; data: UpdateTopicVocabDto }) => {
    try {
      const response = await updateVocabService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const deleteVocab = createAsyncThunk(
  'vocab/delete-vocab',
  async (id: string) => {
    try {
      const response = await deleteVocabbService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const ImportVocabExcel = createAsyncThunk(
  'vocab/import-vocab',
  async ({ id, data }: { id: string; data: File }) => {
    try {
      const response = await ImportVocabExcelService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);
