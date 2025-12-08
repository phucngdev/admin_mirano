/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpdateNotificationDto } from '../models/UpdateNotificationDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class NotificationsService {

  /**
   * Get list of notifications
   * @param limit
   * @param offset
   * @param notificationType
   * @param fromDate
   * @param toDate
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static notificationControllerGetNotifications(
    limit: number = 10,
    offset: number,
    notificationType?: any,
    fromDate?: string | null,
    toDate?: string | null,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/notifications',
      query: {
        'limit': limit,
        'offset': offset,
        'notificationType': notificationType,
        'fromDate': fromDate,
        'toDate': toDate,
        'order': order,
      },
    });
  }

  /**
   * Get a notification
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static notificationControllerGetNotification(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/notifications/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Delete a notification
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static notificationControllerDeleteNotification(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/notifications/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Read a notification
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static notificationControllerUpdateNotification(
    id: string,
    requestBody: UpdateNotificationDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/notifications/{id}/seen',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Get list of notifications of a business
   * @param businessId
   * @param limit
   * @param offset
   * @param notificationType
   * @param fromDate
   * @param toDate
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static notificationAdminControllerGetNotifications(
    businessId: string,
    limit: number = 10,
    offset: number,
    notificationType?: any,
    fromDate?: string | null,
    toDate?: string | null,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/businesses/{businessId}/notifications',
      path: {
        'businessId': businessId,
      },
      query: {
        'limit': limit,
        'offset': offset,
        'notificationType': notificationType,
        'fromDate': fromDate,
        'toDate': toDate,
        'order': order,
      },
    });
  }

}
