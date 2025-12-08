/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateTestCategoryDto = {
  name?: string;
  imageUrl?: string;
  spesifictUser?: UpdateTestCategoryDto.spesifictUser;
  classIds?: Array<string>;
  userIds?: Array<string>;
};

export namespace UpdateTestCategoryDto {

  export enum spesifictUser {
    ALL = 'ALL',
    CLASS = 'CLASS',
    USERS = 'USERS',
    COURSE = 'COURSE',
  }


}

