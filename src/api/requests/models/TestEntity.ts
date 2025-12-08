/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TestDetailEntity } from './TestDetailEntity';

export type TestEntity = {
  id: string;
  name: string;
  testType: TestEntity.testType;
  description: string;
  randomAnswer: boolean;
  showSolution: boolean;
  duration: number;
  numberOfParticipants: number;
  categoryId: string;
  testDetailIds: Array<string>;
  testDetails: Array<TestDetailEntity>;
};

export namespace TestEntity {

  export enum testType {
    TRY = 'TRY',
    REAL = 'REAL',
  }


}

