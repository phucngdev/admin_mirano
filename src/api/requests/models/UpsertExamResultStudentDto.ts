/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserAnswerDto } from './UserAnswerDto';

export type UpsertExamResultStudentDto = {
  point: number;
  examId: string;
  courseId: string;
  classId: string;
  userAnswers: Array<UserAnswerDto>;
};

