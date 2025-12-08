/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTestResultDto } from '../models/CreateTestResultDto';
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpdateTestResultDto } from '../models/UpdateTestResultDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TestResultService {

  /**
   * Create new test result
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static testResultControllerCreateTestResult(
    requestBody: CreateTestResultDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/test-result',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Get all test results
   * @param limit
   * @param offset
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static testResultControllerGetAllTestResults(
    limit: number = 10,
    offset: number,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/test-result',
      query: {
        'limit': limit,
        'offset': offset,
        'order': order,
      },
    });
  }

  /**
   * Get all test results by test id of admin
   * @param testId
   * @returns any
   * @throws ApiError
   */
  public static testResultControllerGetAllTestResultsOfAdmin(
    testId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/test-result/admin/{testId}',
      path: {
        'testId': testId,
      },
    });
  }

  /**
   * Get all test results by test id and user id of admin
   * @param testId
   * @param userId
   * @returns any
   * @throws ApiError
   */
  public static testResultControllerGetAllTestResultsOfAdminAttemptCount(
    testId: string,
    userId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/test-result/admin/test/{testId}/user/{userId}',
      path: {
        'testId': testId,
        'userId': userId,
      },
    });
  }

  /**
   * Get all test results by test result id of admin
   * @param testResultId
   * @returns any
   * @throws ApiError
   */
  public static testResultControllerGetTestResultsOfAdmin(
    testResultId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/test-result/admin/result/{testResultId}',
      path: {
        'testResultId': testResultId,
      },
    });
  }

  /**
   * Get all test results by test id And user id of user
   * @param userId
   * @param limit
   * @param offset
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static testResultControllerGetAllTestResultsOfUser(
    userId: string,
    limit: number = 10,
    offset: number,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/test-result/user-all-test-result/{userId}',
      path: {
        'userId': userId,
      },
      query: {
        'limit': limit,
        'offset': offset,
        'order': order,
      },
    });
  }

  /**
   * Get test results by user id
   * @param userId
   * @param limit
   * @param offset
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static testResultControllerGetTestResultsByUser(
    userId: string,
    limit: number = 10,
    offset: number,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/test-result/user/{userId}',
      path: {
        'userId': userId,
      },
      query: {
        'limit': limit,
        'offset': offset,
        'order': order,
      },
    });
  }

  /**
   * Get test results by test id
   * @param testId
   * @param limit
   * @param offset
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static testResultControllerGetTestResultsByTest(
    testId: string,
    limit: number = 10,
    offset: number,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/test-result/test/{testId}',
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
   * Get test result by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static testResultControllerGetTestResultById(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/test-result/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Update test result by id
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static testResultControllerUpdateTestResult(
    id: string,
    requestBody: UpdateTestResultDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/test-result/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete test result by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static testResultControllerDeleteTestResult(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/test-result/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Export excel test result by test with time range
   * @param testId
   * @param rangeType
   * @param date
   * @param startDate
   * @param endDate
   * @returns any
   * @throws ApiError
   */
  public static testResultControllerExportByTest(
    testId: string,
    rangeType: string,
    date: string,
    startDate: string,
    endDate: string,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/test-result/export/test/{testId}',
      path: {
        'testId': testId,
      },
      query: {
        'rangeType': rangeType,
        'date': date,
        'startDate': startDate,
        'endDate': endDate,
      },
    });
  }

}
