import { jsonAxios } from '../axios/axios';

export const updateScoreExamService = async (data: {
  examId: string;
  courseId: string;
  classId: string;
  point: number;
  studentId: string;
}) => await jsonAxios.post(`exam-results`, data);
