/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { QuestionGroupEntity } from './QuestionGroupEntity';

export type QuestionGroupReferenceEntity = {
  id: string;
  questionGroupId: QuestionGroupEntity;
  testDetailId: string;
  examId: string;
  type: QuestionGroupReferenceEntity.type;
  pos: number;
};

export namespace QuestionGroupReferenceEntity {

  export enum type {
    TEST_DETAIL = 'TEST_DETAIL',
    EXAM = 'EXAM',
  }


}

