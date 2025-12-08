/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AppService {

  /**
   * @returns any
   * @throws ApiError
   */
  public static appControllerCheck(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/health',
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static appControllerCallback(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/callback',
    });
  }

}
