import { createSlice } from '@reduxjs/toolkit';
import { IMeta, TopicVocabEntity } from '#/api/requests';
import { getAllVocab, ImportVocabExcel } from '../thunk/vocab.thunk';

interface VocabState {
  status: 'idle' | 'pending' | 'successfully' | 'failed';
  data: {
    items: TopicVocabEntity[] | [];
    meta: IMeta;
  };
  topicEdit: TopicVocabEntity | null;
}

const initialState: VocabState = {
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

const vocabSlice = createSlice({
  initialState,
  name: 'vocab',
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllVocab.fulfilled, (state, action) => {
        state.status = 'successfully';
        state.data = action.payload.data;
      })
      .addCase(ImportVocabExcel.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 201) {
          // state.data = data;
        }
      });
  },
});

export default vocabSlice.reducer;
