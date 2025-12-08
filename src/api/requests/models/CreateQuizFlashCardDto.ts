/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreateQuestionFlashCardDto } from './CreateQuestionFlashCardDto';

export type CreateQuizFlashCardDto = {
  lessonId?: string | null;
  time?: number | null;
  questions?: Array<CreateQuestionFlashCardDto> | null;
};

