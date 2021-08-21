import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axios-interceptor';
import { IParams } from '../../shared/enum/shared-interfaces';
import { hndleGetManyResp, hndleGetOneResp, hndleVerifyResp } from '../../shared/helpers';

import { INewUser, IUser } from '../../shared/models/user.model';

import { setAll, updateOne, addOne, removeOne } from './user.reducer';


const prefix = 'users';

export const getEntities = createAsyncThunk(`get-many-${prefix}`, async (params: IParams, thunkAPI) => {
  try {
    const result = hndleGetManyResp<IUser>(await axios.get(`${prefix}`, { params }));
    thunkAPI.dispatch(setAll(result.entities));
    return result;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getEntity = createAsyncThunk(`get-one-${prefix}`, async (id: string, thunkAPI) => {
  try {
    const result = await axios.get(`${prefix}/${id}`);
    const entity = hndleGetOneResp<IUser>(result);

    const resultArray = [entity]; // Have to put in an array so the Adapter can handle
    thunkAPI.dispatch(setAll(resultArray));
    return result.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const removeEntity = createAsyncThunk(`delete-one-${prefix}`, async (_id: string, thunkAPI) => {
  try {
    await axios.delete(`${prefix}/${_id}`);
    thunkAPI.dispatch(removeOne(_id));
    return _id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateEntity = createAsyncThunk(
  `update-one-${prefix}`,
  async (body: IUser | INewUser, thunkAPI) => {
    try {
      const { id } = body;
      const result = await axios.patch(`${prefix}/${id}`, body);
      const entity = hndleGetOneResp<IUser>(result);

      if (id) {
        thunkAPI.dispatch(updateOne({ id, changes: entity }));
      }

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createEntity = createAsyncThunk(`create-one-${prefix}`, async (body: INewUser, thunkAPI) => {
  try {
    const result = await axios.post(`${prefix}/sign-up`, body);
    const entity = hndleVerifyResp<IUser>(result);
    thunkAPI.dispatch(addOne(entity));
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
