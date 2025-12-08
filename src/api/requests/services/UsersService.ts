/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminUpdateUserDto } from '../models/AdminUpdateUserDto';
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpdateLocaleDto } from '../models/UpdateLocaleDto';
import type { UpdateUserDto } from '../models/UpdateUserDto';
import type { UpdateUserPasswordDto } from '../models/UpdateUserPasswordDto';
import type { UpdateUserStatusDto } from '../models/UpdateUserStatusDto';
import type { UpsertUserDto } from '../models/UpsertUserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

  /**
   * Get current user information
   * @returns any
   * @throws ApiError
   */
  public static userControllerGetUser(): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/users/me',
    });
  }

  /**
   * Update me
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static userControllerUpdateMe(
    requestBody: UpdateUserDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/users/me',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete me
   * @returns any
   * @throws ApiError
   */
  public static userControllerDeleteMe(): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/users/me',
    });
  }

  /**
   * Update a new password
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static userControllerUpdatePass(
    requestBody: UpdateUserPasswordDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/users/me/update-password',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Update a locale of user
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static userControllerUpdateLocale(
    requestBody: UpdateLocaleDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/users/me/update-locale',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Get a user
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static userSuperAdminControllerGetUser(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/users/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Update an user
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static userSuperAdminControllerUpdateAdminOfBusiness(
    id: string,
    requestBody: AdminUpdateUserDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/users/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete an user
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static userSuperAdminControllerDeleteAdminOfBusiness(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/users/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Update status of a user
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static userSuperAdminControllerUpdateUserStatus(
    id: string,
    requestBody: UpdateUserStatusDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/users/{id}/status',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Get list of users
   * @param limit
   * @param offset
   * @param q
   * @param roleId
   * @param userProfile
   * @param isActive
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static userSuperAdminControllerGetUsers(
    limit: number = 10,
    offset: number,
    q?: string | null,
    roleId?: string | null,
    userProfile?: 'STUDENT' | 'TEACHER' | 'SYSTEM_ADMIN' | null,
    isActive?: boolean | null,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/users',
      query: {
        'limit': limit,
        'offset': offset,
        'q': q,
        'roleId': roleId,
        'userProfile': userProfile,
        'isActive': isActive,
        'order': order,
      },
    });
  }

  /**
   * Create an user
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static userSuperAdminControllerCreateUser(
    requestBody: UpsertUserDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/users',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Export excel user
   * @param userId
   * @returns any
   * @throws ApiError
   */
  public static userSuperAdminControllerExportUser(
    userId: string,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/users/export/{userId}',
      path: {
        'userId': userId,
      },
    });
  }

  /**
   * Import excel user
   * @returns any
   * @throws ApiError
   */
  public static userSuperAdminControllerImportUser(): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/users/import',
    });
  }

}
