import { jsonAxios } from '../axios/axios';
import type {
  CreateQuestionGroupDto,
  UpdateQuestionGroupDto,
} from '../requests';

export const createQuestionGroupService = async (
  data: CreateQuestionGroupDto,
) => await jsonAxios.post(`question-groups`, data);

export const updateQuestionGroupService = async (
  id: string,
  data: UpdateQuestionGroupDto,
) => await jsonAxios.put(`question-groups/${id}`, data);

export const deleteQuestionGroupService = async (id: string) =>
  await jsonAxios.delete(`question-groups/${id}`);

export const getQuestionGroupService = async (
  limit: number,
  offset: number,
  query: string,
  tag: string,
) => {
  const params = new URLSearchParams();

  params.append('limit', limit.toString());
  params.append('offset', offset.toString());

  if (query) params.append('content', query);
  if (tag) params.append('tag', tag);

  return await jsonAxios.get(`question-groups?${params.toString()}`);
};
