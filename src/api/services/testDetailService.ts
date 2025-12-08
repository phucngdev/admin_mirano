import { jsonAxios } from '../axios/axios';
import type { CreateTestDetailDto, UpdateTestDetailDto } from '../requests';

export const getAllTestDetailService = async (
  testId: string,
  limit?: number,
  offset?: number,
) => {
  const params = new URLSearchParams();

  // if (limit) params.append('limit', limit.toString());
  // if (offset) params.append('offset', offset.toString());
  params.append('limit', '0');
  params.append('offset', '0');

  return await jsonAxios.get(`test-detail/${testId}?${params.toString()}`);
};

export const createTestDetailService = async (data: CreateTestDetailDto) =>
  await jsonAxios.post(`test-detail`, data);

export const updateTestDetailService = async (
  id: string,
  data: UpdateTestDetailDto,
) => await jsonAxios.put(`test-detail/me/${id}`, data);

export const deleteTestDetailService = async (id: string) =>
  await jsonAxios.delete(`test-detail/me/${id}`);
