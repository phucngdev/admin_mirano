import { createSlice } from '@reduxjs/toolkit';
import {
  ClassEntity,
  ClassExamResultDetailEntity,
  ClassExamResultEntity,
  EssayTestEntity,
  ExamEntity,
  IMeta,
  InformationEssayTestEntity,
  ManagerHasSubmittedEntity,
  SessonScheduleEntity,
} from '#/api/requests';
import {
  addCourseToClass,
  addTeacherToClass,
  addUserToClass,
  deleteCourseInClass,
  deleteTeacherInClass,
  deleteUserInClass,
  getAllClass,
  getAllExamInClass,
  getOneClass,
  getResultExamLessonClass,
  updateClass,
} from '../thunk/class.thunk';
import { ClassProfileEntity } from '#/api/requests/interfaces/ClassProfileEntity';
import Cookies from 'js-cookie';
import {
  createLessonSchedule,
  createSessonSchedule,
  deleteLessonSchedule,
  deleteSessonSchedule,
  getSessonSchedule,
} from '../thunk/sesson-schedule.thunk';
import {
  getAllExamCourseInClass,
  getAllResultByExamId,
  updateScoreEssayTest,
} from '../thunk/essay-test.thunk';

interface ClassState {
  data: {
    items: ClassEntity[] | [];
    meta: IMeta;
  };
  classEdit: ClassProfileEntity | null;
  setup: any;
  exam: InformationEssayTestEntity[] | [];
  exam_lesson: ClassExamResultEntity[] | [];
  result: ManagerHasSubmittedEntity[] | [];
  result_lesson: ClassExamResultDetailEntity[] | [];
}

const initialState: ClassState = {
  data: {
    items: [],
    meta: {
      limit: 0,
      offset: 0,
      total: 0,
      totalPages: 0,
    },
  },
  classEdit: null,
  setup: null,
  exam: [],
  exam_lesson: [],
  result: [],
  result_lesson: [],
};

const classSlice = createSlice({
  initialState,
  name: 'class',
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllClass.fulfilled, (state, action) => {
        state.data = action.payload.data;
      })
      .addCase(getOneClass.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 200) {
          Cookies.set('class-active', data.name, {
            expires: 1,
          });
          state.classEdit = data;
        }
      })
      .addCase(getSessonSchedule.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 200) {
          state.setup = data;
        }
      })
      .addCase(getResultExamLessonClass.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 200) {
          state.result_lesson = data;
        }
      })
      .addCase(getAllExamCourseInClass.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 200) {
          state.exam = data;
        }
      })
      .addCase(getAllResultByExamId.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 200) {
          state.result = data;
        }
      })
      .addCase(updateScoreEssayTest.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        const { id } = action.meta.arg;
        if (statusCode === 200) {
          state.result = state.result.map(item =>
            item.id === id ? { ...item, score: data.score } : item,
          );
        }
      })
      .addCase(getAllExamInClass.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 200) {
          state.exam_lesson = data;
        }
      })
      .addCase(createLessonSchedule.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 200) {
          state.setup.push(...data);
        }
      })
      .addCase(createSessonSchedule.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 201) {
          const cleanedData = data.map((item: { lessonIds: string[] }) => {
            const { lessonIds, ...rest } = item;
            return rest;
          });
          state.setup.push(...cleanedData);
        }
      })
      .addCase(deleteLessonSchedule.fulfilled, (state, action) => {
        const { statusCode } = action.payload;
        const { id, data } = action.meta.arg;
        if (statusCode === 200) {
          const after = state.setup.filter(
            (set: any) =>
              !(data.sessonScheduleIds.includes(set.id) && set.lessonId === id),
          );
          state.setup = after;
        }
      })
      .addCase(deleteSessonSchedule.fulfilled, (state, action) => {
        const { statusCode } = action.payload;
        const id = action.meta.arg;
        if (statusCode === 200) {
          const parseId: string[] = JSON.parse(id);
          state.setup = state.setup.filter(
            (schedule: SessonScheduleEntity) => !parseId.includes(schedule.id),
          );
        }
      })

      .addCase(addCourseToClass.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 201 && state.classEdit) {
          if (!state.classEdit.courses) {
            state.classEdit.courses = [];
          }
          state.classEdit.courses = [...state.classEdit.courses, ...data];
        }
      })
      .addCase(addUserToClass.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 201 && state.classEdit) {
          if (!state.classEdit.students) {
            state.classEdit.students = [];
          }
          state.classEdit.students = [...state.classEdit.students, ...data];
        }
      })
      .addCase(addTeacherToClass.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 201 && state.classEdit) {
          if (!state.classEdit.teachers) {
            state.classEdit.teachers = [];
          }
          state.classEdit.teachers = [...state.classEdit.teachers, ...data];
        }
      })
      .addCase(deleteCourseInClass.fulfilled, (state, action) => {
        const { statusCode } = action.payload;
        const { courseId } = action.meta.arg;
        if (statusCode === 200 && state.classEdit && state.classEdit.courses) {
          state.classEdit.courses = state.classEdit.courses.filter(
            c => c.id !== courseId,
          );
        }
      })
      .addCase(deleteUserInClass.fulfilled, (state, action) => {
        const { statusCode } = action.payload;
        const { userId } = action.meta.arg;
        if (statusCode === 200 && state.classEdit && state.classEdit.students) {
          state.classEdit.students = state.classEdit.students.filter(
            c => c.id !== userId,
          );
        }
      })
      .addCase(deleteTeacherInClass.fulfilled, (state, action) => {
        const { statusCode } = action.payload;
        const { teacherId } = action.meta.arg;
        if (statusCode === 200 && state.classEdit && state.classEdit.teachers) {
          state.classEdit.teachers = state.classEdit.teachers.filter(
            c => c.id !== teacherId,
          );
        }
      })
      .addCase(updateClass.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        const { id } = action.meta.arg;
        if (statusCode === 200) {
          state.data.items = state.data.items.map(item =>
            item.id === id ? { id: id, ...data } : item,
          );
        }
      });
  },
});

export default classSlice.reducer;
