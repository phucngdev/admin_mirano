/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateExamAndAddToLessonDto } from '../models/CreateExamAndAddToLessonDto';
import type { CreateExamLessonDto } from '../models/CreateExamLessonDto';
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpdateExamLessonDto } from '../models/UpdateExamLessonDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ExamLessonService {

  /**
   * Get exams by lessonId (admin)
   * @param lessonId
   * @returns any
   * @throws ApiError
   */
  public static examLessonControllerGetExamsByLessonAdmin(
    lessonId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/exam-lesson/admin/{lessonId}',
      path: {
        'lessonId': lessonId,
      },
    });
  }

  /**
   * Get exams by lessonId (user)
   * @param lessonId
   * @returns any
   * @throws ApiError
   */
  public static examLessonControllerGetExamsByLessonUser(
    lessonId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/exam-lesson/user/{lessonId}',
      path: {
        'lessonId': lessonId,
      },
    });
  }

  /**
   * Add exam to lesson (admin)
   * @param lessonId
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static examLessonControllerAddExamToLesson(
    lessonId: string,
    requestBody: CreateExamLessonDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/exam-lesson/lesson/{lessonId}',
      path: {
        'lessonId': lessonId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Create new exam and add to lesson (admin)
   * @param lessonId
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static examLessonControllerCreateExamAndAddToLesson(
    lessonId: string,
    requestBody: CreateExamAndAddToLessonDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/exam-lesson/create-and-add/{lessonId}',
      path: {
        'lessonId': lessonId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Update exam lesson by examId and lessonId (admin)
   * @param examId
   * @param lessonId
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static examLessonControllerUpdateExamLesson(
    examId: string,
    lessonId: string,
    requestBody: UpdateExamLessonDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/exam-lesson/{examId}/{lessonId}',
      path: {
        'examId': examId,
        'lessonId': lessonId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Remove exam from lesson (admin)
   * @param examId
   * @param lessonId
   * @returns any
   * @throws ApiError
   */
  public static examLessonControllerRemoveExamFromLesson(
    examId: string,
    lessonId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/exam-lesson/{examId}/{lessonId}',
      path: {
        'examId': examId,
        'lessonId': lessonId,
      },
    });
  }

}
