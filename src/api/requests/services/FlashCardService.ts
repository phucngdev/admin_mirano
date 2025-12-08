/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateFlashCardDto } from '../models/CreateFlashCardDto';
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpdateFlashCardDto } from '../models/UpdateFlashCardDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FlashCardService {

  /**
   * add flash card
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static flashCardControllerAddFlashCard(
    requestBody: CreateFlashCardDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/flash-card',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * get flash card by lesson id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static flashCardControllerGetFlashCard(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/flash-card/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * update flash card by id
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static flashCardControllerUpdateFlashCard(
    id: string,
    requestBody: UpdateFlashCardDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/flash-card/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * delete flash card by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static flashCardControllerDeleteFlashCard(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/flash-card/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * get flash card user by lesson id
   * @param id
   * @param limit
   * @param offset
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static flashCardControllerGetFlashCardUser(
    id: string,
    limit: number = 10,
    offset: number,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/flash-card/user/{id}',
      path: {
        'id': id,
      },
      query: {
        'limit': limit,
        'offset': offset,
        'order': order,
      },
    });
  }

  /**
   * Update status flash card user by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static flashCardControllerUpdateStatusFlashCardUser(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/flash-card/{id}/user/set-status',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Import flash cards from Excel file , If an error occurs, the file will be returned.
   * @param lessonId
   * @param limit
   * @param offset
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static flashCardControllerImportFlashCards(
    lessonId: string,
    limit: number = 10,
    offset: number,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/flash-card/import-excel',
      query: {
        'lessonId': lessonId,
        'limit': limit,
        'offset': offset,
        'order': order,
      },
    });
  }

}
