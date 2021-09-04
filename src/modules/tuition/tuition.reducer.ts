import { createSlice, PayloadAction, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { IGetEntitiesResp, IInitialState } from '../../shared/enum/shared-interfaces';
import { ITuition } from '../../shared/models/tuition.model';
import { RootState } from '../../shared/reducers';
import { getEntities, updateEntity, removeEntity, getEntity, createEntity } from './tuition.api';

const initialState: IInitialState = {
  fetchEntitiesSuccess: false,
  fetchEntitySuccess: false,
  updateEntitySuccess: false,
  deleteEntitySuccess: false,
  loading: false,
  errorMessage: null,
  totalItems: 0,
};

// export type ICarInfo = Readonly<typeof initialState>;

export const tuitionAdapter = createEntityAdapter<ITuition>({
  selectId: ({ id }) => id,
});

const { actions, reducer } = createSlice({
  name: 'tuitionSlice',
  initialState: tuitionAdapter.getInitialState({ initialState }),
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
    setAll: tuitionAdapter.setAll,
    updateOne: tuitionAdapter.updateOne,
    addOne: tuitionAdapter.addOne,
    removeOne: tuitionAdapter.removeOne,
  },
  extraReducers: {
    [getEntities.fulfilled.type]: (state, { payload }: PayloadAction<IGetEntitiesResp<ITuition>>) => {
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
    [getEntity.fulfilled.type]: (state, { payload }: PayloadAction<ITuition[]>) => {
      state.initialState.fetchEntitySuccess = true;
      state.initialState.loading = false;
    },
    [getEntity.rejected.type]: (state, { payload }: PayloadAction<any>) => {
      state.initialState.errorMessage = payload?.message;
      state.initialState.loading = false;
      state.initialState.fetchEntitySuccess = false;
    },
    [updateEntity.fulfilled.type]: (state, { payload }: PayloadAction<ITuition>) => {
      state.initialState.updateEntitySuccess = true;
      state.initialState.loading = false;
    },
    [updateEntity.rejected.type]: (state, { payload }: PayloadAction<any>) => {
      state.initialState.errorMessage = payload?.message;
      state.initialState.loading = false;
      state.initialState.updateEntitySuccess = false;
    },
    [createEntity.fulfilled.type]: (state, { payload }: PayloadAction<ITuition>) => {
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
  setAll: tuitionSetAll,
  updateOne: tuitionUpdateOne,
  addOne: tuitionAddOne,
  removeOne: tuitionRemoveOne,
} = actions;

export const tuitionSelectors = tuitionAdapter.getSelectors<RootState>((state) => state.tuition);

const { selectById } = tuitionAdapter.getSelectors();
const getTuitionState = (rootState: RootState) => rootState.tuition;

export const selectEntityById = (_id: string) => {
  return createSelector(getTuitionState, (state) => selectById(state, _id));
};

// export const selectActiveEntities = () => {
//   return createSelector(getGradeState, (state) =>
//     selectAll(state).filter((entity) => entity.status === SharedStatus.ENABLE)
//   );
// };
