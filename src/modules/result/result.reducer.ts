import { createSlice, PayloadAction, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { IGetEntitiesResp, IInitialState } from '../../shared/enum/shared-interfaces';
import { IResult } from '../../shared/models/result.model';
import { ISubject } from '../../shared/models/subject.model';
import { RootState } from '../../shared/reducers';
import { getEntities, updateEntity, getEntity, } from './result.api';

const initialState: IInitialState = {
  fetchEntitiesSuccess: false,
  fetchEntitySuccess: false,
  updateEntitySuccess: false,
  deleteEntitySuccess: false,
  loading: false,
  errorMessage: null,
  totalItems: 0,
};

export const resultAdapter = createEntityAdapter<IResult>({
  selectId: ({ _id }) => _id,
});

const { actions, reducer } = createSlice({
  name: 'resultSlice',
  initialState: resultAdapter.getInitialState({ initialState }),
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
    setAll: resultAdapter.setAll,
    updateOne: resultAdapter.updateOne,
  },
  extraReducers: {
    [getEntities.fulfilled.type]: (state, { payload }: PayloadAction<IGetEntitiesResp<ISubject>>) => {
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
    [getEntity.fulfilled.type]: (state, { payload }: PayloadAction<ISubject[]>) => {
      state.initialState.fetchEntitySuccess = true;
      state.initialState.loading = false;
    },
    [getEntity.rejected.type]: (state, { payload }: PayloadAction<any>) => {
      state.initialState.errorMessage = payload?.message;
      state.initialState.loading = false;
      state.initialState.fetchEntitySuccess = false;
    },
    [updateEntity.fulfilled.type]: (state, { payload }: PayloadAction<ISubject>) => {
      state.initialState.updateEntitySuccess = true;
      state.initialState.loading = false;
    },
    [updateEntity.rejected.type]: (state, { payload }: PayloadAction<any>) => {
      state.initialState.errorMessage = payload?.message;
      state.initialState.loading = false;
      state.initialState.updateEntitySuccess = false;
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
} = actions;

export const resultSelectors = resultAdapter.getSelectors<RootState>((state) => state.result);

const { selectById } = resultAdapter.getSelectors();
const getResultState = (rootState: RootState) => rootState.result;

export const selectEntityById = (_id: string) => {
  return createSelector(getResultState, (state) => selectById(state, _id));
};

// export const selectActiveEntities = () => {
//   return createSelector(getSubjectState, (state) =>
//     selectAll(state).filter((entity) => entity.status === SharedStatus.ENABLE)
//   );
// };
