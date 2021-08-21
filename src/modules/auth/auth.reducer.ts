import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { eraseCookie } from '../../shared/helpers';
import { IAuth } from '../../shared/models/auth.model';
import { login, verify, logout } from './auth.api';

interface IAuthenticationState {
  loginSuccess: boolean;
  loading: boolean;
  user: IAuth | null;
  token: string | null;
  errorMessage: string | null;
}

const initialState: IAuthenticationState = {
  loginSuccess: false,
  loading: false,
  user: null,
  token: null,
  errorMessage: null,
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
      state.user = null;
      state.token = null;
      state.errorMessage = null;
    },
  },
  extraReducers: {
    [login.fulfilled.type]: (state, { payload }: PayloadAction<{ id_token: string }>) => {
      localStorage.setItem('authentication_token', payload.id_token);
      state.token = payload.id_token;
      state.errorMessage = null;
    },
    [login.rejected.type]: (state, { payload }: PayloadAction<{ message: string }>) => {
      state.errorMessage = payload?.message;
      state.loginSuccess = false;
      state.loading = false;
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
export const { fetching, reset } = authenticationSlice.actions;
