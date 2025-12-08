/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SessonEntity } from './SessonEntity';

export type CourseEntity = {
  id: string;
  title: string;
  description: string;
  price: number;
  status: CourseEntity.status;
  thumbnailUrl: string;
  type: CourseEntity.type;
  count: number;
  sessons: Array<SessonEntity>;
};

export namespace CourseEntity {

  export enum status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
  }

  export enum type {
    BASIC = 'BASIC',
    ADVANCED = 'ADVANCED',
  }


}

