import { jsonAxios } from '../axios/axios';
import type { CreateSessonDto, UpdateSessonDto } from '../requests';

export const getAllChapterService = async (courseId: string) =>
  await jsonAxios.get(`sessons?courseId=${courseId}`);

export const deleteChapterService = async (id: string) =>
  await jsonAxios.delete(`sessons/${id}`);

export const createChapterService = async (data: CreateSessonDto) =>
  await jsonAxios.post(`sessons`, data);

export const updatechapterService = async (id: string, data: UpdateSessonDto) =>
  await jsonAxios.put(`sessons/${id}`, data);
