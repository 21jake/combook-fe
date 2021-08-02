import reducer from './shared/reducers';

import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})


export default store;
