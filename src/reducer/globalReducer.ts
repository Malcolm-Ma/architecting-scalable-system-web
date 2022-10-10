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
    }
  },
});

export const {setLoginStatus} = userSlice.actions;

export default userSlice.reducer;
