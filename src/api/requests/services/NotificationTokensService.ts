/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateNotificationTokenDto } from '../models/CreateNotificationTokenDto';
import type { IBaseResponse } from '../models/IBaseResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class NotificationTokensService {

  /**
   * Register a fcm token
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static notificationTokenControllerCreateNotificationToken(
    requestBody: CreateNotificationTokenDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/notification-tokens',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete a notification token when logout
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static notificationTokenControllerDeleteNotificationToken(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/notification-tokens/{id}',
      path: {
        'id': id,
      },
    });
  }

}
