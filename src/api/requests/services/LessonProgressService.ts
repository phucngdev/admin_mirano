/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpsertLessonProgressDto } from '../models/UpsertLessonProgressDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LessonProgressService {

  /**
   * Create lesson progress
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static lessonProgressControllerUpsertLessonProgress(
    requestBody: UpsertLessonProgressDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/lesson-progresses',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

}
