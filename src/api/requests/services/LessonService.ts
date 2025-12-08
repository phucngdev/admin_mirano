/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateLessonDto } from '../models/CreateLessonDto';
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpdateLessonDto } from '../models/UpdateLessonDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LessonService {

  /**
   * Get all lessons
   * @param sessonId
   * @param limit
   * @param offset
   * @param type
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static lessonControllerGetAllLesson(
    sessonId: string,
    limit: number = 10,
    offset: number,
    type?: 'LISTENING' | 'READING' | 'PRACTICE_THROUGH' | 'VOCAB' | 'GRAMMAR' | 'KANJI' | 'VIDEO' | 'AUDIO' | 'FLASH_CARD' | 'QUIZ' | 'SLIDE' | 'TEXT' | 'FILE' | 'HINAGAN' | 'KATAKANA' | 'COUNTVOCAB' | 'TESTVOCAB' | 'HIRAGANA' | null,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/lessons',
      query: {
        'sessonId': sessonId,
        'limit': limit,
        'offset': offset,
        'type': type,
        'order': order,
      },
    });
  }

  /**
   * Create lesson
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static lessonControllerCreateLesson(
    requestBody: CreateLessonDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/lessons',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Get lesson by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static lessonControllerGetLessonById(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/lessons/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Update lesson
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static lessonControllerUpdateLesson(
    id: string,
    requestBody: UpdateLessonDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/lessons/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete lesson by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static lessonControllerDeleteLesson(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/lessons/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Get all lessons by session
   * @param sessonId
   * @returns any
   * @throws ApiError
   */
  public static lessonUserControllerGetAllLesson(
    sessonId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/student/lessons',
      query: {
        'sessonId': sessonId,
      },
    });
  }

  /**
   * Get lesson by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static lessonUserControllerGetLessonById(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/student/lessons/{id}',
      path: {
        'id': id,
      },
    });
  }

}
