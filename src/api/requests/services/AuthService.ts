/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConfirmRegisterDto } from '../models/ConfirmRegisterDto';
import type { ForgotPasswordInputDto } from '../models/ForgotPasswordInputDto';
import type { IBaseResponse } from '../models/IBaseResponse';
import type { LoginAppleDto } from '../models/LoginAppleDto';
import type { LoginGoogleDto } from '../models/LoginGoogleDto';
import type { LoginInputDto } from '../models/LoginInputDto';
import type { RefreshTokenInputDto } from '../models/RefreshTokenInputDto';
import type { RegisterInputDto } from '../models/RegisterInputDto';
import type { ResendCodeInputDto } from '../models/ResendCodeInputDto';
import type { ResetPasswordInputDto } from '../models/ResetPasswordInputDto';
import type { VerifyCodeInputDto } from '../models/VerifyCodeInputDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

  /**
   * Register a new customer
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static authControllerRegister(
    requestBody: RegisterInputDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/register',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Verify new registration with OTP code
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static authControllerConfirmRegister(
    requestBody: ConfirmRegisterDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/confirm-register',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Login
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static authControllerLogin(
    requestBody: LoginInputDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/login',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Refresh access token when expired
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static authControllerRefreshToken(
    requestBody: RefreshTokenInputDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/refresh-token',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Request OTP when forgot password
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static authControllerForgotPassword(
    requestBody: ForgotPasswordInputDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/forgot-password',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Set a new password with the verification code correct
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static authControllerResetPassword(
    requestBody: ResetPasswordInputDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/reset-password',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Login with google
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static authControllerLoginByGoogle(
    requestBody: LoginGoogleDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/login-google',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Login with apple
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static authControllerLoginByApple(
    requestBody: LoginAppleDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/login-apple',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Resend a new OTP code
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static authControllerRenewOtp(
    requestBody: ResendCodeInputDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/renew-otp',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Verify OTP code is correct
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static authControllerVerifyOtp(
    requestBody: VerifyCodeInputDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/verify-otp',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Logout
   * @returns any
   * @throws ApiError
   */
  public static authControllerLogout(): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/logout',
    });
  }

}
