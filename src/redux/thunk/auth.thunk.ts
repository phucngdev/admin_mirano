import { confirmRegisterService } from '#/api/services/authService';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginService } from '../../api/services/authService';
import { ConfirmRegisterDto, LoginInputDto } from '#/api/requests';

export const login = createAsyncThunk(
  'auth/login',
  async (data: LoginInputDto) => {
    try {
      const response = await loginService(data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);

// export const register = createAsyncThunk(
//   'auth/register',
//   async (data: RegisterDto) => {
//     try {
//       const response = await registerService(data);
//       return response.data;
//     } catch (error) {
//       console.log('🚀 ~ error:', error);
//       return error;
//     }
//   },
// );

export const confirmRegister = createAsyncThunk(
  'auth/confirm-register',
  async (data: ConfirmRegisterDto) => {
    try {
      const response = await confirmRegisterService(data);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return error;
    }
  },
);
