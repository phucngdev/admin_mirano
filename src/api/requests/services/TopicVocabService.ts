/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTopicVocabDto } from '../models/CreateTopicVocabDto';
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpdateTopicVocabDto } from '../models/UpdateTopicVocabDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TopicVocabService {

  /**
   * Get all topic vocabs by topic id
   * @param topicId
   * @param limit
   * @param offset
   * @param q
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static topicVocabControllerGetAllTopicVocabs(
    topicId: string,
    limit: number = 10,
    offset: number,
    q?: string | null,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/topic-vocabs',
      query: {
        'topicId': topicId,
        'limit': limit,
        'offset': offset,
        'q': q,
        'order': order,
      },
    });
  }

  /**
   * Create topic vocab
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static topicVocabControllerCreateTopic(
    requestBody: CreateTopicVocabDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/topic-vocabs',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Get topic vocab by topic vocab id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static topicVocabControllerGetTopicVocabById(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/topic-vocabs/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Update topic vocab
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static topicVocabControllerUpdateTopicVocab(
    id: string,
    requestBody: UpdateTopicVocabDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/topic-vocabs/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete topic vocab
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static topicVocabControllerDeleteTopicVocab(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/topic-vocabs/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Import topic vocab from file
   * @param topicId
   * @returns any
   * @throws ApiError
   */
  public static topicVocabControllerCreateMultipleTopicVocab(
    topicId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/topic-vocabs/import',
      query: {
        'topicId': topicId,
      },
    });
  }

  /**
   * Get all topic vocabs by topic id
   * @param topicId
   * @param limit
   * @param offset
   * @param q
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static topicVocabUserControllerGetAllTopicVocabs(
    topicId: string,
    limit: number = 10,
    offset: number,
    q?: string | null,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/student/topic-vocabs',
      query: {
        'topicId': topicId,
        'limit': limit,
        'offset': offset,
        'q': q,
        'order': order,
      },
    });
  }

  /**
   * Get topic vocab by topic vocab id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static topicVocabUserControllerGetTopicVocabById(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/student/topic-vocabs/{id}',
      path: {
        'id': id,
      },
    });
  }

}
