import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/config/axios';
import { API_ENDPOINTS } from '../../api/config/endpoints';

interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  error: null,
  isAuthenticated: !!localStorage.getItem('access_token'),
  isLoading: false,
  token: localStorage.getItem('access_token'),
  user: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials,
      );
      const { accessToken, user } = response.data;
      localStorage.setItem('access_token', accessToken);
      return { accessToken, user };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
      localStorage.clear();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  },
);

const authSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
  initialState,
  name: 'auth',
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
