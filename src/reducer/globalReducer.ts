/**
 * @file user reducer
 * @author Mingze Ma
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  init: false,
  loggedIn: false,
  token: '',
  userinfo: {},
};

const userSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setInit(state, action) {
      state.init = action.payload.init;
    },
    setLoginStatus(state, action) {
      state.loggedIn = action.payload.status;
    },
    setToken(state, action) {
      const { token } = action.payload;
      state.token = token || '';
    }
  },
});

export const {
  setLoginStatus,
  setToken,
  setInit,
} = userSlice.actions;

export default userSlice.reducer;
