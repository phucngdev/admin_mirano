import { jsonAxios } from '../axios/axios';
import type {
  CreateQuizFlashCardDto,
  UpdateQuizFlashCardDto,
} from '../requests';

export const getQuizFlashCardervice = async (id: string) =>
  await jsonAxios.get(`quiz-flash-card/${id}`);

export const createQuizFlashCardervice = async (data: CreateQuizFlashCardDto) =>
  await jsonAxios.post(`quiz-flash-card`, data);

export const updateQuizFlashCardervice = async (
  id: string,
  data: UpdateQuizFlashCardDto,
) => await jsonAxios.put(`quiz-flash-card/${id}`, data);

export const deleteQuizFlashCardervice = async (id: string) =>
  await jsonAxios.delete(`quiz-flash-card/${id}`);
