/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateGrammarDto } from '../models/CreateGrammarDto';
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpdateGrammarDto } from '../models/UpdateGrammarDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class GrammarService {

  /**
   * Get all grammar
   * @param lessonId
   * @param limit
   * @param offset
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static grammarControllerGetAllGrammar(
    lessonId: string,
    limit: number = 10,
    offset: number,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/grammars',
      query: {
        'lessonId': lessonId,
        'limit': limit,
        'offset': offset,
        'order': order,
      },
    });
  }

  /**
   * Create grammar
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static grammarControllerCreateGrammar(
    requestBody: CreateGrammarDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/grammars',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Get grammar by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static grammarControllerGetGrammarById(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/grammars/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Update grammar
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static grammarControllerUpdateGrammar(
    id: string,
    requestBody: UpdateGrammarDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/grammars/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete grammar
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static grammarControllerDeleteGrammar(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/grammars/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Get all grammar
   * @param lessonId
   * @param limit
   * @param offset
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static grammarUserControllerGetAllGrammar(
    lessonId: string,
    limit: number = 10,
    offset: number,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/student/grammars',
      query: {
        'lessonId': lessonId,
        'limit': limit,
        'offset': offset,
        'order': order,
      },
    });
  }

  /**
   * Get grammar by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static grammarUserControllerGetGrammarById(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/student/grammars/{id}',
      path: {
        'id': id,
      },
    });
  }

}
