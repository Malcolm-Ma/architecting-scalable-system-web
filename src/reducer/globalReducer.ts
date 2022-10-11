/**
 * @file user reducer
 * @author Mingze Ma
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  token: '',
  userinfo: {},
};

const userSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLoginStatus(state, action) {
      state.loggedIn = action.payload.status;
    },
    setToken(state, action) {
      const { token } = action.payload;
      state.token = token || '';
    }
  },
});

export const {setLoginStatus, setToken} = userSlice.actions;

export default userSlice.reducer;
