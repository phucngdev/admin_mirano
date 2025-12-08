/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpsertUserDto = {
  fullName?: string | null;
  email: string;
  phoneNumber: string;
  avatarUrl?: string | null;
  isActive: boolean;
  userProfiles: UpsertUserDto.userProfiles;
};

export namespace UpsertUserDto {

  export enum userProfiles {
    STUDENT = 'STUDENT',
    TEACHER = 'TEACHER',
    SYSTEM_ADMIN = 'SYSTEM_ADMIN',
  }


}

