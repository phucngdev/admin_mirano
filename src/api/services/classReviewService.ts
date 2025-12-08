import { jsonAxios } from '../axios/axios';
import type { CreateClassReviewDto, UpdateClassReviewDto } from '../requests';

export const createReviewService = async (data: CreateClassReviewDto) =>
  await jsonAxios.post(`class-reviews`, data);

export const updateReviewService = async (
  id: string,
  data: UpdateClassReviewDto,
) => await jsonAxios.put(`class-reviews/${id}`, data);

export const deleteReviewService = async (id: string) =>
  await jsonAxios.delete(`class-reviews/${id}`);
