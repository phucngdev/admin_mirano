import { jsonAxios } from '../axios/axios';
import type { CreateGrammarDto, UpdateGrammarDto } from '../requests';

export const createGrammarService = async (data: CreateGrammarDto) =>
  await jsonAxios.post(`grammars`, data);

export const updateGrammarService = async (
  id: string,
  data: UpdateGrammarDto,
) => await jsonAxios.put(`grammars/${id}`, data);

export const deleteGrammarService = async (id: string) =>
  await jsonAxios.delete(`grammars/${id}`);

export const getGrammarService = async (id: string) =>
  await jsonAxios.get(`grammars?lessonId=${id}`);
