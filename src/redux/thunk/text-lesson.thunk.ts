import {
  CreateDocumentType,
  CreateTextDto,
  DeleteDocumentType,
  UpdateTextDto,
} from '#/api/requests';
import {
  createDocumentTextLessonService,
  createTextLessonService,
  deleteDocumentTextLessonService,
  getTextLessonService,
  updateTextLessonService,
} from '#/api/services/textLessonService';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const getTextLesson = createAsyncThunk(
  'text-lesson/get-text-lesson',
  async (id: string) => {
    try {
      const response = await getTextLessonService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const createTextLesson = createAsyncThunk(
  'text-lesson/post-create-text-lesson',
  async (data: CreateTextDto) => {
    try {
      const response = await createTextLessonService(data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const updateTextLesson = createAsyncThunk(
  'text-lesson/put-text-lesson',
  async ({ id, data }: { id: string; data: UpdateTextDto }) => {
    try {
      const response = await updateTextLessonService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const createDocumentTextLesson = createAsyncThunk(
  'text-lesson/post-document-lesson',
  async ({ id, data }: { id: string; data: CreateDocumentType }) => {
    try {
      const response = await createDocumentTextLessonService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const deleteDocumentTextLesson = createAsyncThunk(
  'text-lesson/delete-document-lesson',
  async ({ id, data }: { id: string; data: DeleteDocumentType }) => {
    try {
      const response = await deleteDocumentTextLessonService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);
