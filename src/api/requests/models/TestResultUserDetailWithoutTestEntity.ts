/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { QuestionGroupUserAnswerEntity } from './QuestionGroupUserAnswerEntity';

export type TestResultUserDetailWithoutTestEntity = {
  id: string;
  name: string;
  timeLimit: number;
  point: number;
  pos: number;
  correctCount: number;
  totalQuestions: number;
  questionGroups: Array<QuestionGroupUserAnswerEntity>;
};

