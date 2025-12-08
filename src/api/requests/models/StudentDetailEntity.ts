/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClassEntity } from './ClassEntity';
import type { UserEntity } from './UserEntity';

export type StudentDetailEntity = {
  student: UserEntity;
  classes: Array<ClassEntity>;
};

