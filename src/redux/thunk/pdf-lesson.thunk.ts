import {
  CreateDocumentType,
  CreateSlideDto,
  DeleteDocumentType,
  UpdateSlideDto,
} from '#/api/requests';
import {
  createDocumentPdfLessonService,
  createPdfLessonService,
  deleteDocumentPdfLessonService,
  getPdfLessonService,
  updatePdfLessonService,
} from '#/api/services/pdfService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getPdfLesson = createAsyncThunk(
  'pdf-lesson/get-pdf-lesson',
  async (id: string) => {
    try {
      const response = await getPdfLessonService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const createPdfLesson = createAsyncThunk(
  'pdf-lesson/post-create-pdf-lesson',
  async (data: CreateSlideDto) => {
    try {
      const response = await createPdfLessonService(data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const updatePdfLesson = createAsyncThunk(
  'pdf-lesson/put-pdf-lesson',
  async ({ id, data }: { id: string; data: UpdateSlideDto }) => {
    try {
      const response = await updatePdfLessonService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const createDocumentPdfLesson = createAsyncThunk(
  'pdf-lesson/post-document-lesson',
  async ({ id, data }: { id: string; data: CreateDocumentType }) => {
    try {
      const response = await createDocumentPdfLessonService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const deleteDocumentPdfLesson = createAsyncThunk(
  'pdf-lesson/delete-document-lesson',
  async ({ id, data }: { id: string; data: DeleteDocumentType }) => {
    try {
      const response = await deleteDocumentPdfLessonService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);
