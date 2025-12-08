/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateQuestionGroupAndReferenceDto } from '../models/CreateQuestionGroupAndReferenceDto';
import type { CreateQuestionGroupReferenceDto } from '../models/CreateQuestionGroupReferenceDto';
import type { IBaseResponse } from '../models/IBaseResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class QuestionGroupsReferencesService {

  /**
   * Get all question group references
   * @param limit
   * @param offset
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static questionGroupReferenceControllerGetAllQuestionGroupReference(
    limit: number = 10,
    offset: number,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/question-groups-references',
      query: {
        'limit': limit,
        'offset': offset,
        'order': order,
      },
    });
  }

  /**
   * Create reference from (testDetail or exam) to question group
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static questionGroupReferenceControllerCreateQuestionGroupReference(
    requestBody: CreateQuestionGroupReferenceDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/question-groups-references',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete question group reference by id
   * @param parentId
   * @param questionGroupId
   * @returns any
   * @throws ApiError
   */
  public static questionGroupReferenceControllerDeleteQuestionGroupReference(
    parentId: string,
    questionGroupId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/question-groups-references',
      query: {
        'parentId': parentId,
        'questionGroupId': questionGroupId,
      },
    });
  }

  /**
   * Get all question groups by exam ID
   * @param examId
   * @param limit
   * @param offset
   * @param content
   * @param tag
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static questionGroupReferenceControllerGetQuestionGroupsByExamId(
    examId: string,
    limit: number = 10,
    offset: number,
    content?: string | null,
    tag?: string | null,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/question-groups-references/by-exam/{examId}',
      path: {
        'examId': examId,
      },
      query: {
        'limit': limit,
        'offset': offset,
        'content': content,
        'tag': tag,
        'order': order,
      },
    });
  }

  /**
   * Get all question groups by test detail ID
   * @param testDetailId
   * @param limit
   * @param offset
   * @param content
   * @param tag
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static questionGroupReferenceControllerGetQuestionGroupsByTestDetailId(
    testDetailId: string,
    limit: number = 10,
    offset: number,
    content?: string | null,
    tag?: string | null,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/question-groups-references/by-test-detail/{testDetailId}',
      path: {
        'testDetailId': testDetailId,
      },
      query: {
        'limit': limit,
        'offset': offset,
        'content': content,
        'tag': tag,
        'order': order,
      },
    });
  }

  /**
   * Get all exams and test details using a question group
   * @param questionGroupId
   * @param limit
   * @param offset
   * @param content
   * @param tag
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static questionGroupReferenceControllerGetQuestionGroupUsage(
    questionGroupId: string,
    limit: number = 10,
    offset: number,
    content?: string | null,
    tag?: string | null,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/question-groups-references/usage/{questionGroupId}',
      path: {
        'questionGroupId': questionGroupId,
      },
      query: {
        'limit': limit,
        'offset': offset,
        'content': content,
        'tag': tag,
        'order': order,
      },
    });
  }

  /**
   * Create question group and reference from (testDetail or exam) to question group
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static questionGroupReferenceControllerCreateQuestionGroupAndReference(
    requestBody: CreateQuestionGroupAndReferenceDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/question-groups-references/with-group',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

}
