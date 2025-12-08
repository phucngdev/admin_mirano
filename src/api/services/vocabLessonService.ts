import { formDataAxios, jsonAxios } from '../axios/axios';
import type { CreateCourseVocabDto, UpdateCourseVocabDto } from '../requests';

export const getVocabLessonService = async (id: string) =>
  await jsonAxios.get(`course-vocabs?lessonId=${id}`);

export const createVocabLessonService = async (data: CreateCourseVocabDto) =>
  await jsonAxios.post(`course-vocabs`, data);

export const updateVocabLessonService = async (
  id: string,
  data: UpdateCourseVocabDto,
) => await jsonAxios.put(`course-vocabs/${id}`, data);

export const deleteVocabLessonService = async (id: string) =>
  await jsonAxios.delete(`course-vocabs/${id}`);

export const importVocabLessonService = async (id: string, data: File) => {
  const formData = new FormData();
  formData.append('file', data);

  return await formDataAxios.post(
    `course-vocabs/import?lessonId=${id}`,
    formData,
    {
      headers: { 'Content-Type': undefined },
    },
  );
};
