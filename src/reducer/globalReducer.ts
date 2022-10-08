/**
 * @file user reducer
 * @author Mingze Ma
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userinfo: {},
};

const userSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
