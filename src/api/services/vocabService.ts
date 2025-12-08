import { formDataAxios, jsonAxios } from '../axios/axios';
import type { CreateTopicVocabDto, UpdateTopicVocabDto } from '../requests';

export const getAllVocabService = async (
  id: string,
  limit: number,
  offset: number,
) =>
  await jsonAxios.get(
    `topic-vocabs?topicId=${id}&limit=${limit}&offset=${offset}`,
  );

export const createVocabService = async (data: CreateTopicVocabDto) =>
  await jsonAxios.post(`topic-vocabs`, data);

export const updateVocabService = async (
  id: string,
  data: UpdateTopicVocabDto,
) => await jsonAxios.put(`topic-vocabs/${id}`, data);

export const deleteVocabbService = async (id: string) =>
  await jsonAxios.delete(`topic-vocabs/${id}`);

export const ImportVocabExcelService = async (id: string, data: File) => {
  const formData = new FormData();
  formData.append('file', data);
  return await formDataAxios.post(
    `topic-vocabs/import?topicId=${id}`,
    formData,
    {
      headers: { 'Content-Type': undefined },
    },
  );
};
