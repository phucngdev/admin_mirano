/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IBaseResponse } from '../models/IBaseResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ConfigsService {

  /**
   * Get app configs
   * @returns any
   * @throws ApiError
   */
  public static appConfigControllerGetAppConfigs(): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/configs',
    });
  }

  /**
   * Get list blogs
   * @returns any
   * @throws ApiError
   */
  public static appConfigControllerGetBlogs(): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/configs/blogs',
    });
  }

  /**
   * Create Admin
   * @returns any
   * @throws ApiError
   */
  public static appConfigControllerCreateAdmin(): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/configs/create-admin',
    });
  }

  /**
   * Migrate data
   * @returns any
   * @throws ApiError
   */
  public static appConfigControllerMigrateData(): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/configs/migrate-data',
    });
  }

}
