import { formDataAxios, jsonAxios } from '../axios/axios';
import type { CreateFlashCardDto, UpdateFlashCardDto } from '../requests';

export const getFlashcardLessonService = async (id: string) =>
  await jsonAxios.get(`flash-card/${id}`);

export const createFlashcardLessonService = async (data: CreateFlashCardDto) =>
  await jsonAxios.post(`flash-card`, data);

export const updateFlashcardLessonService = async (
  id: string,
  data: UpdateFlashCardDto,
) => await jsonAxios.put(`flash-card/${id}`, data);

export const deleteFlashcardLessonService = async (id: string) =>
  await jsonAxios.delete(`flash-card/${id}`);

export const importFlashcardLessonService = async (id: string, data: File) => {
  const formData = new FormData();
  formData.append('file', data);

  return await formDataAxios.post(
    `flash-card/import-excel?lessonId=${id}`,
    formData,
    {
      headers: { 'Content-Type': undefined },
    },
  );
};
