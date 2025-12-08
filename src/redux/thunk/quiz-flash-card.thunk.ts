import { CreateQuizFlashCardDto, UpdateQuizFlashCardDto } from '#/api/requests';
import {
  createQuizFlashCardervice,
  deleteQuizFlashCardervice,
  getQuizFlashCardervice,
  updateQuizFlashCardervice,
} from '#/api/services/quizFlashcardService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getQuizFlashcard = createAsyncThunk(
  'quiz-fl-card/get-quiz-fl-card',
  async (id: string) => {
    try {
      const response = await getQuizFlashCardervice(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const createQuizFlashcard = createAsyncThunk(
  'quiz-fl-card/create-quiz-fl-card',
  async (data: CreateQuizFlashCardDto) => {
    try {
      const response = await createQuizFlashCardervice(data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const updateQuizFlashcard = createAsyncThunk(
  'quiz-fl-card/update-quiz-fl-card',
  async ({ id, data }: { id: string; data: UpdateQuizFlashCardDto }) => {
    try {
      const response = await updateQuizFlashCardervice(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const deleteQuizFlashcard = createAsyncThunk(
  'quiz-fl-card/delete-quiz-fl-card',
  async (id: string) => {
    try {
      const response = await deleteQuizFlashCardervice(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);
