/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateUserDto = {
  fullName?: string | null;
  phoneNumber?: string | null;
  gender?: UpdateUserDto.gender | null;
  national?: UpdateUserDto.national | null;
  level?: UpdateUserDto.level | null;
  address?: string | null;
  birthday?: string | null;
  userProfiles: UpdateUserDto.userProfiles;
};

export namespace UpdateUserDto {

  export enum gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
  }

  export enum national {
    VIETNAM = 'VIETNAM',
    JAPAN = 'JAPAN',
  }

  export enum level {
    N1 = 'N1',
    N2 = 'N2',
    N3 = 'N3',
    N4 = 'N4',
    N5 = 'N5',
  }

  export enum userProfiles {
    STUDENT = 'STUDENT',
    TEACHER = 'TEACHER',
    SYSTEM_ADMIN = 'SYSTEM_ADMIN',
  }


}

