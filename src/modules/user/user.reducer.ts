import { createSlice, PayloadAction, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { IGetEntitiesResp, IInitialState } from '../../shared/enum/shared-interfaces';
import { IUser } from '../../shared/models/user.model';
import { RootState } from '../../shared/reducers';
import { getEntities, updateEntity, removeEntity, getEntity, createEntity } from './user.api';

const initialState: IInitialState = {
  fetchEntitiesSuccess: false,
  fetchEntitySuccess: false,
  updateEntitySuccess: false,
  deleteEntitySuccess: false,
  loading: false,
  errorMessage: null,
  totalItems: 0,
};


export const userAdapter = createEntityAdapter<IUser>({
  selectId: ({ id }) => id,
});

const { actions, reducer } = createSlice({
  name: 'userSlice',
  initialState: userAdapter.getInitialState({ initialState }),
  reducers: {
    fetching(state) {
      state.initialState.loading = true;
    },
    resetAll(state) {
      state.initialState.loading = false;
      state.initialState.fetchEntitiesSuccess = false;
      state.initialState.fetchEntitySuccess = false;
      state.initialState.updateEntitySuccess = false;
      state.initialState.deleteEntitySuccess = false;
      state.initialState.errorMessage = null;
    },
    resetEntity(state) {
      state.initialState.updateEntitySuccess = false;
      state.initialState.errorMessage = null;
      state.initialState.deleteEntitySuccess = false;
    },
    setAll: userAdapter.setAll,
    updateOne: userAdapter.updateOne,
    addOne: userAdapter.addOne,
    removeOne: userAdapter.removeOne,
  },
  extraReducers: {
    [getEntities.fulfilled.type]: (state, { payload }: PayloadAction<IGetEntitiesResp<IUser>>) => {
      state.initialState.totalItems = payload.total;
      state.initialState.fetchEntitiesSuccess = true;
      state.initialState.loading = false;
    },
    [getEntities.rejected.type]: (state, { payload }: PayloadAction<any>) => {
      state.initialState.errorMessage = payload?.message;
      state.initialState.loading = false;
      state.initialState.fetchEntitiesSuccess = false;
    },
    [getEntity.fulfilled.type]: (state, { payload }: PayloadAction<IUser[]>) => {
      state.initialState.fetchEntitySuccess = true;
      state.initialState.loading = false;
    },
    [getEntity.rejected.type]: (state, { payload }: PayloadAction<any>) => {
      state.initialState.errorMessage = payload?.message;
      state.initialState.loading = false;
      state.initialState.fetchEntitySuccess = false;
    },
    [updateEntity.fulfilled.type]: (state, { payload }: PayloadAction<IUser>) => {
      state.initialState.updateEntitySuccess = true;
      state.initialState.loading = false;
    },
    [updateEntity.rejected.type]: (state, { payload }: PayloadAction<any>) => {
      state.initialState.errorMessage = payload?.message;
      state.initialState.loading = false;
      state.initialState.updateEntitySuccess = false;
    },
    [createEntity.fulfilled.type]: (state, { payload }: PayloadAction<IUser>) => {
      state.initialState.updateEntitySuccess = true;
      state.initialState.loading = false;
    },
    [createEntity.rejected.type]: (state, { payload }: PayloadAction<any>) => {
      state.initialState.errorMessage = payload?.message;
      state.initialState.loading = false;
      state.initialState.updateEntitySuccess = false;
    },
    [removeEntity.fulfilled.type]: (state, { payload }: PayloadAction<{ id: string }>) => {
      state.initialState.deleteEntitySuccess = true;
      state.initialState.loading = false;
    },
    [removeEntity.rejected.type]: (state, { payload }: PayloadAction<any>) => {
      state.initialState.errorMessage = payload?.message;
      state.initialState.loading = false;
      state.initialState.deleteEntitySuccess = false;
    },
  },
});

export default reducer;
export const {
  fetching,
  resetAll,
  resetEntity,
  setAll,
  updateOne,
  addOne,
  removeOne,
} = actions;

export const userSelectors = userAdapter.getSelectors<RootState>((state) => state.user);

const { selectById } = userAdapter.getSelectors();
const getUserState = (rootState: RootState) => rootState.user;

export const selectEntityById = (id: string) => {
  return createSelector(getUserState, (state) => selectById(state, id));
};


