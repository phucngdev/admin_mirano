/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTestProgressDto } from '../models/CreateTestProgressDto';
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpdateTestProgressDto } from '../models/UpdateTestProgressDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TestProgressService {

  /**
   * add test progress
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static testProgressControllerAddTestProgress(
    requestBody: CreateTestProgressDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/test-progress',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * get test Progress by lesson id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static testProgressControllerGetTestProgress(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/test-progress/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * update test progress by id
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static testProgressControllerUpdateTestProgress(
    id: string,
    requestBody: UpdateTestProgressDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/test-progress/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * delete test progress by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static testProgressControllerDeleteTestProgress(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/test-progress/{id}',
      path: {
        'id': id,
      },
    });
  }

}
