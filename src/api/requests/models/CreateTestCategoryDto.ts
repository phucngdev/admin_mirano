/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateTestCategoryDto = {
  name: string;
  imageUrl: string;
  spesifictUser: CreateTestCategoryDto.spesifictUser;
  classIds?: Array<string>;
  userIds?: Array<string>;
};

export namespace CreateTestCategoryDto {

  export enum spesifictUser {
    ALL = 'ALL',
    CLASS = 'CLASS',
    USERS = 'USERS',
    COURSE = 'COURSE',
  }


}

