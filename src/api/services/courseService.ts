import { jsonAxios } from '../axios/axios';
import type { CreateCourseDto, UpdateCourseDto } from '../requests';

export const getAllCourseService = async (
  limit: number,
  offset: number,
  query: string,
  status?: 'ACTIVE' | 'INACTIVE' | '',
  order?: 'updatedAt' | 'createdAt' | '',
  classId?: string,
) => {
  const params = new URLSearchParams();

  params.append('limit', limit.toString());
  params.append('offset', offset.toString());

  if (query) params.append('q', query);
  if (status) params.append('status', status);
  if (classId) params.append('classId', classId);
  if (order) params.append('order', `${order}:asc`);

  return await jsonAxios.get(`courses?${params.toString()}`);
};

export const getOneCourseService = async (id: string) =>
  await jsonAxios.get(`courses/${id}`);

export const createCourseService = async (data: CreateCourseDto) =>
  await jsonAxios.post(`courses`, data);

export const updateCourseService = async (id: string, data: UpdateCourseDto) =>
  await jsonAxios.put(`courses/${id}`, data);

export const deleteCourseService = async (id: string) =>
  await jsonAxios.delete(`courses/${id}`);
