import { formDataAxios, jsonAxios } from '../axios/axios';
import type {
  CreateQuestionFlashCardDto,
  UpdateQuestionFlashCardDto,
} from '../requests';

export const createQuestionQuizService = async (
  id: string,
  data: CreateQuestionFlashCardDto,
) => await jsonAxios.post(`question-flash-card/${id}`, data);

export const updateQuestionQuizService = async (
  id: string,
  data: UpdateQuestionFlashCardDto,
) => await jsonAxios.put(`question-flash-card/${id}`, data);

export const deleteQuestionQuizService = async (id: string) =>
  await jsonAxios.delete(`question-flash-card/${id}`);

export const importExcelQuestionFlashcardLessonService = async (
  id: string,
  data: File,
) => {
  const formData = new FormData();
  formData.append('file', data);

  return await formDataAxios.post(
    `question-flash-card/import-excel/question?quizId=${id}`,
    formData,
    {
      headers: { 'Content-Type': undefined },
    },
  );
};
