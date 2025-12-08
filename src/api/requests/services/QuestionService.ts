/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateDocumentType } from '../models/CreateDocumentType';
import type { CreateQuestionDto } from '../models/CreateQuestionDto';
import type { DeleteDocumentType } from '../models/DeleteDocumentType';
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpdateDocumentType } from '../models/UpdateDocumentType';
import type { UpdateQuestionDto } from '../models/UpdateQuestionDto';
import type { UpdateTagMultipleQuestionDto } from '../models/UpdateTagMultipleQuestionDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class QuestionService {

  /**
   * Get all question
   * @param limit
   * @param offset
   * @param type
   * @param questionGroupId
   * @param search
   * @param tag
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static questionControllerGetAllQuestion(
    limit: number = 10,
    offset: number,
    type?: 'MULTIPLE_CHOICE' | 'SORTING' | 'MATCHING' | 'MULTIPLE_CHOICE_HORIZONTAL' | 'FILL_IN_BLANK' | 'CHOOSE_ANSWER_IN_BLANK' | 'ESSAY' | null,
    questionGroupId?: string | null,
    search?: string | null,
    tag?: string | null,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/questions',
      query: {
        'limit': limit,
        'offset': offset,
        'type': type,
        'questionGroupId': questionGroupId,
        'search': search,
        'tag': tag,
        'order': order,
      },
    });
  }

  /**
   * Create question
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static questionControllerCreateQuestion(
    requestBody: CreateQuestionDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/questions',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Get question by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static questionControllerGetQuestionById(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/questions/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Update question
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static questionControllerUpdateQuestion(
    id: string,
    requestBody: UpdateQuestionDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/questions/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete question
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static questionControllerDeleteQuestion(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/questions/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Create question and add to question group
   * @param questionGroupId
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static questionControllerCreateQuestionInQuestionGroup(
    questionGroupId: string,
    requestBody: CreateQuestionDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/questions/{questionGroupId}/create-to-group',
      path: {
        'questionGroupId': questionGroupId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * add document by question id
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static questionControllerAddDocument(
    id: string,
    requestBody: CreateDocumentType,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/questions/document/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * update document by question id
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static questionControllerUpdateDocument(
    id: string,
    requestBody: UpdateDocumentType,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/questions/document/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * delete document by question id
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static questionControllerDeleteDocument(
    id: string,
    requestBody: DeleteDocumentType,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/questions/document/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Update tag multiple question
   * @param ids
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static questionControllerUpdateTagMultipleQuestion(
    ids: string,
    requestBody: UpdateTagMultipleQuestionDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/questions/{ids}/tag',
      path: {
        'ids': ids,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete multiple questions
   * @param ids
   * @returns any
   * @throws ApiError
   */
  public static questionControllerDeleteMultipleQuestion(
    ids: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/questions/multiple/{ids}',
      path: {
        'ids': ids,
      },
    });
  }

  /**
   * Import question from Excel file
   * @returns any
   * @throws ApiError
   */
  public static questionControllerImportQuestion(): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/questions/import-excel/question',
    });
  }

}
