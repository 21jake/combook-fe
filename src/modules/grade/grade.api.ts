import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axios-interceptor';
import { IParams } from '../../shared/enum/shared-interfaces';
import { hndleGetManyResp, hndleGetOneResp } from '../../shared/helpers';
import { IGrade, INewGrade } from '../../shared/models/grade.model';
// import { IGrade, INewGrade } from '../../shared/models/grade.model';
import { gradeSetAll, gradeUpdateOne, gradeAddOne, gradeRemoveOne } from './grade.reducer';
// import { IBrandFilterState } from './CarBrands';

const prefix = 'grades';

export const getEntities = createAsyncThunk('get-grades', async (params: IParams, thunkAPI) => {
  try {
    const result = hndleGetManyResp<IGrade>(await axios.get(`${prefix}`, { params }));
    thunkAPI.dispatch(gradeSetAll(result.entities));
    return result;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getEntity = createAsyncThunk('get-grade', async (id: string, thunkAPI) => {
  try {
    const result = await axios.get(`${prefix}/${id}`);
    const entity = hndleGetOneResp<IGrade>(result);

    const resultArray = [entity]; // Have to put in an array so the Adapter can handle
    thunkAPI.dispatch(gradeSetAll(resultArray));
    return result.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const removeEntity = createAsyncThunk('delete-grade', async (_id: string, thunkAPI) => {
  try {
    await axios.delete(`${prefix}/${_id}`);
    thunkAPI.dispatch(gradeRemoveOne(_id));
    return _id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateEntity = createAsyncThunk(
  'update-grade',
  async (body: IGrade | INewGrade, thunkAPI) => {
    try {
      const { _id } = body;
      const result = await axios.patch(`${prefix}/${_id}`, body);
      const entity = hndleGetOneResp<IGrade>(result);

      if (_id) {
        thunkAPI.dispatch(gradeUpdateOne({ id: _id, changes: entity }));
      }
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createEntity = createAsyncThunk('create-grade', async (body: INewGrade, thunkAPI) => {
  try {
    const result = await axios.post(`${prefix}`, body);
    const entity = hndleGetOneResp<IGrade>(result);
    thunkAPI.dispatch(gradeAddOne(entity));
    return entity;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
