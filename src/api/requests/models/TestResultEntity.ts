/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserAnswerEntity } from './UserAnswerEntity';

export type TestResultEntity = {
  id: string;
  userId: string;
  testId: string;
  score: number;
  userAnswers: Array<UserAnswerEntity>;
  createdAt: string;
};

