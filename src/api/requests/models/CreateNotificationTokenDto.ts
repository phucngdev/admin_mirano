/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateNotificationTokenDto = {
  platform: string;
  deviceIdentity?: string | null;
  fcmToken: string;
};

