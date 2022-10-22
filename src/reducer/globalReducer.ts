/**
 * @file user reducer
 * @author Mingze Ma
 */

import { createSlice } from '@reduxjs/toolkit';
import {getAndUpdateUser} from "src/actions/user";
import _ from "lodash";

const initialState = {
  init: false,
  loggedIn: false,
  token: '',
  userinfo: {},
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setInit(state, action) {
      state.init = action.payload.init;
    },
    setLoginStatus(state, action) {
      state.loggedIn = action.payload.status;
    },
    setUserInfo(state, action) {
      state.userinfo = action.payload;
    },
    setRole(state, action) {
      const role = (() => {
        const roleList = _.get(action.payload, 'resource_access.DEMO_CLIENT.roles');
        if (_.every(roleList, (i) => _.includes(['buyer', 'merchant'], i))) {
          return 'teacher';
        }
        if (_.includes(roleList, 'buyer')) {
          return 'buyer';
        }
        return 'none';
      })();
      state.userinfo = {
        ...state.userinfo,
        role,
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAndUpdateUser.pending, () => {
        return _.cloneDeep(initialState);
      })
      .addCase(getAndUpdateUser.fulfilled, (state, action) => {
        state.userinfo = action.payload;
        state.init = true;
        state.loggedIn = true;
      })
      .addCase(getAndUpdateUser.rejected, (state) => {
        state.userinfo = {};
        state.init = false;
        state.loggedIn = false;
      })
  }
});

export const {
  setLoginStatus,
  setInit,
  setUserInfo,
  setRole,
} = globalSlice.actions;

export default globalSlice.reducer;
