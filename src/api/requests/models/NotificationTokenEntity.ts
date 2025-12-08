/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type NotificationTokenEntity = {
  id: string;
  userId?: string | null;
  deviceIdentity?: string | null;
  platform: NotificationTokenEntity.platform;
  fcmToken: string;
};

export namespace NotificationTokenEntity {

  export enum platform {
    ANDROID = 'ANDROID',
    IOS = 'IOS',
    BROWSER = 'BROWSER',
  }


}

