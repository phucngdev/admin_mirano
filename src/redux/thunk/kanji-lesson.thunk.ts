import { CreateKanjiDto, UpdateKanjiDto } from '#/api/requests';
import {
  createKanjiService,
  deleteKanjiService,
  getAllKanjiService,
  importKanjiService,
  updateKanjiService,
} from '#/api/services/kanjiService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createKanji = createAsyncThunk(
  'kanji/post-create-kanji',
  async (data: CreateKanjiDto) => {
    try {
      const response = await createKanjiService(data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const updateKanji = createAsyncThunk(
  'kanji/put-kanji',
  async ({ id, data }: { id: string; data: UpdateKanjiDto }) => {
    try {
      const response = await updateKanjiService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const deleteKanji = createAsyncThunk(
  'kanji/delete-kanji',
  async (id: string) => {
    try {
      const response = await deleteKanjiService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const getAllKanji = createAsyncThunk(
  'kanji/get-all-kanji',
  async (id: string) => {
    try {
      const response = await getAllKanjiService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const importAllKanji = createAsyncThunk(
  'kanji/import-all-kanji',
  async ({ id, data }: { id: string; data: File }) => {
    try {
      const response = await importKanjiService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);
