import { combineReducers } from '@reduxjs/toolkit';
import container from '../../containers/reducer';
import authentication from '../../modules/auth/auth.reducer';
import grade from '../../modules/grade/grade.reducer';
import subject from '../../modules/subject/subject.reducer';
import user from '../../modules/user/user.reducer';
import classReducer from '../../modules/class/class.reducer';

const rootReducer = combineReducers({
  container,
  authentication,
  grade,
  subject,
  class: classReducer,
  user
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
