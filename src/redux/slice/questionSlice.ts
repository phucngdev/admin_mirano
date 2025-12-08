import { createSlice } from '@reduxjs/toolkit';
import {
  ExamEntity,
  IMeta,
  QuestionEntity,
  QuestionGroupEntity,
} from '#/api/requests';
import { createQuestion, getAllQuestion } from '../thunk/question.thunk';
import { getQuestionGroup } from '../thunk/question-group.thunk';
import { getAllExam } from '../thunk/exam.thunk';

interface QuestionState {
  data: {
    items: QuestionEntity[] | [];
    meta: IMeta;
  };
  group: {
    items: QuestionGroupEntity[] | [];
    meta: IMeta;
  };
  exam: {
    items: ExamEntity[] | [];
    meta: IMeta;
  };
  questionEdit: QuestionEntity | null;
}

const initialState: QuestionState = {
  data: {
    items: [],
    meta: {
      limit: 0,
      offset: 0,
      total: 0,
      totalPages: 0,
    },
  },
  group: {
    items: [],
    meta: {
      limit: 0,
      offset: 0,
      total: 0,
      totalPages: 0,
    },
  },
  exam: {
    items: [],
    meta: {
      limit: 0,
      offset: 0,
      total: 0,
      totalPages: 0,
    },
  },
  questionEdit: null,
};

const questionSlice = createSlice({
  initialState,
  name: 'question',
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllQuestion.fulfilled, (state, action) => {
        state.data = action.payload.data;
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        // const { data, statusCode } = action.payload;
        // if (statusCode === 201) {
        //   state.data.items.unshift(data);
        //   state.data.meta.total++;
        // }
      })
      .addCase(getQuestionGroup.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 200) {
          state.group = data;
        }
      })
      .addCase(getAllExam.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 200) {
          state.exam = data;
        }
      });
    // .addCase(createQuestionGroup.fulfilled, (state, action) => {
    //   const { data, statusCode } = action.payload;
    //   if (statusCode === 201 && state.lessonEdit) {
    //     if (!state.lessonEdit.question_group) {
    //       state.lessonEdit.question_group = [];
    //     }
    //     state.lessonEdit.question_group.push(data);
    //   }
    // })
    // .addCase(updateQuestionGroup.fulfilled, (state, action) => {
    //   const { data, statusCode } = action.payload;
    //   const { id } = action.meta.arg;
    //   if (
    //     statusCode === 200 &&
    //     state.lessonEdit &&
    //     state.lessonEdit.question_group
    //   ) {
    //     state.lessonEdit.question_group = state.lessonEdit.question_group
    //       .map(qs => (qs.id === id ? data : qs))
    //       .sort(
    //         (a: QuestionGroupEntity, b: QuestionGroupEntity) => a.pos - b.pos,
    //       );
    //   }
    // })
    // .addCase(deleteQuestionGroup.fulfilled, (state, action) => {
    //   const { statusCode } = action.payload;
    //   const { id, source } = action.meta.arg;
    //   if (
    //     statusCode === 200 &&
    //     source === 'fromCourse' &&
    //     state.lessonEdit &&
    //     state.lessonEdit.question_group
    //   ) {
    //     state.lessonEdit.question_group = state.lessonEdit.question_group
    //       .filter(qs => qs.id !== id)
    //       .sort(
    //         (a: QuestionGroupEntity, b: QuestionGroupEntity) => a.pos - b.pos,
    //       );
    //   }
    // })
  },
});

export default questionSlice.reducer;
