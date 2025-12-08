import { jsonAxios } from '../axios/axios';
import type { CreateTestDto, UpdateTestDto } from '../requests';

export const getAllTestService = async (
  categoryId: string,
  limit: number,
  offset: number,
) => await jsonAxios.get(`test/${categoryId}?limit=${limit}&offset=${offset}`);

export const createTestService = async (data: CreateTestDto) =>
  await jsonAxios.post(`test`, data);

export const updateTestService = async (id: string, data: UpdateTestDto) =>
  await jsonAxios.put(`test/${id}`, data);

export const deleteTestService = async (id: string) =>
  await jsonAxios.delete(`test/${id}`);
