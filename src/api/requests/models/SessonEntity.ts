/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LessonEntity } from './LessonEntity';
import type { ObjectId } from './ObjectId';

export type SessonEntity = {
  id: string;
  title: string;
  pos: number;
  isRequired: boolean;
  courseId: ObjectId;
  lessons?: Array<LessonEntity>;
};

