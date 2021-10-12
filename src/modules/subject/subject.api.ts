import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axios-interceptor';
import { IParams } from '../../shared/enum/shared-interfaces';
import { hndleGetManyResp, hndleGetOneResp } from '../../shared/helpers';
import { INewSubject, ISubject } from '../../shared/models/subject.model';
import { setAll, updateOne, addOne, removeOne } from './subject.reducer';

const prefix = 'subjects';

export const getEntities = createAsyncThunk(`get-all-${prefix}`, async (params: IParams, thunkAPI) => {
  try {
    const result = hndleGetManyResp<ISubject>(await axios.get(`${prefix}`, { params }));
    thunkAPI.dispatch(setAll(result.entities));
    return result;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getEntity = createAsyncThunk(`get-one-${prefix}`, async (id: string, thunkAPI) => {
  try {
    const result = await axios.get(`${prefix}/${id}`);
    const entity = hndleGetOneResp<ISubject>(result);

    const resultArray = [entity]; // Have to put in an array so the Adapter can handle
    thunkAPI.dispatch(setAll(resultArray));
    return result.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const removeEntity = createAsyncThunk(`delete-one-${prefix}`, async (_id: string, thunkAPI) => {
  try {
    await axios.delete(`${prefix}/${_id}`);
    thunkAPI.dispatch(removeOne(_id));
    return _id;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateEntity = createAsyncThunk(
  `update-one-${prefix}`,
  async (body: ISubject | INewSubject, thunkAPI) => {
    try {
      const { _id } = body;
      const result = await axios.patch(`${prefix}/${_id}`, body);
      const entity = hndleGetOneResp<ISubject>(result);

      if (_id) {
        thunkAPI.dispatch(updateOne({ id: _id, changes: entity }));
      }
      return result.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createEntity = createAsyncThunk(`create-one-${prefix}`, async (body: INewSubject, thunkAPI) => {
  try {
    const result = await axios.post(`${prefix}`, body);
    const entity = hndleGetOneResp<ISubject>(result);
    thunkAPI.dispatch(addOne(entity));
    return entity;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
