import { createAsyncThunk } from '@reduxjs/toolkit';
import { pickBy } from 'lodash';
import axios from '../../config/axios-interceptor';
import { hndleGetManyResp, hndleGetOneResp } from '../../shared/helpers';
import { IResult } from '../../shared/models/result.model';
import { setAll, updateOne } from './result.reducer';
import { IResultParams } from './ResultModal';

const prefix = 'results';

export const getEntities = createAsyncThunk(
  `get-all-${prefix}`,
  async (fields: IResultParams, thunkAPI) => {
    try {
      const params = pickBy(fields);
      const result = hndleGetManyResp<IResult>(await axios.get(`${prefix}`, { params }));
      thunkAPI.dispatch(setAll(result.entities));

      return result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getEntity = createAsyncThunk(`get-one-${prefix}`, async (id: string, thunkAPI) => {
  try {
    const result = await axios.get(`${prefix}/${id}`);
    const entity = hndleGetOneResp<IResult>(result);

    const resultArray = [entity]; // Have to put in an array so the Adapter can handle
    thunkAPI.dispatch(setAll(resultArray));
    return result.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

interface IUpdateResultParams extends Omit<IResult, "student" | "semester" | "subject"> {};

export const updateEntity = createAsyncThunk(
  `update-one-${prefix}`,
  async (body: IUpdateResultParams, thunkAPI) => {
    try {
      const { _id } = body;
      const result = await axios.patch(`${prefix}/${_id}`, body);
      const entity = hndleGetOneResp<IResult>(result);
      console.log(entity, 'entity');
      thunkAPI.dispatch(updateOne({ id: _id, changes: entity }));
      return result.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
