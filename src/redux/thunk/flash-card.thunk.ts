import { CreateFlashCardDto, UpdateFlashCardDto } from '#/api/requests';
import {
  createFlashcardLessonService,
  deleteFlashcardLessonService,
  getFlashcardLessonService,
  importFlashcardLessonService,
  updateFlashcardLessonService,
} from '#/api/services/flashcardService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createFlashcard = createAsyncThunk(
  'flashcard/post-create-flashcard',
  async (data: CreateFlashCardDto) => {
    try {
      const response = await createFlashcardLessonService(data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const updateFlashcard = createAsyncThunk(
  'flashcard/put-flashcard',
  async ({ id, data }: { id: string; data: UpdateFlashCardDto }) => {
    try {
      const response = await updateFlashcardLessonService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const importFlashcard = createAsyncThunk(
  'flashcard/import-flashcard',
  async ({ id, data }: { id: string; data: File }) => {
    try {
      const response = await importFlashcardLessonService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const deleteFlashcard = createAsyncThunk(
  'flashcard/delete-flashcard',
  async (id: string) => {
    try {
      const response = await deleteFlashcardLessonService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const getAllFlashcard = createAsyncThunk(
  'flashcard/get-all-flashcard',
  async (id: string) => {
    try {
      const response = await getFlashcardLessonService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);
