import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios-interceptor";

export interface IAuthenticateBody {
  username: string;
  password: string;
}

export interface IRegisterBody {
  firstName: string;
  lastName: string;
  email: string;
  login: string;
  address: string;
  password: string;
}

export const login = createAsyncThunk("login", async (body: IAuthenticateBody, thunkAPI) => {
  try {
    const result = await axios.post(`authenticate`, body);
    return result.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const register = createAsyncThunk("register", async (body: IRegisterBody, thunkAPI) => {
  try {
    const result = await axios.post(`register`, body);
    return result.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const authenticate = createAsyncThunk("verify", async (_, thunkAPI) => {
  try {
    const result = await axios.get(`account`);
    return result.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
