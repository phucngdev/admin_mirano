/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ExamEntity } from './ExamEntity';
import type { LessonEntity } from './LessonEntity';

export type ExamLessonEntity = {
  id: string;
  examId: string;
  lessonId: string;
  exam: ExamEntity;
  lesson: LessonEntity;
  randomAnswer: boolean;
  randomQuestion: boolean;
  showSolution: boolean;
  showAnswer: boolean;
};

