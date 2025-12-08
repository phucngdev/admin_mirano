/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IContextUser } from './IContextUser';

export type ILoginResponse = {
  user: IContextUser;
  accessToken: string;
  refreshToken: string;
};

