/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AnswerEntiti } from './AnswerEntiti';

export type QuestionFlashCardEntity = {
  id: string;
  question: string;
  position: number;
  answers: Array<AnswerEntiti>;
  explanation: string;
};

