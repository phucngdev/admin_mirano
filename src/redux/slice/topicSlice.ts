import { createSlice } from '@reduxjs/toolkit';
import { getAllTopic, getOneTopic } from '../thunk/topic.thunk';
import { IMeta, TopicEntity } from '#/api/requests';

interface TopicState {
  status: 'idle' | 'pending' | 'successfully' | 'failed';
  data: {
    items: TopicEntity[] | [];
    meta: IMeta;
  };
  topicEdit: TopicEntity | null;
}

const initialState: TopicState = {
  data: {
    items: [],
    meta: {
      limit: 0,
      offset: 0,
      total: 0,
      totalPages: 0,
    },
  },
  topicEdit: null,
  status: 'idle',
};

const topicSlice = createSlice({
  initialState,
  name: 'topic',
  reducers: {},
  extraReducers: builder => {
    builder

      .addCase(getAllTopic.fulfilled, (state, action) => {
        state.status = 'successfully';
        state.data = action.payload.data;
      })
      .addCase(getOneTopic.fulfilled, (state, action) => {
        state.status = 'successfully';
        state.topicEdit = action.payload.data;
      });
  },
});

export default topicSlice.reducer;
