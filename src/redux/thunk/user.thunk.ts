import { UpsertUserDto } from '#/api/requests';
import {
  getAllUserService,
  getMeService,
  getOneUserService,
} from '#/api/services/userService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllUser = createAsyncThunk(
  'user/get-all-user',
  async ({
    limit,
    offset,
    query,
    userProfiles,
  }: {
    limit: number;
    offset: number;
    query: string;
    userProfiles?: UpsertUserDto.userProfiles;
  }) => {
    try {
      const response = await getAllUserService(
        limit,
        offset,
        query,
        userProfiles,
      );
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const getMe = createAsyncThunk('user/get-me', async () => {
  try {
    const response = await getMeService();
    return response.data;
  } catch (error) {
    console.log('🚀 ~ error:', error);
    return error;
  }
});

export const getOneUser = createAsyncThunk(
  'user/get-one-user',
  async (id: string) => {
    try {
      const response = await getOneUserService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);
