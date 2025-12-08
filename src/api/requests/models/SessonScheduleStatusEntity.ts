/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SessonScheduleSessonEntity } from './SessonScheduleSessonEntity';

export type SessonScheduleStatusEntity = {
  dueDate: string;
  sessons: Array<SessonScheduleSessonEntity>;
};

