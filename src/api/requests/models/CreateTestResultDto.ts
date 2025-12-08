/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserAnswerDto } from './UserAnswerDto';

export type CreateTestResultDto = {
  userId: string;
  testId: string;
  score: number;
  userAnswers: Array<UserAnswerDto>;
};

