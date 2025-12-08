/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateKanjiDto } from '../models/CreateKanjiDto';
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpdateKanjiDto } from '../models/UpdateKanjiDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class KanjiService {

  /**
   * Get all kanji
   * @param lessonId
   * @param limit
   * @param offset
   * @param q
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static kanjiControllerGetAllKanji(
    lessonId: string,
    limit: number = 10,
    offset: number,
    q?: string | null,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/kanjis',
      query: {
        'lessonId': lessonId,
        'limit': limit,
        'offset': offset,
        'q': q,
        'order': order,
      },
    });
  }

  /**
   * Create kanji
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static kanjiControllerCreateKanji(
    requestBody: CreateKanjiDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/kanjis',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Get kanji by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static kanjiControllerGetKanjiById(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/kanjis/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Update kanji
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static kanjiControllerUpdateKanji(
    id: string,
    requestBody: UpdateKanjiDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/kanjis/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete kanji
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static kanjiControllerDeleteKanji(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/kanjis/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Import excel kanji
   * @param lessonId
   * @returns any
   * @throws ApiError
   */
  public static kanjiControllerImportExcelKanjis(
    lessonId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/kanjis/import',
      query: {
        'lessonId': lessonId,
      },
    });
  }

  /**
   * Get all kanji
   * @param lessonId
   * @param limit
   * @param offset
   * @param q
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static kanjiUserControllerGetAllKanji(
    lessonId: string,
    limit: number = 10,
    offset: number,
    q?: string | null,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/student/kanjis',
      query: {
        'lessonId': lessonId,
        'limit': limit,
        'offset': offset,
        'q': q,
        'order': order,
      },
    });
  }

  /**
   * Get kanji by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static kanjiUserControllerGetKanjiById(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/student/kanjis/{id}',
      path: {
        'id': id,
      },
    });
  }

}
