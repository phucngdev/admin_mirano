import { jsonAxios } from '../axios/axios';
import type {
  CreateDocumentType,
  CreateSlideDto,
  DeleteDocumentType,
  UpdateSlideDto,
} from '../requests';

export const getPdfLessonService = async (id: string) =>
  await jsonAxios.get(`slide/${id}`);

export const createPdfLessonService = async (data: CreateSlideDto) =>
  await jsonAxios.post(`slide`, data);

export const updatePdfLessonService = async (
  id: string,
  data: UpdateSlideDto,
) => await jsonAxios.put(`slide/${id}`, data);

export const deletePdfLessonService = async (id: string) =>
  await jsonAxios.delete(`slide/${id}`);

export const deleteDocumentPdfLessonService = async (
  id: string,
  data: DeleteDocumentType,
) => await jsonAxios.delete(`slide/document/${id}`, { data });

export const createDocumentPdfLessonService = async (
  id: string,
  data: CreateDocumentType,
) => await jsonAxios.post(`slide/${id}`, data);
