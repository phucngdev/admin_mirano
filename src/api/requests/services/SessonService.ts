/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateSessonDto } from '../models/CreateSessonDto';
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpdateSessonDto } from '../models/UpdateSessonDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SessonService {

  /**
   * Get all sessons
   * @param courseId
   * @returns any
   * @throws ApiError
   */
  public static sessonControllerGetAllSesson(
    courseId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/sessons',
      query: {
        'courseId': courseId,
      },
    });
  }

  /**
   * Create sesson
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static sessonControllerCreateSesson(
    requestBody: CreateSessonDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/sessons',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Get sesson by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static sessonControllerGetSessonById(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/sessons/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Update sesson by id
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static sessonControllerUpdateSesson(
    id: string,
    requestBody: UpdateSessonDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/sessons/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete sesson by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static sessonControllerDeleteSesson(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/sessons/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Get all sessons by course
   * @param courseId
   * @param limit
   * @param offset
   * @param type
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static sessonUserControllerGetAllSesson(
    courseId: string,
    limit: number = 10,
    offset: number,
    type?: 'LISTENING' | 'READING' | 'PRACTICE_THROUGH' | 'VOCAB' | 'GRAMMAR' | 'KANJI' | 'VIDEO' | 'AUDIO' | 'FLASH_CARD' | 'QUIZ' | 'SLIDE' | 'TEXT' | 'FILE' | 'HINAGAN' | 'KATAKANA' | 'COUNTVOCAB' | 'TESTVOCAB' | 'HIRAGANA' | null,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/student/sessons',
      query: {
        'courseId': courseId,
        'limit': limit,
        'offset': offset,
        'type': type,
        'order': order,
      },
    });
  }

  /**
   * Get sesson by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static sessonUserControllerGetSessonById(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/student/sessons/{id}',
      path: {
        'id': id,
      },
    });
  }

}
