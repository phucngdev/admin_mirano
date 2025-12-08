/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateDocumentType } from '../models/CreateDocumentType';
import type { CreateTextDto } from '../models/CreateTextDto';
import type { DeleteDocumentType } from '../models/DeleteDocumentType';
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpdateDocumentType } from '../models/UpdateDocumentType';
import type { UpdateTextDto } from '../models/UpdateTextDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TextService {

  /**
   * add video
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static textControllerAddText(
    requestBody: CreateTextDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/text',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * get text by lesson id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static textControllerGetText(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/text/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * update text by id
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static textControllerUpdateText(
    id: string,
    requestBody: UpdateTextDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/text/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * delete text by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static textControllerDeleteText(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/text/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * add document by text id
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static textControllerAddDocument(
    id: string,
    requestBody: CreateDocumentType,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/text/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * update document by text id
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static textControllerUpdateDocument(
    id: string,
    requestBody: UpdateDocumentType,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/text/document/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * delete document by text id
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static textControllerDeleteDocument(
    id: string,
    requestBody: DeleteDocumentType,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/text/document/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * get text for user by lesson id
   * @param id
   * @param limit
   * @param offset
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static textControllerGetTextUser(
    id: string,
    limit: number = 10,
    offset: number,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/text/user/{id}',
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

}
