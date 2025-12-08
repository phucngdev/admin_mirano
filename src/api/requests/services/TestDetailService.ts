/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTestDetailDto } from '../models/CreateTestDetailDto';
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpdateTestDetailDto } from '../models/UpdateTestDetailDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TestDetailService {

  /**
   * Create new test detail
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static testDetailControllerCreateTestDetail(
    requestBody: CreateTestDetailDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/test-detail',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Get all test details
   * @param limit
   * @param offset
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static testDetailControllerGetAllTestDetails(
    limit: number = 10,
    offset: number,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/test-detail',
      query: {
        'limit': limit,
        'offset': offset,
        'order': order,
      },
    });
  }

  /**
   * Get test details by test id
   * @param testId
   * @param limit
   * @param offset
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static testDetailControllerGetTestDetailsByTest(
    testId: string,
    limit: number = 10,
    offset: number,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/test-detail/{testId}',
      path: {
        'testId': testId,
      },
      query: {
        'limit': limit,
        'offset': offset,
        'order': order,
      },
    });
  }

  /**
   * Get test details encryption by test id
   * @param testId
   * @param limit
   * @param offset
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static testDetailControllerGetTestDetailsByTestEncryption(
    testId: string,
    limit: number = 10,
    offset: number,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/test-detail/encryption/{testId}',
      path: {
        'testId': testId,
      },
      query: {
        'limit': limit,
        'offset': offset,
        'order': order,
      },
    });
  }

  /**
   * Get test detail by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static testDetailControllerGetTestDetailById(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/test-detail/me/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Update test detail by id
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static testDetailControllerUpdateTestDetail(
    id: string,
    requestBody: UpdateTestDetailDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/test-detail/me/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete test detail by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static testDetailControllerDeleteTestDetail(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/test-detail/me/{id}',
      path: {
        'id': id,
      },
    });
  }

}
