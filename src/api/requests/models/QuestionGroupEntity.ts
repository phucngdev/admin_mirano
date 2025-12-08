/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { QuestionEntity } from './QuestionEntity';

export type QuestionGroupEntity = {
  id: string;
  content: string;
  audioUrl: string;
  imageUrl: string;
  tag: string;
  questionIds: Array<string>;
  questions: Array<QuestionEntity>;
};

