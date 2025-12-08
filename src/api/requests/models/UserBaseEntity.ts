/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UserBaseEntity = {
  id: string;
  userCode: number;
  email: string;
  avatarUrl: string;
  fullName: string;
  phoneNumber?: string;
  address: string;
  isActive: boolean;
  'q': string;
};

