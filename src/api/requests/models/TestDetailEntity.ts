/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ObjectId } from './ObjectId';
import type { QuestionGroupEntity } from './QuestionGroupEntity';

export type TestDetailEntity = {
  id: string;
  testId: ObjectId;
  name: string;
  timeLimit: number;
  point: number;
  pos: number;
  numberOfQuestions: number;
  questionGroupIds: Array<string>;
  questionGroups: Array<QuestionGroupEntity>;
};

