import { createSlice } from '@reduxjs/toolkit';
import {
  IMeta,
  TestCategoryEntity,
  TestEntity,
  TestResultAdminAttemptCountEntity,
  TestResultAdminEntity,
} from '#/api/requests';
import {
  createTestCategory,
  getOneTestCategory,
  getTestCategory,
  updateTestCategory,
} from '../thunk/test-category.thunk';
import { getAllTest, updateTest } from '../thunk/test.thunk';
import {
  createTestDetail,
  deleteTestDetail,
  getAllTestDetail,
  updateTestDetail,
} from '../thunk/test-detail.thunk';
import {
  createQuestionGroup,
  deleteQuestionGroup,
  updateQuestionGroup,
} from '../thunk/question-group.thunk';
import { createQuestionToGroup, updateQuestion } from '../thunk/question.thunk';
import { TestDetailResponse } from '#/api/requests/response/TestDetailResponse';
import Cookies from 'js-cookie';
import {
  getAllTestResult,
  getAttempts,
  getTestResultDetail,
} from '../thunk/test-result.thunk';

interface TestState {
  data: {
    items: TestCategoryEntity[] | [];
    meta: IMeta;
  };
  dataTest: {
    items: TestEntity[] | [];
    meta: IMeta;
  };
  testEdit: TestCategoryEntity | null;
  testRessult: any | null;
  testResultDetail: TestResultAdminEntity | null;
  testRessultByTestIdAndUserId: TestResultAdminAttemptCountEntity[] | [];
  testDetail: {
    items: TestDetailResponse[] | [];
    meta: IMeta;
  };
}

const initialState: TestState = {
  data: {
    items: [],
    meta: {
      limit: 0,
      offset: 0,
      total: 0,
      totalPages: 0,
    },
  },
  dataTest: {
    items: [],
    meta: {
      limit: 0,
      offset: 0,
      total: 0,
      totalPages: 0,
    },
  },
  testDetail: {
    items: [],
    meta: {
      limit: 0,
      offset: 0,
      total: 0,
      totalPages: 0,
    },
  },
  testRessult: null,
  testRessultByTestIdAndUserId: [],
  testResultDetail: null,
  testEdit: null,
};

const testSlice = createSlice({
  initialState,
  name: 'test',
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTestCategory.fulfilled, (state, action) => {
        state.data = action.payload.data;
      })
      .addCase(getAllTestResult.fulfilled, (state, action) => {
        state.testRessult = action.payload.data;
      })
      .addCase(getAttempts.fulfilled, (state, action) => {
        state.testRessultByTestIdAndUserId = action.payload.data;
      })
      .addCase(getTestResultDetail.fulfilled, (state, action) => {
        state.testResultDetail = action.payload.data;
      })
      .addCase(getOneTestCategory.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 200) {
          Cookies.set(
            'test-active',
            JSON.stringify({
              id: data.id,
              name: data.name,
            }),
            {
              expires: 1,
            },
          );
          state.testEdit = action.payload.data;
        }
      })
      .addCase(getAllTestDetail.fulfilled, (state, action) => {
        state.testDetail = action.payload.data;
      })
      .addCase(createTestDetail.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 201) {
          state.testDetail.items[0].details.push(data);
        }
      })
      .addCase(deleteTestDetail.fulfilled, (state, action) => {
        const { statusCode } = action.payload;
        const id = action.meta.arg;
        if (statusCode === 200) {
          state.testDetail.items[0].details =
            state.testDetail.items[0].details.filter(item => item.id !== id);
        }
      })
      .addCase(updateTestDetail.fulfilled, (state, action) => {
        const { id } = action.meta.arg;
        const { data, statusCode } = action.payload;
        if (statusCode === 200) {
          state.testDetail.items[0].details =
            state.testDetail.items[0].details.map(item =>
              item.id === id
                ? {
                    ...item,
                    name: data.name,
                    point: data.point,
                    timeLimit: data.timeLimit,
                  }
                : item,
            );
        }
      })
      .addCase(getAllTest.fulfilled, (state, action) => {
        state.dataTest = action.payload.data;
      })
      .addCase(updateTest.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        const { id } = action.meta.arg;
        if (statusCode === 200 && state.dataTest.items) {
          state.dataTest.items = state.dataTest.items.map(s =>
            s.id === id ? data : s,
          );
        }
      })
      .addCase(updateTestCategory.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        const { id } = action.meta.arg;
        if (statusCode === 200) {
          state.data.items = state.data.items.map(s =>
            s.id === id ? data : s,
          );
          state.testEdit = {
            ...data,
            classes: state.testEdit?.classes.filter(item =>
              data.classIds.includes(item.id),
            ),
          };
        }
      })
      .addCase(createTestCategory.fulfilled, (state, action) => {
        // state.testEdit = action.payload.data;
      })
      .addCase(deleteQuestionGroup.fulfilled, (state, action) => {
        // const { id, source } = action.meta.arg;
        // const { statusCode } = action.payload;
        // if (statusCode === 200 && source === 'fromTest') {
        //   const details = state.testDetail.items[0].details;
        //   for (const detail of details) {
        //     const index = detail.questionGroups.findIndex(
        //       group => group.id === id,
        //     );
        //     if (index !== -1) {
        //       detail.questionGroups.splice(index, 1);
        //       break;
        //     }
        //   }
        // }
      })
      .addCase(createQuestionGroup.fulfilled, (state, action) => {
        // const { data, statusCode } = action.payload;
        // if (
        //   statusCode === 201 &&
        //   data.type === QuestionGroupEntity.type.TEST_DETAIL
        // ) {
        //   const testDetailItem = state.testDetail.items[0].details.find(
        //     item => item.id === data.testDetailId,
        //   );
        //   if (testDetailItem) {
        //     testDetailItem.questionGroups.push(data);
        //   }
        // }
      })
      .addCase(updateQuestionGroup.fulfilled, (state, action) => {
        // const { data, statusCode } = action.payload;
        // const questionGroupId = action.meta.arg.id;
        // if (
        //   statusCode === 200 &&
        //   data.type === QuestionGroupEntity.type.TEST_DETAIL
        // ) {
        //   const testDetailItem = state.testDetail.items[0].details.find(
        //     item => item.id === data.testDetailId,
        //   );
        //   if (testDetailItem) {
        //     const index = testDetailItem.questionGroups.findIndex(
        //       item => item.id === questionGroupId,
        //     );
        //     if (index !== -1) {
        //       testDetailItem.questionGroups[index] = {
        //         ...testDetailItem.questionGroups[index],
        //         ...data,
        //       };
        //     }
        //   }
        // }
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        const { id } = action.meta.arg;
        if (statusCode === 200 && data.explain === 'Câu hỏi thi thử') {
          const details = state.testDetail.items[0].details;
          for (const detail of details) {
            const group = detail.questionGroups.find(g =>
              g.questions.some(q => q.id === id),
            );
            if (group) {
              const question = group.questions.find(q => q.id === id);
              if (question) {
                Object.assign(question, data);
                break;
              }
            }
          }
        }
      })
      .addCase(createQuestionToGroup.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        const { id } = action.meta.arg;
        if (statusCode === 201 && data.explain === 'Câu hỏi thi thử') {
          for (const detail of state.testDetail.items[0].details) {
            const group = detail.questionGroups.find(g => g.id === id);
            if (group) {
              group.questions.push(data);
              break;
            }
          }
        }
      });
  },
});

export default testSlice.reducer;
