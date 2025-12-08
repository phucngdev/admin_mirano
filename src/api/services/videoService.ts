import { jsonAxios } from '../axios/axios';
import type {
  CreateDocumentType,
  CreateVideoUrlDto,
  DeleteDocumentType,
  UpdateVideoUrlDto,
} from '../requests';

export const getVideoLessonService = async (id: string) =>
  await jsonAxios.get(`video-url/${id}`);

export const createVideoLessonService = async (data: CreateVideoUrlDto) =>
  await jsonAxios.post(`video-url`, data);

export const updateVideoLessonService = async (
  id: string,
  data: UpdateVideoUrlDto,
) => await jsonAxios.put(`video-url/${id}`, data);

export const deleteVideoLessonService = async (id: string) =>
  await jsonAxios.delete(`video-url/${id}`);

export const deleteDocumentVideoLessonService = async (
  id: string,
  data: DeleteDocumentType,
) => await jsonAxios.delete(`video-url/document/${id}`, { data });

export const createDocumentVideoLessonService = async (
  id: string,
  data: CreateDocumentType,
) => await jsonAxios.post(`video-url/${id}`, data);
