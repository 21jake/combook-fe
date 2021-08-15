import { createSlice, PayloadAction, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { IGetEntitiesResp, IInitialState } from '../../shared/enum/shared-interfaces';
import { IClass } from '../../shared/models/class.model';
import { RootState } from '../../shared/reducers';
import { getEntities, updateEntity, removeEntity, getEntity, createEntity } from './class.api';

const initialState: IInitialState = {
  fetchEntitiesSuccess: false,
  fetchEntitySuccess: false,
  updateEntitySuccess: false,
  deleteEntitySuccess: false,
  loading: false,
  errorMessage: null,
  totalItems: 0,
};


export const classAdapter = createEntityAdapter<IClass>({
  selectId: ({ id }) => id,
});

const { actions, reducer } = createSlice({
  name: 'classSlice',
  initialState: classAdapter.getInitialState({ initialState }),
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
    setAll: classAdapter.setAll,
    updateOne: classAdapter.updateOne,
    addOne: classAdapter.addOne,
    removeOne: classAdapter.removeOne,
  },
  extraReducers: {
    [getEntities.fulfilled.type]: (state, { payload }: PayloadAction<IGetEntitiesResp<IClass>>) => {
      state.initialState.totalItems = payload.total;
      // console.log(payload);
      state.initialState.fetchEntitiesSuccess = true;
      state.initialState.loading = false;
    },
    [getEntities.rejected.type]: (state, { payload }: PayloadAction<any>) => {
      state.initialState.errorMessage = payload?.message;
      state.initialState.loading = false;
      state.initialState.fetchEntitiesSuccess = false;
    },
    [getEntity.fulfilled.type]: (state, { payload }: PayloadAction<IClass[]>) => {
      state.initialState.fetchEntitySuccess = true;
      state.initialState.loading = false;
    },
    [getEntity.rejected.type]: (state, { payload }: PayloadAction<any>) => {
      state.initialState.errorMessage = payload?.message;
      state.initialState.loading = false;
      state.initialState.fetchEntitySuccess = false;
    },
    [updateEntity.fulfilled.type]: (state, { payload }: PayloadAction<IClass>) => {
      state.initialState.updateEntitySuccess = true;
      state.initialState.loading = false;
    },
    [updateEntity.rejected.type]: (state, { payload }: PayloadAction<any>) => {
      state.initialState.errorMessage = payload?.message;
      state.initialState.loading = false;
      state.initialState.updateEntitySuccess = false;
    },
    [createEntity.fulfilled.type]: (state, { payload }: PayloadAction<IClass>) => {
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

export const classSelectors = classAdapter.getSelectors<RootState>((state) => state.class);

const { selectById } = classAdapter.getSelectors();
const getClassState = (rootState: RootState) => rootState.class;

export const selectEntityById = (id: string) => {
  return createSelector(getClassState, (state) => selectById(state, id));
};


