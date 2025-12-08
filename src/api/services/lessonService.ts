import { jsonAxios } from '../axios/axios';
import type { CreateLessonDto, UpdateLessonDto } from '../requests';

export const getAllLessonService = async (id: string) =>
  await jsonAxios.get(`lessons?sessonId=${id}`);

export const getOneLessonService = async (id: string) =>
  await jsonAxios.get(`lessons/${id}`);

export const createLessonService = async (data: CreateLessonDto) =>
  await jsonAxios.post(`lessons`, data);

export const updateLessonService = async (id: string, data: UpdateLessonDto) =>
  await jsonAxios.put(`lessons/${id}`, data);

export const deleteLessonService = async (id: string) =>
  await jsonAxios.delete(`lessons/${id}`);
