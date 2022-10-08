/**
 * @file store
 * @author Mingze Ma
 */

import { configureStore } from '@reduxjs/toolkit';
import globalReducer from "./globalReducer";

const store = configureStore({
  reducer: {
    global: globalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
