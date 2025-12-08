/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateQuestionGroupDto } from '../models/CreateQuestionGroupDto';
import type { UpdateQuestionGroupDto } from '../models/UpdateQuestionGroupDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class QuestionGroupService {

  /**
   * Get all question group
   * @param limit
   * @param offset
   * @param content
   * @param tag
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static questionGroupControllerGetAllQuestionGroup(
    limit: number = 10,
    offset: number,
    content?: string | null,
    tag?: string | null,
    order?: string | null,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/question-groups',
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
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static questionGroupControllerCreateQuestionGroup(
    requestBody: CreateQuestionGroupDto,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/question-groups',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static questionGroupControllerGetQuestionGroupById(
    id: string,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/question-groups/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static questionGroupControllerUpdateQuestionGroup(
    id: string,
    requestBody: UpdateQuestionGroupDto,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/question-groups/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static questionGroupControllerDeleteQuestionGroup(
    id: string,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/question-groups/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Get all question group
   * @param limit
   * @param offset
   * @param content
   * @param tag
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static questionGroupUserControllerGetAllQuestionGroup(
    limit: number = 10,
    offset: number,
    content?: string | null,
    tag?: string | null,
    order?: string | null,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/student/question-groups',
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
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static questionGroupUserControllerGetQuestionGroupById(
    id: string,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/student/question-groups/{id}',
      path: {
        'id': id,
      },
    });
  }

}
