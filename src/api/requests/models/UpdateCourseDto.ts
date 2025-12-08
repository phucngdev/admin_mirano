/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateCourseDto = {
  title: string;
  description: string;
  price: string;
  status: UpdateCourseDto.status;
  thumbnailUrl: string;
};

export namespace UpdateCourseDto {

  export enum status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
  }


}

