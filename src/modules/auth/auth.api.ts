import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axios-interceptor';
import { hndleVerifyResp, setCookie } from '../../shared/helpers';
import { IAuth } from '../../shared/models/auth.model';

export interface IAuthenticateBody {
  email: string;
  password: string;
}

const prefix = 'users';

export const login = createAsyncThunk('login', async (body: IAuthenticateBody, thunkAPI) => {
  try {
    const result = await axios.post(`${prefix}/login`, body);
    setCookie('jwt', result.data.token, 7);
    return result.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const verify = createAsyncThunk('verify', async (_, thunkAPI) => {
  try {
    const result = await axios.get(`${prefix}/verify`);
    const entity = hndleVerifyResp<IAuth>(result);
    return entity;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const logout = createAsyncThunk('logout', async (_, thunkAPI) => {
  try {
    await axios.get(`${prefix}/logout`);
    return;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
