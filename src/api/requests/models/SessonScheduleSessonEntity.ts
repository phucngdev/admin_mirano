/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SessonScheduleLessonEntity } from './SessonScheduleLessonEntity';

export type SessonScheduleSessonEntity = {
  id: string;
  title: string;
  lessons: Array<SessonScheduleLessonEntity>;
  isLated: boolean;
  isCompleted: boolean;
};

