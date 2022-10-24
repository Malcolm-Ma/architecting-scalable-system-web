import api from "src/api";
import apiConfig from "src/api/apiConfig";
import {createAsyncThunk} from "@reduxjs/toolkit";
import _ from "lodash";

export interface getAndUpdateUserParams {
  requestParams: any,
  keycloakRes: any
}

export const createNewUser = (paramsBody: any) => api.post(apiConfig.user.create, paramsBody);

export const updateUser = (paramsBody: any) => api.post(apiConfig.user.update, paramsBody)

export const getAndUpdateUser = createAsyncThunk(
  'user/getUserInfo',
  async (params: getAndUpdateUserParams) => {
    const {requestParams, keycloakRes} = params;
    const role = (() => {
      const roleList = _.get(keycloakRes, 'resource_access.DEMO_CLIENT.roles');
      if (_.every(roleList, (i) => _.includes(['buyer', 'merchant'], i))) {
        return 'teacher';
      }
      if (_.includes(roleList, 'buyer')) {
        return 'buyer';
      }
      return 'none';
    })();
    const res = await api.post(apiConfig.user.getAndUpdate, requestParams);
    return {
      ...res,
      role,
    }

  },
);
