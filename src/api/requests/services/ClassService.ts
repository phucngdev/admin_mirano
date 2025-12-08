/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddCourseDto } from '../models/AddCourseDto';
import type { AddStudentDto } from '../models/AddStudentDto';
import type { AddTeacherDto } from '../models/AddTeacherDto';
import type { CreateClassDto } from '../models/CreateClassDto';
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpdateClassDto } from '../models/UpdateClassDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ClassService {

  /**
   * Get all class
   * @param limit
   * @param offset
   * @param q
   * @param fromDate
   * @param toDate
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static classControllerGetAllClass(
    limit: number = 10,
    offset: number,
    q?: string | null,
    fromDate?: string | null,
    toDate?: string | null,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/classes',
      query: {
        'limit': limit,
        'offset': offset,
        'q': q,
        'fromDate': fromDate,
        'toDate': toDate,
        'order': order,
      },
    });
  }

  /**
   * Create class
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static classControllerCreateClass(
    requestBody: CreateClassDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/classes',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Add course to class
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static classControllerAddCourseToClass(
    requestBody: AddCourseDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/classes/add-course',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Export excel class report
   * @param classId
   * @param scope
   * @param attendanceCourseId
   * @param homeworkCourseId
   * @param fromDate
   * @param toDate
   * @returns any
   * @throws ApiError
   */
  public static classControllerClassReport(
    classId: string,
    scope: string,
    attendanceCourseId: string,
    homeworkCourseId: string,
    fromDate?: string,
    toDate?: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/classes/export',
      query: {
        'classId': classId,
        'scope': scope,
        'attendanceCourseId': attendanceCourseId,
        'homeworkCourseId': homeworkCourseId,
        'fromDate': fromDate,
        'toDate': toDate,
      },
    });
  }

  /**
   * Add student to class
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static classControllerAddStudentToClass(
    requestBody: AddStudentDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/classes/add-student',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Add student to class
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static classControllerAddTeacherToClass(
    requestBody: AddTeacherDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/classes/add-teacher',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Get exam result in class
   * @param classId
   * @param courseId
   * @returns any
   * @throws ApiError
   */
  public static classControllerGetExamResult(
    classId: string,
    courseId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/classes/{classId}/courseId/{courseId}/exam-result',
      path: {
        'classId': classId,
        'courseId': courseId,
      },
    });
  }

  /**
   * Get exam result in class
   * @param classId
   * @param courseId
   * @param examId
   * @returns any
   * @throws ApiError
   */
  public static classControllerGetExamResultDetail(
    classId: string,
    courseId: string,
    examId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/classes/{classId}/course/{courseId}/exam/{examId}/exam-result-detail',
      path: {
        'classId': classId,
        'courseId': courseId,
        'examId': examId,
      },
    });
  }

  /**
   * Get student info in class
   * @param studentId
   * @returns any
   * @throws ApiError
   */
  public static classControllerGetStudentDetail(
    studentId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/classes/student/{studentId}',
      path: {
        'studentId': studentId,
      },
    });
  }

  /**
   * Get student info in class
   * @param classId
   * @param studentId
   * @returns any
   * @throws ApiError
   */
  public static classControllerGetClassDetailOfStudent(
    classId: string,
    studentId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/classes/{classId}/student/{studentId}/detail-class',
      path: {
        'classId': classId,
        'studentId': studentId,
      },
    });
  }

  /**
   * Get student info in class
   * @param classId
   * @param studentId
   * @param courseId
   * @returns any
   * @throws ApiError
   */
  public static classControllerGetCourseDetailOfStudent(
    classId: string,
    studentId: string,
    courseId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/classes/{classId}/student/{studentId}/courseId/{courseId}/detail-course',
      path: {
        'classId': classId,
        'studentId': studentId,
        'courseId': courseId,
      },
    });
  }

  /**
   * Get class by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static classControllerGetCourseAndUserByClassId(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/classes/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Update class
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static classControllerUpdateClass(
    id: string,
    requestBody: UpdateClassDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/classes/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete class
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static classControllerDeleteClass(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/classes/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Remove course from class
   * @param classId
   * @param courseId
   * @returns any
   * @throws ApiError
   */
  public static classControllerRemoveCourseFromClass(
    classId: string,
    courseId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/classes/{classId}/course/{courseId}',
      path: {
        'classId': classId,
        'courseId': courseId,
      },
    });
  }

  /**
   * Remove student from class
   * @param classId
   * @param studentId
   * @returns any
   * @throws ApiError
   */
  public static classControllerRemoveStudentFromClass(
    classId: string,
    studentId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/classes/{classId}/student/{studentId}',
      path: {
        'classId': classId,
        'studentId': studentId,
      },
    });
  }

  /**
   * Remove teacher from class
   * @param classId
   * @param teacherId
   * @returns any
   * @throws ApiError
   */
  public static classControllerRemoveTeacherFromClass(
    classId: string,
    teacherId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/classes/{classId}/teacher/{teacherId}',
      path: {
        'classId': classId,
        'teacherId': teacherId,
      },
    });
  }

  /**
   * Get all classes of student
   * @returns any
   * @throws ApiError
   */
  public static classStudentControllerGetAllClasses(): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/student/classes/all-classes',
    });
  }

  /**
   * Get class by id
   * @param classId
   * @returns any
   * @throws ApiError
   */
  public static classStudentControllerGetCourseAndUserByClassId(
    classId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/student/classes/{classId}',
      path: {
        'classId': classId,
      },
    });
  }

}
