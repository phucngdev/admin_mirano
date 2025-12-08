import { formDataAxios, jsonAxios } from '../axios/axios';
import type { CreateKanjiDto, UpdateKanjiDto } from '../requests';

export const getAllKanjiService = async (id: string) =>
  await jsonAxios.get(`kanjis?lessonId=${id}`);

export const importKanjiService = async (id: string, data: File) => {
  const formData = new FormData();
  formData.append('file', data);

  return await formDataAxios.post(`kanjis/import?lessonId=${id}`, formData, {
    headers: { 'Content-Type': undefined },
  });
};

export const getOneKanjiService = async (id: string) =>
  await jsonAxios.get(`kanjis/${id}`);

export const createKanjiService = async (data: CreateKanjiDto) =>
  await jsonAxios.post(`kanjis`, data);

export const updateKanjiService = async (id: string, data: UpdateKanjiDto) =>
  await jsonAxios.put(`kanjis/${id}`, data);

export const deleteKanjiService = async (id: string) =>
  await jsonAxios.delete(`kanjis/${id}`);
