import { jsonAxios } from '../axios/axios';
import type {
  CreateExamAndAddToLessonDto,
  CreateExamLessonDto,
  UpdateExamLessonDto,
} from '../requests';

export const getExamLessonService = async (lessonId: string) =>
  await jsonAxios.get(`exam-lesson/admin/${lessonId}`);

export const createExamLessonService = async (
  lessonId: string,
  data: CreateExamLessonDto,
) => await jsonAxios.post(`exam-lesson/lesson/${lessonId}`, data);

export const createAndAddExamLessonService = async (
  lessonId: string,
  data: CreateExamAndAddToLessonDto,
) => await jsonAxios.post(`exam-lesson/create-and-add/${lessonId}`, data);

export const deleteExamLessonService = async (
  examId: string,
  lessonId: string,
) => await jsonAxios.delete(`exam-lesson/${examId}/${lessonId}`);

export const updateControlExamLessonService = async (
  examId: string,
  lessonId: string,
  data: UpdateExamLessonDto,
) => await jsonAxios.put(`exam-lesson/${examId}/${lessonId}`, data);
