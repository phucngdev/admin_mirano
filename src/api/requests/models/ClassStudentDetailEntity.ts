/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CourseEntity } from './CourseEntity';
import type { UserEntity } from './UserEntity';

export type ClassStudentDetailEntity = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  courses?: Array<CourseEntity> | null;
  teachers?: Array<UserEntity> | null;
};

