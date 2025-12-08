/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateEssayTestDto } from '../models/CreateEssayTestDto';
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpdateEssayTestDto } from '../models/UpdateEssayTestDto';
import type { UpdateSubmitEssayUserDto } from '../models/UpdateSubmitEssayUserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class EssayTestService {

  /**
   * submit essay test url
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static essayTestControllerSubmitEssayTest(
    requestBody: CreateEssayTestDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/essay-test',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * get essay test by exam id and class id
   * @param examId
   * @param classId
   * @returns any
   * @throws ApiError
   */
  public static essayTestControllerGetEssayTest(
    examId: string,
    classId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/essay-test',
      query: {
        'examId': examId,
        'classId': classId,
      },
    });
  }

  /**
   * get name and id of exam essay by course id
   * @param courseId
   * @returns any
   * @throws ApiError
   */
  public static essayTestControllerGetInformationEssayExam(
    courseId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/essay-test/information-exam/{courseId}',
      path: {
        'courseId': courseId,
      },
    });
  }

  /**
   * get essay test by user id and exam id
   * @param userId
   * @param examId
   * @returns any
   * @throws ApiError
   */
  public static essayTestControllerGetEssayTestByUser(
    userId: string,
    examId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/essay-test/by-user/test',
      query: {
        'userId': userId,
        'examId': examId,
      },
    });
  }

  /**
   * update submit essay test by id
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static essayTestControllerUpdateSubmitEssayTest(
    id: string,
    requestBody: UpdateSubmitEssayUserDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/essay-test/submit/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * update essay test by id
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static essayTestControllerUpdateEssayTest(
    id: string,
    requestBody: UpdateEssayTestDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/essay-test/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * delete essay test by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static essayTestControllerDeleteEssayTest(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/essay-test/{id}',
      path: {
        'id': id,
      },
    });
  }

}
