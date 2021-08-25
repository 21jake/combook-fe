import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axios-interceptor';
import { IParams } from '../../shared/enum/shared-interfaces';
import { hndleGetManyResp, hndleGetOneResp } from '../../shared/helpers';
import { ISemester, INewSemester } from '../../shared/models/semester.model';
import { semesterSetAll, semesterUpdateOne, semesterAddOne, semesterRemoveOne } from './semester.reducer';


const prefix = 'semesters';

export const getEntities = createAsyncThunk('get-semesters', async (params: IParams, thunkAPI) => {
  try {
    const result = hndleGetManyResp<ISemester>(await axios.get(`${prefix}`, { params }));
    thunkAPI.dispatch(semesterSetAll(result.entities));
    return result;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getEntity = createAsyncThunk('get-semester', async (id: string, thunkAPI) => {
  try {
    const result = await axios.get(`${prefix}/${id}`);
    const entity = hndleGetOneResp<ISemester>(result);

    const resultArray = [entity]; // Have to put in an array so the Adapter can handle
    thunkAPI.dispatch(semesterSetAll(resultArray));
    return result.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const removeEntity = createAsyncThunk('delete-semester', async (_id: string, thunkAPI) => {
  try {
    await axios.delete(`${prefix}/${_id}`);
    thunkAPI.dispatch(semesterRemoveOne(_id));
    return _id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateEntity = createAsyncThunk(
  'update-semester',
  async (body: ISemester | INewSemester, thunkAPI) => {
    try {
      const { _id } = body;
      const result = await axios.patch(`${prefix}/${_id}`, body);
      const entity = hndleGetOneResp<ISemester>(result);

      if (_id) {
        thunkAPI.dispatch(semesterUpdateOne({ id: _id, changes: entity }));
      }
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createEntity = createAsyncThunk('create-semester', async (body: INewSemester, thunkAPI) => {
  try {
    const result = await axios.post(`${prefix}`, body);
    const entity = hndleGetOneResp<ISemester>(result);
    thunkAPI.dispatch(semesterAddOne(entity));
    return entity;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
