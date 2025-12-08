import { jsonAxios } from '../axios/axios';
import type { CreateExamDto, UpdateExamDto } from '../requests';

export const getAllExamService = async (
  limit: number,
  offset: number,
  query: string,
) => {
  const params = new URLSearchParams();

  params.append('limit', limit.toString());
  params.append('offset', offset.toString());

  if (query) params.append('q', query);

  return await jsonAxios.get(`exams?${params.toString()}`);
};

export const createExamService = async (data: CreateExamDto) =>
  await jsonAxios.post(`exams`, data);

export const updateExamService = async (id: string, data: UpdateExamDto) =>
  await jsonAxios.put(`exams/${id}`, data);

export const deleteExamService = async (id: string) =>
  await jsonAxios.delete(`exams/${id}`);
