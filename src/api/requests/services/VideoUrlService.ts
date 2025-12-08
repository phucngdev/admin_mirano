/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateDocumentType } from '../models/CreateDocumentType';
import type { CreateVideoUrlDto } from '../models/CreateVideoUrlDto';
import type { DeleteDocumentType } from '../models/DeleteDocumentType';
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpdateDocumentType } from '../models/UpdateDocumentType';
import type { UpdateVideoUrlDto } from '../models/UpdateVideoUrlDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class VideoUrlService {

  /**
   * add video url
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static videoUrlControllerAddVideoUrl(
    requestBody: CreateVideoUrlDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/video-url',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * get video by lesson id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static videoUrlControllerGetVideo(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/video-url/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * update video by id
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static videoUrlControllerUpdateVideo(
    id: string,
    requestBody: UpdateVideoUrlDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/video-url/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * delete video by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static videoUrlControllerDeleteVideo(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/video-url/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * add document by video id
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static videoUrlControllerAddDocument(
    id: string,
    requestBody: CreateDocumentType,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/video-url/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * update document by video id
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static videoUrlControllerUpdateDocument(
    id: string,
    requestBody: UpdateDocumentType,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/video-url/document/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * delete document by video id
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static videoUrlControllerDeleteDocument(
    id: string,
    requestBody: DeleteDocumentType,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/video-url/document/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * get video for user by lesson id
   * @param id
   * @param limit
   * @param offset
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static videoUrlControllerGetVideoUser(
    id: string,
    limit: number = 10,
    offset: number,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/video-url/user/{id}',
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
