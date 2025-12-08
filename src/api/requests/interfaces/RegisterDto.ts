export interface RegisterDto {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  referredUserCode?: string;
}
