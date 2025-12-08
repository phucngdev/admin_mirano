import { jsonAxios } from '../axios/axios';
import type { CreateTestCategoryDto, UpdateTestCategoryDto } from '../requests';

export const getTestCategoryService = async (limit: number, offset: number) =>
  await jsonAxios.get(`test-category?limit=${limit}&offset=${offset}`);

export const createTestCategoryService = async (data: CreateTestCategoryDto) =>
  await jsonAxios.post(`test-category`, data);

export const updateTestCategoryService = async (
  id: string,
  data: UpdateTestCategoryDto,
) => await jsonAxios.put(`test-category/${id}`, data);

export const getOneTestCategoryService = async (id: string) =>
  await jsonAxios.get(`test-category/${id}`);

export const deleteTestCategoryService = async (id: string) =>
  await jsonAxios.delete(`test-category/${id}`);
