/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TestResultUserDetailGroupEntity } from './TestResultUserDetailGroupEntity';
import type { TestResultUserDetailWithoutTestEntity } from './TestResultUserDetailWithoutTestEntity';

export type TestResultUserDetailEntity = {
  id: string;
  testId: TestResultUserDetailGroupEntity;
  details: Array<TestResultUserDetailWithoutTestEntity>;
  score: number;
  createdAt: string;
};

