/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTestCategoryDto } from '../models/CreateTestCategoryDto';
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpdateTestCategoryDto } from '../models/UpdateTestCategoryDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TestCategoryService {

  /**
   * Create new test category
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static testCategoryControllerCreateTestCategory(
    requestBody: CreateTestCategoryDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/test-category',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Get all test categories
   * @param limit
   * @param offset
   * @param testType
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static testCategoryControllerGetAllTestCategories(
    limit: number = 10,
    offset: number,
    testType?: string | null,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/test-category',
      query: {
        'limit': limit,
        'offset': offset,
        'testType': testType,
        'order': order,
      },
    });
  }

  /**
   * Get all test categories by user id of user
   * @param userId
   * @param limit
   * @param offset
   * @param testType
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static testCategoryControllerGetAllTestCategoriesByUserId(
    userId: string,
    limit: number = 10,
    offset: number,
    testType?: string | null,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/test-category/user/{userId}',
      path: {
        'userId': userId,
      },
      query: {
        'limit': limit,
        'offset': offset,
        'testType': testType,
        'order': order,
      },
    });
  }

  /**
   * Get test category by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static testCategoryControllerGetTestCategoryById(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/test-category/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Update test category by id
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static testCategoryControllerUpdateTestCategory(
    id: string,
    requestBody: UpdateTestCategoryDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/test-category/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete test category by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static testCategoryControllerDeleteTestCategory(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/test-category/{id}',
      path: {
        'id': id,
      },
    });
  }

}
