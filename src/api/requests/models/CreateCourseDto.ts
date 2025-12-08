/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateCourseDto = {
  title: string;
  description: string;
  price: string;
  status: CreateCourseDto.status;
  thumbnailUrl: string;
  type: CreateCourseDto.type;
};

export namespace CreateCourseDto {

  export enum status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
  }

  export enum type {
    BASIC = 'BASIC',
    ADVANCED = 'ADVANCED',
  }


}

