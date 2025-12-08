/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AnswerDto } from './AnswerDto';

export type UpdateQuestionFlashCardDto = {
  question?: string;
  position?: number;
  explanation?: string | null;
  answers?: Array<AnswerDto> | null;
};

