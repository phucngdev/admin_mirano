/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CloneScheduleDto } from '../models/CloneScheduleDto';
import type { CreateClassSessonScheduleDto } from '../models/CreateClassSessonScheduleDto';
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpdateLessonsSessonSchedulesDto } from '../models/UpdateLessonsSessonSchedulesDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SessonScheduleService {

  /**
   * Get all sesson schedules
   * @param classId
   * @param courseId
   * @returns any
   * @throws ApiError
   */
  public static sessonScheduleControllerFindAll(
    classId: string,
    courseId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/sesson-schedules',
      query: {
        'classId': classId,
        'courseId': courseId,
      },
    });
  }

  /**
   * Create session schedule
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static sessonScheduleControllerCreate(
    requestBody: CreateClassSessonScheduleDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/sesson-schedules',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Clone course schedule from another class
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static sessonScheduleControllerCloneCourseSchedule(
    requestBody: CloneScheduleDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/sesson-schedules/clone-schedule',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Add lesson into sesson schedule
   * @param lessonId
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static sessonScheduleControllerAddLessonIntoSessonSchedule(
    lessonId: string,
    requestBody: UpdateLessonsSessonSchedulesDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/sesson-schedules/lesson/{lessonId}/add',
      path: {
        'lessonId': lessonId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Remove lesson from sesson schedule
   * @param lessonId
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static sessonScheduleControllerRemoveLessonFromSessonSchedule(
    lessonId: string,
    requestBody: UpdateLessonsSessonSchedulesDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/sesson-schedules/lesson/{lessonId}/remove',
      path: {
        'lessonId': lessonId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete session schedule by id
   * @param ids
   * @returns any
   * @throws ApiError
   */
  public static sessonScheduleControllerDelete(
    ids: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/sesson-schedules/{ids}',
      path: {
        'ids': ids,
      },
    });
  }

  /**
   * Get all sesson schedule with course and class
   * @param classId
   * @param courseId
   * @param limit
   * @param offset
   * @returns any
   * @throws ApiError
   */
  public static studentSessonScheduleControllerGetAllScheduleWithCourse(
    classId: string,
    courseId: string,
    limit: number = 10,
    offset: number,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/student/sesson-schedules',
      query: {
        'classId': classId,
        'courseId': courseId,
        'limit': limit,
        'offset': offset,
      },
    });
  }

}
