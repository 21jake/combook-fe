import { combineReducers } from '@reduxjs/toolkit';
import container from '../../containers/reducer';
import authentication from '../../modules/auth/auth.reducer';
import grade from '../../modules/grade/grade.reducer';

const rootReducer = combineReducers({
  container,
  authentication,
  grade,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
