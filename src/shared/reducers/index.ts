import { combineReducers } from '@reduxjs/toolkit';
import container from '../../containers/reducer';
import authentication from '../../modules/auth/auth.reducer';
import grade from '../../modules/grade/grade.reducer';
import subject from '../../modules/subject/subject.reducer';
import user from '../../modules/user/user.reducer';
import classReducer from '../../modules/class/class.reducer';
import semester from '../../modules/semester/semester.reducer'
import tuition from '../../modules/tuition/tuition.reducer'
import result from '../../modules/result/result.reducer'

const rootReducer = combineReducers({
  container,
  authentication,
  grade,
  subject,
  class: classReducer,
  user,
  semester,
  result,
  tuition,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
