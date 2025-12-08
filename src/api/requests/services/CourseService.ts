/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateCourseDto } from '../models/CreateCourseDto';
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpdateCourseDto } from '../models/UpdateCourseDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CourseService {

  /**
   * Get all course
   * @param limit
   * @param offset
   * @param status
   * @param type
   * @param q
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static courseControllerGetAllCourse(
    limit: number = 10,
    offset: number,
    status?: 'ACTIVE' | 'INACTIVE' | null,
    type?: 'BASIC' | 'ADVANCED' | null,
    q?: string | null,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/courses',
      query: {
        'limit': limit,
        'offset': offset,
        'status': status,
        'type': type,
        'q': q,
        'order': order,
      },
    });
  }

  /**
   * Create course
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static courseControllerCreateCourse(
    requestBody: CreateCourseDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/courses',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Get courses not in class
   * @param classId
   * @param limit
   * @param offset
   * @param status
   * @param type
   * @param q
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static courseControllerGetCoursesNotInClass(
    classId: string,
    limit: number = 10,
    offset: number,
    status?: 'ACTIVE' | 'INACTIVE' | null,
    type?: 'BASIC' | 'ADVANCED' | null,
    q?: string | null,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/courses/not-in-class',
      query: {
        'limit': limit,
        'offset': offset,
        'classId': classId,
        'status': status,
        'type': type,
        'q': q,
        'order': order,
      },
    });
  }

  /**
   * Get course by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static courseControllerGetCourseById(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/courses/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Update course
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static courseControllerUpdateCourse(
    id: string,
    requestBody: UpdateCourseDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/courses/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete course
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static courseControllerDeleteCourse(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/courses/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Get all courses for student
   * @returns any
   * @throws ApiError
   */
  public static courseStudentControllerGetAllCourses(): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/student/courses',
    });
  }

  /**
   * Get course by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static courseStudentControllerGetCourseById(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/student/courses/{id}',
      path: {
        'id': id,
      },
    });
  }

}
