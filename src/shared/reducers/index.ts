import { combineReducers } from '@reduxjs/toolkit';
import container from '../../containers/reducer';
import authentication from '../../modules/auth/auth.reducer';

const rootReducer = combineReducers({
  container,
  authentication,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
