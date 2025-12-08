/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTopicDto } from '../models/CreateTopicDto';
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpdateTopicDto } from '../models/UpdateTopicDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TopicService {

  /**
   * Get all topics
   * @param limit
   * @param offset
   * @param q
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static topicControllerGetAllTopics(
    limit: number = 10,
    offset: number,
    q?: string | null,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/topics',
      query: {
        'limit': limit,
        'offset': offset,
        'q': q,
        'order': order,
      },
    });
  }

  /**
   * Create topic
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static topicControllerCreateTopic(
    requestBody: CreateTopicDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/topics',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Get topic by topic id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static topicControllerGetTopicById(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/topics/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Update topic
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static topicControllerUpdateTopic(
    id: string,
    requestBody: UpdateTopicDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/topics/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete topic
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static topicControllerDeleteTopic(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/topics/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Get all topics
   * @param limit
   * @param offset
   * @param q
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static topicUserControllerGetAllTopics(
    limit: number = 10,
    offset: number,
    q?: string | null,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/user/topics',
      query: {
        'limit': limit,
        'offset': offset,
        'q': q,
        'order': order,
      },
    });
  }

  /**
   * Get topic by topic id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static topicUserControllerGetTopicById(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/user/topics/{id}',
      path: {
        'id': id,
      },
    });
  }

}
