import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axios-interceptor';
import { IParams } from '../../shared/enum/shared-interfaces';
import { hndleGetManyResp, hndleGetOneResp } from '../../shared/helpers';
import { IResult } from '../../shared/models/result.model';
import { setAll, updateOne } from './result.reducer';
import { semesterSetAll } from '../semester/semester.reducer';

const prefix = 'results';

export const getEntities = createAsyncThunk(
  `get-all-${prefix}`,
  async (params: IParams, thunkAPI) => {
    try {
      const result = hndleGetManyResp<IResult>(await axios.get(`${prefix}`, { params }));

      thunkAPI.dispatch(setAll(result.entities));
      thunkAPI.dispatch(semesterSetAll(result.entities.map((e) => e.semester)));

      return result;
    } catch (error) {
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
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateEntity = createAsyncThunk(
  `update-one-${prefix}`,
  async (body: IResult, thunkAPI) => {
    try {
      const { _id } = body;
      const result = await axios.patch(`${prefix}/${_id}`, body);
      const entity = hndleGetOneResp<IResult>(result);
      thunkAPI.dispatch(updateOne({ id: _id, changes: entity }));
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
