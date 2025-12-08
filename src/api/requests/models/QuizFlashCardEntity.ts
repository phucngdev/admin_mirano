/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { QuestionFlashCardEntity } from './QuestionFlashCardEntity';

export type QuizFlashCardEntity = {
  id: string;
  lessonId: string;
  time: number;
  questions: Array<QuestionFlashCardEntity>;
  deadline: boolean;
  timeTest: boolean;
  questionPositionReversal: boolean;
};

