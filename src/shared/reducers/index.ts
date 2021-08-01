import { combineReducers } from "@reduxjs/toolkit";
import container from "../../containers/reducer";
import authentication from "../../views/auth/auth.reducer";
// import { RootState } from '../../store';

const rootReducer = combineReducers({ container, authentication });
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
