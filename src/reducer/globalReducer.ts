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
  userInfo: {},
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setInit(state, action) {
      state.init = action.payload;
    },
    setLoginStatus(state, action) {
      state.loggedIn = action.payload.status;
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
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
      state.userInfo = {
        ...state.userInfo,
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
        state.userInfo = action.payload;
        state.userInfo['full_name'] = `${_.get(action.payload, 'user_firstname')} ${_.get(action.payload, 'user_lastname')}`
        state.loggedIn = true;
        state.init = true;
      })
      .addCase(getAndUpdateUser.rejected, (state) => {
        state.userInfo = {};
        state.loggedIn = false;
        state.init = true;
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
