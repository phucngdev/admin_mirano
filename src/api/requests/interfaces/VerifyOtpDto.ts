export interface VerifyOtpDto {
  email: string;
  action: 'REGISTER';
  verifyCode: string;
}
