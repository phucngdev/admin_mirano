/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateCourseVocabDto } from '../models/CreateCourseVocabDto';
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpdateCourseVocabDto } from '../models/UpdateCourseVocabDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CourseVocabService {

  /**
   * Get all course vocabularies
   * @param lessonId
   * @param limit
   * @param offset
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static courseVocabControllerGetAllCourseVocab(
    lessonId: string,
    limit: number = 10,
    offset: number,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/course-vocabs',
      query: {
        'lessonId': lessonId,
        'limit': limit,
        'offset': offset,
        'order': order,
      },
    });
  }

  /**
   * Create course vocabulary
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static courseVocabControllerCreateCourseVocab(
    requestBody: CreateCourseVocabDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/course-vocabs',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Get course vocabulary by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static courseVocabControllerGetCourseVocabById(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/course-vocabs/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Update course vocabulary
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static courseVocabControllerUpdateCourseVocab(
    id: string,
    requestBody: UpdateCourseVocabDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/course-vocabs/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete course vocabulary
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static courseVocabControllerDeleteCourseVocab(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/course-vocabs/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Import excel course vocab
   * @param lessonId
   * @returns any
   * @throws ApiError
   */
  public static courseVocabControllerImportExcelVocabs(
    lessonId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/course-vocabs/import',
      query: {
        'lessonId': lessonId,
      },
    });
  }

  /**
   * Get all course vocabularies
   * @param lessonId
   * @param limit
   * @param offset
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static courseVocabUserControllerGetAllCourseVocab(
    lessonId: string,
    limit: number = 10,
    offset: number,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/student/course-vocabs',
      query: {
        'lessonId': lessonId,
        'limit': limit,
        'offset': offset,
        'order': order,
      },
    });
  }

  /**
   * Get course vocabulary by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static courseVocabUserControllerGetCourseVocabById(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/student/course-vocabs/{id}',
      path: {
        'id': id,
      },
    });
  }

}
