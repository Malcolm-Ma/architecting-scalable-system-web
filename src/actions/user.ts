import api from "src/api";
import apiConfig from "src/api/apiConfig";

export const createNewUser = (paramsBody: any) => api.post(apiConfig.user.create, paramsBody);