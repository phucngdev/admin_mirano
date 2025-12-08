/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CourseEntity } from './CourseEntity';
import type { UserEntity } from './UserEntity';

export type ClassDetailEntity = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  courses?: Array<CourseEntity> | null;
  students?: Array<UserEntity> | null;
  teachers?: Array<UserEntity> | null;
  studentCount?: number | null;
};

