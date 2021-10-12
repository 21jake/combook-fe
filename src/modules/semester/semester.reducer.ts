import { createSlice, PayloadAction, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { uniqBy } from 'lodash';
import { IGetEntitiesResp, IInitialState } from '../../shared/enum/shared-interfaces';
import { ISemester } from '../../shared/models/semester.model';
import { RootState } from '../../shared/reducers';
import { getEntities, updateEntity, removeEntity, getEntity, createEntity } from './semester.api';

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

export const semesterAdapter = createEntityAdapter<ISemester>({
  selectId: ({ _id }) => _id,
});

const { actions, reducer } = createSlice({
  name: 'semesterSlice',
  initialState: semesterAdapter.getInitialState({ initialState }),
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
    setAll: semesterAdapter.setAll,
    updateOne: semesterAdapter.updateOne,
    addOne: semesterAdapter.addOne,
    removeOne: semesterAdapter.removeOne,
  },
  extraReducers: {
    [getEntities.fulfilled.type]: (
      state,
      { payload }: PayloadAction<IGetEntitiesResp<ISemester>>
    ) => {
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
    [getEntity.fulfilled.type]: (state, { payload }: PayloadAction<ISemester[]>) => {
      state.initialState.fetchEntitySuccess = true;
      state.initialState.loading = false;
    },
    [getEntity.rejected.type]: (state, { payload }: PayloadAction<any>) => {
      state.initialState.errorMessage = payload?.message;
      state.initialState.loading = false;
      state.initialState.fetchEntitySuccess = false;
    },
    [updateEntity.fulfilled.type]: (state, { payload }: PayloadAction<ISemester>) => {
      state.initialState.updateEntitySuccess = true;
      state.initialState.loading = false;
    },
    [updateEntity.rejected.type]: (state, { payload }: PayloadAction<any>) => {
      state.initialState.errorMessage = payload?.message;
      state.initialState.loading = false;
      state.initialState.updateEntitySuccess = false;
    },
    [createEntity.fulfilled.type]: (state, { payload }: PayloadAction<ISemester>) => {
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
  setAll: semesterSetAll,
  updateOne: semesterUpdateOne,
  addOne: semesterAddOne,
  removeOne: semesterRemoveOne,
} = actions;

export const semesterSelectors = semesterAdapter.getSelectors<RootState>((state) => state.semester);

const { selectById, selectAll } = semesterAdapter.getSelectors();
const getSemesterState = (rootState: RootState) => rootState.semester;

export const selectEntityById = (_id: string) => {
  return createSelector(getSemesterState, (state) => selectById(state, _id));
};

export const selectGrades = () => {
  return createSelector(getSemesterState, (state) =>
    uniqBy(
      selectAll(state).map((e) => e.grade),
      'id'
    )
  );
};
