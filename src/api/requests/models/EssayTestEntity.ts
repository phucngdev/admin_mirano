/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ExamEntity } from './ExamEntity';
import type { UserEntity } from './UserEntity';

export type EssayTestEntity = {
  id: string;
  userId: string;
  examId: string;
  courseId: string;
  classId: string;
  user: UserEntity;
  exam: ExamEntity;
  submittedExamUrls: Array<string>;
  feedback: string;
  score?: number | null;
  gradedTest: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

