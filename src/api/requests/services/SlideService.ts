/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateDocumentType } from '../models/CreateDocumentType';
import type { CreateSlideDto } from '../models/CreateSlideDto';
import type { DeleteDocumentType } from '../models/DeleteDocumentType';
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpdateDocumentType } from '../models/UpdateDocumentType';
import type { UpdateSlideDto } from '../models/UpdateSlideDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SlideService {

  /**
   * add slide
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static slideControllerAddSlide(
    requestBody: CreateSlideDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/slide',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * get slide by lesson id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static slideControllerGetSlide(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/slide/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * update slide by id
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static slideControllerUpdateSlide(
    id: string,
    requestBody: UpdateSlideDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/slide/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * delete slide by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static slideControllerDeleteSlide(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/slide/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * add document by slide id
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static slideControllerAddDocument(
    id: string,
    requestBody: CreateDocumentType,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/slide/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * update document by slide id
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static slideControllerUpdateDocument(
    id: string,
    requestBody: UpdateDocumentType,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/slide/document/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * delete document by slide id
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static slideControllerDeleteDocument(
    id: string,
    requestBody: DeleteDocumentType,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/slide/document/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * get slide for user by lesson id
   * @param id
   * @param limit
   * @param offset
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static slideControllerGetSlideUser(
    id: string,
    limit: number = 10,
    offset: number,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/slide/user/{id}',
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
