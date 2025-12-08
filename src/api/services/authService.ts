import { jsonAxios } from '../axios/axios';
import type {
  ConfirmRegisterDto,
  LoginAppleDto,
  LoginInputDto,
} from '../requests';
import type { ForgotPasswordDto } from '../requests/interfaces/ForgotPassworđto';
import type { LoginGoogleDto } from '../requests/interfaces/LoginGoogleDto';
import type { RefreshTokenDto } from '../requests/interfaces/RefreshTokenDto';
import type { RegisterDto } from '../requests/interfaces/RegisterDto';
import type { ResetPasswordDto } from '../requests/interfaces/ResetPasswordDto';
import type { VerifyOtpDto } from '../requests/interfaces/VerifyOtpDto';

export const loginService = async (data: LoginInputDto) =>
  await jsonAxios.post(`auth/login`, data);

// export const registerService = async (data: RegisterDto) =>
//   await jsonAxios.post(`auth/register`, data);

export const confirmRegisterService = async (data: ConfirmRegisterDto) =>
  await jsonAxios.post(`auth/confirm-register`, data);

export const refreshTokenService = async (data: RefreshTokenDto) =>
  await jsonAxios.post(`auth/refresh-token`, data);

export const forrgotPasswordService = async (data: ForgotPasswordDto) =>
  await jsonAxios.post(`auth/forgot-password`, data);

export const resetPasswordService = async (data: ResetPasswordDto) =>
  await jsonAxios.post(`auth/reset-password`, data);

export const loginGoogleService = async (data: LoginGoogleDto) =>
  await jsonAxios.post(`auth/login-google`, data);

export const loginAppleService = async (data: LoginAppleDto) =>
  await jsonAxios.post(`auth/login-apple`, data);

export const renewOtpService = async (data: LoginAppleDto) =>
  await jsonAxios.post(`auth/renew-otp`, data);

export const verifyOtpService = async (data: VerifyOtpDto) =>
  await jsonAxios.post(`auth/verify-otp`, data);

export const logoutService = async () => await jsonAxios.post(`auth/logout`);

export const refreshToken = async (ref: string) =>
  await jsonAxios.post(`auth/refresh-token`, {
    refreshToken: ref,
  });
