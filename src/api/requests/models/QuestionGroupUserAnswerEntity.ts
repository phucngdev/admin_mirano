/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { QuestionUserAnswerEntity } from './QuestionUserAnswerEntity';

export type QuestionGroupUserAnswerEntity = {
  id: string;
  content: string;
  audioUrl: string;
  imageUrl: string;
  questions: Array<QuestionUserAnswerEntity>;
};

