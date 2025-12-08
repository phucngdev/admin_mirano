import { jsonAxios } from '../axios/axios';
import type {
  CreateDocumentType,
  CreateTextDto,
  DeleteDocumentType,
  UpdateTextDto,
} from '../requests';

export const getTextLessonService = async (id: string) =>
  await jsonAxios.get(`text/${id}`);

export const createTextLessonService = async (data: CreateTextDto) =>
  await jsonAxios.post(`text`, data);

export const updateTextLessonService = async (
  id: string,
  data: UpdateTextDto,
) => await jsonAxios.put(`text/${id}`, data);

export const deleteTextLessonService = async (id: string) =>
  await jsonAxios.delete(`text/${id}`);

export const deleteDocumentTextLessonService = async (
  id: string,
  data: DeleteDocumentType,
) => await jsonAxios.delete(`text/document/${id}`, { data });

export const createDocumentTextLessonService = async (
  id: string,
  data: CreateDocumentType,
) => await jsonAxios.post(`text/${id}`, data);
