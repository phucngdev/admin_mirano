import { jsonAxios } from '../axios/axios';
import type {
  CloneScheduleDto,
  CreateClassSessonScheduleDto,
} from '../requests';

export const getSessonScheduleService = async (
  classId: string,
  courseId: string,
) =>
  await jsonAxios.get(
    `sesson-schedules?classId=${classId}&courseId=${courseId}`,
  );

export const createSessonScheduleService = async (
  data: CreateClassSessonScheduleDto,
) => await jsonAxios.post(`sesson-schedules`, data);

export const cloneSessonScheduleService = async (data: CloneScheduleDto) =>
  await jsonAxios.post(`sesson-schedules/clone-schedule`, data);

export const addLessonToSessonScheduleService = async (
  id: string,
  data: { sessonScheduleIds: string[] },
) => await jsonAxios.put(`sesson-schedules/lesson/${id}/add`, data);

export const removeLessonFromSessonScheduleService = async (
  id: string,
  data: { sessonScheduleIds: string[] },
) => await jsonAxios.put(`sesson-schedules/lesson/${id}/remove`, data);

export const deleteSessonScheduleService = async (id: string) =>
  await jsonAxios.delete(`sesson-schedules/${id}`);
