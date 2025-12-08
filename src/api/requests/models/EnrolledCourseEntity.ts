/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EnrolledCourseEntity = {
  id: string;
  title: string;
  thumbnailUrl: string;
  price: number;
  status: EnrolledCourseEntity.status;
  type: EnrolledCourseEntity.type;
  progress: number;
  description: string;
  sessonCount: number;
  classId: string;
  pendingSesson: number;
};

export namespace EnrolledCourseEntity {

  export enum status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
  }

  export enum type {
    BASIC = 'BASIC',
    ADVANCED = 'ADVANCED',
  }


}

