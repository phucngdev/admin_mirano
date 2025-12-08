/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AdminUpdateUserDto = {
  fullName?: string | null;
  email: string;
  phoneNumber: string;
  avatarUrl?: string | null;
  isActive: boolean;
  userProfiles: AdminUpdateUserDto.userProfiles;
};

export namespace AdminUpdateUserDto {

  export enum userProfiles {
    STUDENT = 'STUDENT',
    TEACHER = 'TEACHER',
    SYSTEM_ADMIN = 'SYSTEM_ADMIN',
  }


}

