import type { ClassReportScope } from '#/features/class/class-manager/components/drawer/DrawerExport';
import { jsonAxios } from '../axios/axios';
import type {
  AddCourseDto,
  AddStudentDto,
  AddTeacherDto,
  CreateClassDto,
  UpdateClassDto,
} from '../requests';

export const getAllClassService = async (
  limit: number,
  offset: number,
  query: string,
  fromDate?: string,
  toDate?: string,
) => {
  const params = new URLSearchParams();

  params.append('limit', limit.toString());
  params.append('offset', offset.toString());

  if (query) params.append('q', query);
  if (fromDate) params.append('fromDate', fromDate);
  if (toDate) params.append('toDate', toDate);

  return await jsonAxios.get(`classes?${params.toString()}`);
};

export const exportReportClassService = async (
  classId: string,
  scope: ClassReportScope,
  attendanceCourseId: string,
  homeworkCourseId: string,
  fromDate?: Date,
  toDate?: Date,
) => {
  const params = new URLSearchParams();

  params.append('classId', classId);
  params.append('scope', scope);
  params.append('attendanceCourseId', attendanceCourseId);
  params.append('homeworkCourseId', homeworkCourseId);

  if (fromDate) params.append('fromDate', fromDate.toString());
  if (toDate) params.append('toDate', toDate.toString());

  return await jsonAxios.get(`classes/export?${params.toString()}`, {
    responseType: 'arraybuffer',
  });
};

export const createClassService = async (data: CreateClassDto) =>
  await jsonAxios.post(`classes`, data);

export const getOneClassService = async (id: string) =>
  await jsonAxios.get(`classes/${id}`);

export const getSetupClassService = async (id: string) =>
  await jsonAxios.get(`classes/setup/${id}`);

export const deleteClassService = async (id: string) =>
  await jsonAxios.delete(`classes/${id}`);

export const deleteCourseInClassService = async (
  classId: string,
  courseId: string,
) => await jsonAxios.delete(`classes/${classId}/course/${courseId}`);

export const deleteUserInClassService = async (
  classId: string,
  userId: string,
) => await jsonAxios.delete(`classes/${classId}/student/${userId}`);

export const deleteTeacherInClassService = async (
  classId: string,
  teacherId: string,
) => await jsonAxios.delete(`classes/${classId}/teacher/${teacherId}`);

export const updateClassService = async (id: string, data: UpdateClassDto) =>
  await jsonAxios.put(`classes/${id}`, data);

export const getAllExamInClassService = async (
  courseId: string,
  classId: string,
) => await jsonAxios.get(`classes/${classId}/courseId/${courseId}/exam-result`);

export const getResultExamLessonClassService = async (
  courseId: string,
  classId: string,
  examId: string,
) =>
  await jsonAxios.get(
    `classes/${classId}/course/${courseId}/exam/${examId}/exam-result-detail`,
  );

export const addCourseToClassService = async (data: AddCourseDto) =>
  await jsonAxios.post(`classes/add-course`, data);

export const addUserToClassService = async (data: AddStudentDto) =>
  await jsonAxios.post(`classes/add-student`, data);

export const addTeacherToClassService = async (data: AddTeacherDto) =>
  await jsonAxios.post(`classes/add-teacher`, data);

export const getStudentDetailService = async (id: string) =>
  await jsonAxios.get(`classes/student/${id}`);

export const getClassStudentDetailService = async (
  classId: string,
  studentId: string,
) =>
  await jsonAxios.get(`classes/${classId}/student/${studentId}/detail-class`);

export const getResultCourseDetailService = async (
  classId: string,
  studentId: string,
  courseId: string,
) =>
  await jsonAxios.get(
    `classes/${classId}/student/${studentId}/courseId/${courseId}/detail-course`,
  );
