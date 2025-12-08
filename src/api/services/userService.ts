import { formDataAxios, jsonAxios } from '../axios/axios';
import type {
  UpdateUserDto,
  UpdateUserPasswordDto,
  UpsertUserDto,
} from '../requests';

export const getAllUserService = async (
  limit: number,
  offset: number,
  query: string,
  userProfiles?: UpsertUserDto.userProfiles,
) => {
  const params = new URLSearchParams();

  params.append('limit', limit.toString());
  params.append('offset', offset.toString());

  if (query) params.append('q', query);
  if (userProfiles) params.append('userProfile', userProfiles);

  return await jsonAxios.get(`users?${params.toString()}`);
};

export const exportReportService = async (id: string) =>
  await jsonAxios.get(`users/export/${id}`, {
    responseType: 'arraybuffer',
  });

export const getMeService = async () => await jsonAxios.get('user/me');

export const getOneUserService = async (id: string) =>
  await jsonAxios.get(`users/${id}`);

export const deleteUserService = async (id: string) =>
  await jsonAxios.delete(`users/${id}`);

export const createUserService = async (data: UpsertUserDto) =>
  await jsonAxios.post(`users`, data);

export const updateUserService = async (id: string, data: UpsertUserDto) =>
  await jsonAxios.put(`users/${id}`, data);

export const updatePasswordService = async (data: UpdateUserPasswordDto) =>
  await jsonAxios.put(`users/me/update-password`, data);

export const importUserService = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  return await formDataAxios.post(`users/import`, formData, {
    headers: { 'Content-Type': undefined },
  });
};
