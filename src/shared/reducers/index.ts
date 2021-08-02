import { combineReducers } from '@reduxjs/toolkit';
import container from '../../containers/reducer';

const rootReducer = combineReducers({
    container
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
