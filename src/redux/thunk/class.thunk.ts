import {
  AddCourseDto,
  AddStudentDto,
  AddTeacherDto,
  UpdateClassDto,
} from '#/api/requests';
import {
  addCourseToClassService,
  addTeacherToClassService,
  addUserToClassService,
  deleteClassService,
  deleteCourseInClassService,
  deleteTeacherInClassService,
  deleteUserInClassService,
  getAllClassService,
  getAllExamInClassService,
  getClassStudentDetailService,
  getOneClassService,
  getResultCourseDetailService,
  getResultExamLessonClassService,
  getSetupClassService,
  getStudentDetailService,
  updateClassService,
} from '#/api/services/classService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllClass = createAsyncThunk(
  'class/get-all-class',
  async ({
    limit,
    offset,
    query,
    fromDate,
    toDate,
  }: {
    limit: number;
    offset: number;
    query: string;
    fromDate?: string;
    toDate?: string;
  }) => {
    try {
      const response = await getAllClassService(
        limit,
        offset,
        query,
        fromDate,
        toDate,
      );
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const updateClass = createAsyncThunk(
  'class/put-update-class',
  async ({ id, data }: { id: string; data: UpdateClassDto }) => {
    try {
      const response = await updateClassService(id, data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const getAllExamInClass = createAsyncThunk(
  'class/get-all-exam-class',
  async ({ courseId, classId }: { courseId: string; classId: string }) => {
    try {
      const response = await getAllExamInClassService(courseId, classId);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const getResultExamLessonClass = createAsyncThunk(
  'class/get-all-result-exam-lesson-class',
  async ({
    courseId,
    classId,
    examId,
  }: {
    courseId: string;
    classId: string;
    examId: string;
  }) => {
    try {
      const response = await getResultExamLessonClassService(
        courseId,
        classId,
        examId,
      );
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const getOneClass = createAsyncThunk(
  'class/get-one-class',
  async (id: string) => {
    try {
      const response = await getOneClassService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const deleteClass = createAsyncThunk(
  'class/delete-class',
  async (id: string) => {
    try {
      const response = await deleteClassService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const getSetupClass = createAsyncThunk(
  'class/get-setup-class',
  async (id: string) => {
    try {
      const response = await getSetupClassService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const deleteCourseInClass = createAsyncThunk(
  'class/delete-course-class',
  async ({ classId, courseId }: { classId: string; courseId: string }) => {
    try {
      const response = await deleteCourseInClassService(classId, courseId);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const deleteUserInClass = createAsyncThunk(
  'class/delete-user-class',
  async ({ classId, userId }: { classId: string; userId: string }) => {
    try {
      const response = await deleteUserInClassService(classId, userId);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const deleteTeacherInClass = createAsyncThunk(
  'class/delete-teacher-class',
  async ({ classId, teacherId }: { classId: string; teacherId: string }) => {
    try {
      const response = await deleteTeacherInClassService(classId, teacherId);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const addCourseToClass = createAsyncThunk(
  'class/add-copurse-to-class',
  async (data: AddCourseDto) => {
    try {
      const response = await addCourseToClassService(data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const addUserToClass = createAsyncThunk(
  'class/add-user-to-class',
  async (data: AddStudentDto) => {
    try {
      const response = await addUserToClassService(data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const addTeacherToClass = createAsyncThunk(
  'class/add-tearch-to-class',
  async (data: AddTeacherDto) => {
    try {
      const response = await addTeacherToClassService(data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const getStudentDetail = createAsyncThunk(
  'class/get-student-detail',
  async (id: string) => {
    try {
      const response = await getStudentDetailService(id);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const getClassStudentDetail = createAsyncThunk(
  'class/get-class-student-detail',
  async ({ classId, studentId }: { classId: string; studentId: string }) => {
    try {
      const response = await getClassStudentDetailService(classId, studentId);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

export const getResultCourseDetail = createAsyncThunk(
  'class/get-result-course-student-detail',
  async ({
    classId,
    studentId,
    courseId,
  }: {
    classId: string;
    studentId: string;
    courseId: string;
  }) => {
    try {
      const response = await getResultCourseDetailService(
        classId,
        studentId,
        courseId,
      );
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);
