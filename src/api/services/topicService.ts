import { jsonAxios } from '../axios/axios';
import type { CreateTopicDto, UpdateTopicDto } from '../requests';

export const getAllTopicService = async (
  limit: number,
  offset: number,
  query: string,
) => {
  const params = new URLSearchParams();

  params.append('limit', limit.toString());
  params.append('offset', offset.toString());

  if (query) params.append('name', query);

  return await jsonAxios.get(`topics?${params.toString()}`);
};

export const getOneTopicService = async (id: string) =>
  await jsonAxios.get(`topics/${id}`);

export const createTopicService = async (data: CreateTopicDto) =>
  await jsonAxios.post(`topics`, data);

export const updateTopicService = async (id: string, data: UpdateTopicDto) =>
  await jsonAxios.put(`topics/${id}`, data);

export const deleteTopicService = async (id: string) =>
  await jsonAxios.delete(`topics/${id}`);
