import {
  CreateQuestionFlashCardDto,
  UpdateQuestionFlashCardDto,
} from '#/api/requests';
import {
  createQuestionQuizService,
  deleteQuestionQuizService,
  importExcelQuestionFlashcardLessonService,
  updateQuestionQuizService,
} from '#/api/services/questionQuizFlashcadService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createQuestionQuiz = createAsyncThunk(
  'question-quiz/create-question-quiz',
  async ({ id, data }: { id: string; data: CreateQuestionFlashCardDto }) => {
    try {
      const response = await createQuestionQuizService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const updateQuestionQuiz = createAsyncThunk(
  'question-quiz/update-question-quiz',
  async ({ id, data }: { id: string; data: UpdateQuestionFlashCardDto }) => {
    try {
      const response = await updateQuestionQuizService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const deleteQuestionQuiz = createAsyncThunk(
  'question-quiz/delete-question-quiz',
  async (id: string) => {
    try {
      const response = await deleteQuestionQuizService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const importExcelQuestionFlashcard = createAsyncThunk(
  'question-quiz/import-question-quiz',
  async ({ id, data }: { id: string; data: File }) => {
    try {
      const response = await importExcelQuestionFlashcardLessonService(
        id,
        data,
      );
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);
