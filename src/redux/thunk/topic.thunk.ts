import { CreateTopicDto, UpdateTopicDto } from '#/api/requests';
import {
  createTopicService,
  deleteTopicService,
  getAllTopicService,
  getOneTopicService,
  updateTopicService,
} from '#/api/services/topicService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllTopic = createAsyncThunk(
  'topic/get-all-topic',
  async ({
    limit,
    offset,
    query,
  }: {
    limit: number;
    offset: number;
    query: string;
  }) => {
    try {
      const response = await getAllTopicService(limit, offset, query);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const getOneTopic = createAsyncThunk(
  'topic/get-one-topic',
  async (id: string) => {
    try {
      const response = await getOneTopicService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const createTopic = createAsyncThunk(
  'topic/post-create-topic',
  async (data: CreateTopicDto) => {
    try {
      const response = await createTopicService(data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const updateTopic = createAsyncThunk(
  'topic/patch-update-topic',
  async ({ id, data }: { id: string; data: UpdateTopicDto }) => {
    try {
      const response = await updateTopicService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const deleteTopic = createAsyncThunk(
  'topic/delete-topic',
  async (id: string) => {
    try {
      const response = await deleteTopicService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);
