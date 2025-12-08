/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TestDetailGroupEntity } from './TestDetailGroupEntity';
import type { TestDetailWithoutTestEntity } from './TestDetailWithoutTestEntity';

export type GroupedTestDetailEntity = {
  testId: TestDetailGroupEntity;
  details: Array<TestDetailWithoutTestEntity>;
};

