import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { eraseCookie } from '../../shared/helpers';
import { IAuth } from '../../shared/models/auth.model';
import { login, verify, logout, updatePassword } from './auth.api';

interface IAuthenticationState {
  loginSuccess: boolean;
  updatePasswordSuccess: boolean;
  loading: boolean;
  user: IAuth | null;
  token: string | null;
  errorMessage: string | null;
  isFirstTime: boolean;
}

const initialState: IAuthenticationState = {
  loginSuccess: false,
  updatePasswordSuccess: false,
  loading: false,
  user: null,
  token: null,
  errorMessage: null,
  isFirstTime: false,
};

// export type IAuthentication = Readonly<typeof initialState>;

const authenticationSlice = createSlice({
  name: 'authenticationSlice',
  initialState,
  reducers: {
    fetching(state) {
      state.loading = true;
    },
    reset(state) {
      state.loading = false;
      state.loginSuccess = false;
      state.updatePasswordSuccess = false;
      state.user = null;
      state.token = null;
      state.errorMessage = null;
      state.isFirstTime = false;
    },
    softReset(state) {
      state.loading = false;
      state.updatePasswordSuccess = false;
      state.errorMessage = null;
    },
    toggleIsFirstTime(state) {
      state.isFirstTime = !state.isFirstTime;
    }
  },
  extraReducers: {
    [login.fulfilled.type]: (state, { payload }: PayloadAction<{ token: string }>) => {
      state.token = payload.token;
      state.errorMessage = null;
    },
    [login.rejected.type]: (state, { payload }: PayloadAction<{ message: string }>) => {
      state.errorMessage = payload?.message;
      state.loginSuccess = false;
      state.loading = false;
    },
    [updatePassword.fulfilled.type]: (state, { payload }: PayloadAction<IAuth>) => {
      state.updatePasswordSuccess = true;
      state.loading = false;
    },
    [updatePassword.rejected.type]: (state, { payload }: PayloadAction<{message: string}>) => {
      state.errorMessage = payload.message;
      state.loading = false;
      state.updatePasswordSuccess = false;
    },
    [verify.fulfilled.type]: (state, { payload }: PayloadAction<IAuth>) => {
      state.user = payload;
      state.loginSuccess = true;
      state.errorMessage = null;
      state.loading = false;
    },
    [verify.rejected.type]: (state, { payload }) => {
      state.loginSuccess = false;
      state.loading = false;
    },
    [logout.fulfilled.type]: (state, { payload }: PayloadAction<undefined>) => {
      eraseCookie('jwt');
      state.loginSuccess = false;
      state.errorMessage = null;
      state.loading = false;
      window.location.reload();
    },
    [logout.rejected.type]: (state, { payload }) => {
      state.loginSuccess = false;
      state.loading = false;
    },
    
  },
});

export default authenticationSlice.reducer;
export const { fetching, reset, softReset, toggleIsFirstTime } = authenticationSlice.actions;
