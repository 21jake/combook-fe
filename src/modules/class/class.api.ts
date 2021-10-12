import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axios-interceptor';
import { IParams } from '../../shared/enum/shared-interfaces';
import { hndleGetManyResp, hndleGetOneResp } from '../../shared/helpers';
import { IClass, INewClass } from '../../shared/models/class.model';
import { setAll, updateOne, addOne, removeOne } from './class.reducer';
// import { IBrandFilterState } from './CarBrands';

const prefix = 'classes';

export const getEntities = createAsyncThunk(`get-many-${prefix}`, async (params: IParams, thunkAPI) => {
  try {
    const result = hndleGetManyResp<IClass>(await axios.get(`${prefix}`, { params }));
    thunkAPI.dispatch(setAll(result.entities));
    return result;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getEntity = createAsyncThunk(`get-one-${prefix}`, async (id: string, thunkAPI) => {
  try {
    const result = await axios.get(`${prefix}/${id}`);
    const entity = hndleGetOneResp<IClass>(result);

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
  async (body: IClass | INewClass, thunkAPI) => {
    try {
      const { id } = body;
      const result = await axios.patch(`${prefix}/${id}`, body);
      const entity = hndleGetOneResp<IClass>(result);

      if (id) {
        thunkAPI.dispatch(updateOne({ id, changes: entity }));
      }

      return result.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createEntity = createAsyncThunk(`create-one-${prefix}`, async (body: INewClass, thunkAPI) => {
  try {
    const result = await axios.post(`${prefix}`, body);
    const entity = hndleGetOneResp<IClass>(result);
    thunkAPI.dispatch(addOne(entity));
    return entity;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
