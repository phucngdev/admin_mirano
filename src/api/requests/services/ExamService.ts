/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateExamDto } from '../models/CreateExamDto';
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpdateExamDto } from '../models/UpdateExamDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ExamService {

  /**
   * Get all exam
   * @param q
   * @param limit
   * @param offset
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static examControllerGetAllExam(
    q?: string | null,
    limit: number = 10,
    offset: number,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/exams',
      query: {
        'q': q,
        'limit': limit,
        'offset': offset,
        'order': order,
      },
    });
  }

  /**
   * Create exam
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static examControllerCreateExam(
    requestBody: CreateExamDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/exams',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Get exam by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static examControllerGetExamById(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/exams/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Update exam
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static examControllerUpdateExam(
    id: string,
    requestBody: UpdateExamDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/exams/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete exam
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static examControllerDeleteExam(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/exams/{id}',
      path: {
        'id': id,
      },
    });
  }

}
