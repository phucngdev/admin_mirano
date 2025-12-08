/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateQuestionFlashCardDto } from '../models/CreateQuestionFlashCardDto';
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpdateQuestionFlashCardDto } from '../models/UpdateQuestionFlashCardDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class QuestionFlashCardService {

  /**
   * add question of flash card by quiz id
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static questionFlashCardControllerAddQuestionFlashCard(
    id: string,
    requestBody: CreateQuestionFlashCardDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/question-flash-card/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * update question by id
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static questionFlashCardControllerUpdateQuestion(
    id: string,
    requestBody: UpdateQuestionFlashCardDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/question-flash-card/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * delete question by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static questionFlashCardControllerDeleteQuestion(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/question-flash-card/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Import question flash cards from Excel file
   * @param quizId
   * @returns any
   * @throws ApiError
   */
  public static questionFlashCardControllerImportQuestionFlashCards(
    quizId?: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/question-flash-card/import-excel/question',
      query: {
        'quizId': quizId,
      },
    });
  }

}
