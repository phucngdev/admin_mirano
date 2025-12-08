/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type RegisterInputDto = {
  fullName: string;
  email: string;
  phoneNumber?: string | null;
  password: string;
  referredUserCode?: string | null;
};

