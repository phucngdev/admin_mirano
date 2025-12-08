/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateClassReviewDto } from '../models/CreateClassReviewDto';
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpdateClassReviewDto } from '../models/UpdateClassReviewDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ClassReviewService {

  /**
   * Get class review of student
   * @param classId
   * @param studentId
   * @returns any
   * @throws ApiError
   */
  public static classReviewControllerGetClassReviewOfStudent(
    classId: string,
    studentId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/class-reviews/class/{classId}/student/{studentId}',
      path: {
        'classId': classId,
        'studentId': studentId,
      },
    });
  }

  /**
   * Create class review
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static classReviewControllerCreateClassReview(
    requestBody: CreateClassReviewDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/class-reviews',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Update class review
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static classReviewControllerUpdateClassReview(
    id: string,
    requestBody: UpdateClassReviewDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/class-reviews/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete class review
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static classReviewControllerDeleteClassReview(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/class-reviews/{id}',
      path: {
        'id': id,
      },
    });
  }

}
