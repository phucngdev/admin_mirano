/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type IContextUser = {
  id: string;
  fullName: string;
  email: string;
  isBlocked?: boolean | null;
  userProfiles: Array<string>;
  userType: string;
  permissions?: Array<string> | null;
  businessId?: string | null;
  isActive: boolean;
};

