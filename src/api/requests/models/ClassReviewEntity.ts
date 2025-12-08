/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserBaseEntity } from './UserBaseEntity';

export type ClassReviewEntity = {
  id: string;
  note: string;
  createdBy: UserBaseEntity;
  updatedBy: UserBaseEntity;
};

