/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ExamWithMappingEntity } from './ExamWithMappingEntity';
import type { LessonEntity } from './LessonEntity';

export type ExamLessonWithMappingEntity = {
  id: string;
  examId: string;
  lessonId: string;
  exam: ExamWithMappingEntity;
  lesson: LessonEntity;
  randomAnswer: boolean;
  randomQuestion: boolean;
  showSolution: boolean;
  showAnswer: boolean;
};

