import { createSlice } from '@reduxjs/toolkit';
import { login } from '../thunk/auth.thunk';

interface AuthState {
  status: 'idle' | 'pending' | 'successfully' | 'failed';
  data: any;
}

const initialState: AuthState = {
  data: null,
  status: 'idle',
};

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = 'successfully';
      state.data = action.payload.data.user;
    });
    // .addCase(getMe.fulfilled, (state, action) => {
    //   state.status = 'successfully';
    //   state.data = action.payload.data;
    // });
  },
});

export default authSlice.reducer;
