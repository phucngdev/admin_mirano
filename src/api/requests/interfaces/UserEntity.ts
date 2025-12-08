export interface UserEntity {
  id: string;
  userCode: number;
  email: string;
  avatarUrl: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  isActive: boolean;
  gender: UserEntity.Gender;
  birthday: Date;
  userType: UserEntity.UserType;
  deactivateNote: string;
}

export namespace UserEntity {
  export enum UserType {
    PAID_USER = 'PAID_USER',
    NEW_USER = 'NEW_USER',
  }

  export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
  }
}
