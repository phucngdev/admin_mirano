/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type LoginInputDto = {
  email: string;
  password: string;
  userType?: LoginInputDto.userType | null;
};

export namespace LoginInputDto {

  export enum userType {
    STUDENT = 'STUDENT',
    TEACHER = 'TEACHER',
    SYSTEM_ADMIN = 'SYSTEM_ADMIN',
  }


}

