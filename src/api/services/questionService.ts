import { formDataAxios, jsonAxios } from '../axios/axios';
import type {
  CreateQuestionDto,
  QuestionEntity,
  UpdateQuestionDto,
} from '../requests';

export const getAllQuestionService = async (
  limit: number,
  offset: number,
  query: string,
  tag: string,
  type: QuestionEntity.type | null,
) => {
  const params = new URLSearchParams();

  params.append('limit', limit.toString());
  params.append('offset', offset.toString());

  if (query) params.append('search', query);
  if (tag) params.append('tag', tag);
  if (type) params.append('type', type);

  return await jsonAxios.get(`questions?${params.toString()}`);
};

export const createQuestionService = async (data: CreateQuestionDto) =>
  await jsonAxios.post(`questions`, data);

export const createQuestionToGroupService = async (
  id: string,
  data: CreateQuestionDto,
) => await jsonAxios.post(`questions/${id}/create-to-group`, data);

export const updateQuestionService = async (
  id: string,
  data: UpdateQuestionDto,
) => await jsonAxios.put(`questions/${id}`, data);

export const deleteQuestionService = async (id: string) =>
  await jsonAxios.delete(`questions/${id}`);

export const deleteDocumentQuestionService = async (
  id: string,
  data: {
    documentId: string;
  },
) => await jsonAxios.delete(`questions/document/${id}`, { data });

export const createDocumentQuestionService = async (
  id: string,
  data: {
    name: string;
    url: string;
  },
) => await jsonAxios.post(`questions/document/${id}`, data);

export const deleteMultipleQuestionService = async (ids: string) =>
  await jsonAxios.delete(`questions/multiple/${ids}`);

export const updateTagMultipleQuestionService = async (
  ids: string,
  tag: string,
) =>
  await jsonAxios.put(`questions/${ids}/tag`, {
    tag,
  });

export const importQuestionService = async (data: File) => {
  const formData = new FormData();
  formData.append('file', data);

  return await formDataAxios.post(`questions/import-excel/question`, formData, {
    headers: { 'Content-Type': undefined },
  });
};
