/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IBaseResponse } from '../models/IBaseResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class KanjiDictionaryService {

  /**
   * Get all dictionary with limit 10
   * @param limit
   * @param offset
   * @param search
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static kanjiDictionaryControllerGetAllKanjiDictionary(
    limit: number = 10,
    offset: number,
    search?: string,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/kanji-dictionaries',
      query: {
        'limit': limit,
        'offset': offset,
        'search': search,
        'order': order,
      },
    });
  }

  /**
   * Import kanji dictionary
   * @returns any
   * @throws ApiError
   */
  public static kanjiDictionaryControllerImportDictionary(): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/kanji-dictionaries/import',
    });
  }

  /**
   * Get all dictionary with limit 10
   * @param limit
   * @param offset
   * @param search
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static kanjiDictionaryStudentControllerGetAllKanjiDictionary(
    limit: number = 10,
    offset: number,
    search?: string,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/student/kanji-dictionaries',
      query: {
        'limit': limit,
        'offset': offset,
        'search': search,
        'order': order,
      },
    });
  }

}
