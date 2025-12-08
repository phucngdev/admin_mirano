/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateQuizFlashCardDto } from '../models/CreateQuizFlashCardDto';
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpdateQuizFlashCardDto } from '../models/UpdateQuizFlashCardDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class QuizFlashCardService {

  /**
   * add quiz of flash card
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static quizFlashCardControllerAddQuizFlashCard(
    requestBody: CreateQuizFlashCardDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/quiz-flash-card',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * get quiz by lesson id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static quizFlashCardControllerGetQuizFlashCard(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/quiz-flash-card/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * update quiz by id
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static quizFlashCardControllerUpdateQuizFlashCard(
    id: string,
    requestBody: UpdateQuizFlashCardDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/quiz-flash-card/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * delete quiz by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static quizFlashCardControllerDeleteQuizFlashCard(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/quiz-flash-card/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * get quiz for user by lesson id
   * @param id
   * @param limit
   * @param offset
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static quizFlashCardControllerGetQuizFlashCardUser(
    id: string,
    limit: number = 10,
    offset: number,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/quiz-flash-card/user/{id}',
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
