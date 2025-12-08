import { jsonAxios } from '../axios/axios';
import type { CreateAudioUrlDto, UpdateAudioUrlDto } from '../requests';

export const getAudioLessonService = async (id: string) =>
  await jsonAxios.get(`audio-url/${id}`);

export const createAudioLessonService = async (data: CreateAudioUrlDto) =>
  await jsonAxios.post(`audio-url`, data);

export const updateAudioLessonService = async (
  id: string,
  data: UpdateAudioUrlDto,
) => await jsonAxios.put(`audio-url/${id}`, data);

export const deleteAudioLessonService = async (id: string) =>
  await jsonAxios.delete(`audio-url/${id}`);
