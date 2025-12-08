/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UserEntity = {
  id: string;
  userCode: number;
  email: string;
  avatarUrl: string;
  fullName: string;
  phoneNumber?: string;
  address: string;
  isActive: boolean;
  'q': string;
  gender?: UserEntity.gender | null;
  level?: UserEntity.level | null;
  national?: UserEntity.national | null;
  birthday?: string | null;
  userType: UserEntity.userType;
  deactivateNote?: string | null;
  userProfiles: Array<'STUDENT' | 'TEACHER' | 'SYSTEM_ADMIN'>;
};

export namespace UserEntity {

  export enum gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
  }

  export enum level {
    N1 = 'N1',
    N2 = 'N2',
    N3 = 'N3',
    N4 = 'N4',
    N5 = 'N5',
  }

  export enum national {
    VIETNAM = 'VIETNAM',
    JAPAN = 'JAPAN',
  }

  export enum userType {
    PAID_USER = 'PAID_USER',
    NEW_USER = 'NEW_USER',
  }


}

