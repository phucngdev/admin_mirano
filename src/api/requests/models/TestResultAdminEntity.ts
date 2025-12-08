/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TestResultUserDetailWithoutTestEntity } from './TestResultUserDetailWithoutTestEntity';

export type TestResultAdminEntity = {
  testResult: Array<TestResultUserDetailWithoutTestEntity>;
  score: number;
  totalScore: number;
  totalTimeLimit: number;
};

