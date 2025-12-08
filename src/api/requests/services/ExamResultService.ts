/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpsertExamResultStudentDto } from '../models/UpsertExamResultStudentDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ExamResultService {

  /**
   * Get exam result of course in class by student
   * @param classId
   * @param courseId
   * @returns any
   * @throws ApiError
   */
  public static examResultStudentControllerGetExamResultInCourse(
    classId: string,
    courseId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/student/exam-results',
      query: {
        'classId': classId,
        'courseId': courseId,
      },
    });
  }

  /**
   * Create or update exam result
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static examResultStudentControllerCreateExamResult(
    requestBody: UpsertExamResultStudentDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/student/exam-results',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Get exam result by student
   * @param examId
   * @returns any
   * @throws ApiError
   */
  public static examResultStudentControllerGetExamResultByStudent(
    examId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/student/exam-results/{examId}',
      path: {
        'examId': examId,
      },
    });
  }

  /**
   * Get exam result history by and exam id and user id
   * @param userId
   * @param examId
   * @returns any
   * @throws ApiError
   */
  public static examResultStudentControllerGetExamResultHistory(
    userId: string,
    examId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/student/exam-results/exam/{examId}/user/{userId}',
      path: {
        'userId': userId,
        'examId': examId,
      },
    });
  }

  /**
   * Get exam result history detail by and exam result id
   * @param examResultId
   * @returns any
   * @throws ApiError
   */
  public static examResultStudentControllerGetExamResultHistoryDetail(
    examResultId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/student/exam-results/exam-detail/{examResultId}',
      path: {
        'examResultId': examResultId,
      },
    });
  }

}
