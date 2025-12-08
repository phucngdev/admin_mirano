import { jsonAxios } from '../axios/axios';
import type { UpdateEssayTestDto } from '../requests';

export const getAllExamCourseInClassService = async (courseId: string) =>
  await jsonAxios.get(`essay-test/information-exam/${courseId}`);

export const getAllResultByExamIdService = async (
  examId: string,
  classId: string,
) => await jsonAxios.get(`essay-test?examId=${examId}&classId=${classId}`);

export const updateScoreEssayTestService = async (
  id: string,
  data: UpdateEssayTestDto,
) => await jsonAxios.put(`essay-test/${id}`, data);
