/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AnswerDto } from './AnswerDto';

export type CreateQuestionFlashCardDto = {
  question?: string | null;
  explanation?: string | null;
  answers?: Array<AnswerDto> | null;
};

