/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateLessonCommentDto } from '../models/CreateLessonCommentDto';
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpdateLessonCommentDto } from '../models/UpdateLessonCommentDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LessonCommentService {

  /**
   * add comment
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static lessonCommentControllerAddComment(
    requestBody: CreateLessonCommentDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/lesson-comment',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * get comment bt lesson id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static lessonCommentControllerGetComments(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/lesson-comment/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * update comment by id
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static lessonCommentControllerUpdateComment(
    id: string,
    requestBody: UpdateLessonCommentDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/lesson-comment/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * delete comment by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static lessonCommentControllerDeleteComment(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/lesson-comment/{id}',
      path: {
        'id': id,
      },
    });
  }

}
