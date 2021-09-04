import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axios-interceptor';
import { IParams } from '../../shared/enum/shared-interfaces';
import { hndleGetManyResp, hndleGetOneResp } from '../../shared/helpers';
import { ITuition, INewTuition } from '../../shared/models/tuition.model';
import { tuitionSetAll, tuitionUpdateOne, tuitionAddOne, tuitionRemoveOne } from './tuition.reducer';


const prefix = 'tuitions';

export const getEntities = createAsyncThunk('get-tuitions', async (params: IParams, thunkAPI) => {
  try {
    const result = hndleGetManyResp<ITuition>(await axios.get(`${prefix}`, { params }));
    thunkAPI.dispatch(tuitionSetAll(result.entities));
    return result;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getEntity = createAsyncThunk('get-tuition', async (id: string, thunkAPI) => {
  try {
    const result = await axios.get(`${prefix}/${id}`);
    const entity = hndleGetOneResp<ITuition>(result);

    const resultArray = [entity]; // Have to put in an array so the Adapter can handle
    thunkAPI.dispatch(tuitionSetAll(resultArray));
    return result.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const removeEntity = createAsyncThunk('delete-tuition', async (_id: string, thunkAPI) => {
  try {
    await axios.delete(`${prefix}/${_id}`);
    thunkAPI.dispatch(tuitionRemoveOne(_id));
    return _id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateEntity = createAsyncThunk(
  'update-tuition',
  async (body: ITuition | INewTuition, thunkAPI) => {
    try {
      const { id } = body;
      const result = await axios.patch(`${prefix}/${id}`, body);
      const entity = hndleGetOneResp<ITuition>(result);

      if (id) {
        thunkAPI.dispatch(tuitionUpdateOne({ id: id, changes: entity }));
      }
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createEntity = createAsyncThunk('create-tuition', async (body: INewTuition, thunkAPI) => {
  try {
    const result = await axios.post(`${prefix}`, body);
    const entity = hndleGetOneResp<ITuition>(result);
    thunkAPI.dispatch(tuitionAddOne(entity));
    return entity;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
