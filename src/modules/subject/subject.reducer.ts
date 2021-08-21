import { createSlice, PayloadAction, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { IGetEntitiesResp, IInitialState } from '../../shared/enum/shared-interfaces';
import { ISubject } from '../../shared/models/subject.model';
import { RootState } from '../../shared/reducers';
import { getEntities, updateEntity, removeEntity, getEntity, createEntity } from './subject.api';

const initialState: IInitialState = {
  fetchEntitiesSuccess: false,
  fetchEntitySuccess: false,
  updateEntitySuccess: false,
  deleteEntitySuccess: false,
  loading: false,
  errorMessage: null,
  totalItems: 0,
};

export const subjectAdapter = createEntityAdapter<ISubject>({
  selectId: ({ _id }) => _id,
});

const { actions, reducer } = createSlice({
  name: 'subjectSlice',
  initialState: subjectAdapter.getInitialState({ initialState }),
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
    setAll: subjectAdapter.setAll,
    updateOne: subjectAdapter.updateOne,
    addOne: subjectAdapter.addOne,
    removeOne: subjectAdapter.removeOne,
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
    [createEntity.fulfilled.type]: (state, { payload }: PayloadAction<ISubject>) => {
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

export const subjectSelectors = subjectAdapter.getSelectors<RootState>((state) => state.subject);

const { selectById } = subjectAdapter.getSelectors();
const getSubjectState = (rootState: RootState) => rootState.subject;

export const selectEntityById = (_id: string) => {
  return createSelector(getSubjectState, (state) => selectById(state, _id));
};

// export const selectActiveEntities = () => {
//   return createSelector(getSubjectState, (state) =>
//     selectAll(state).filter((entity) => entity.status === SharedStatus.ENABLE)
//   );
// };
