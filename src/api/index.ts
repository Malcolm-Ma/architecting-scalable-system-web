/**
 * @file API tools
 * @author Mingze Ma
 */

import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import keycloak from "src/config/keycloak";

const SERVICE_BASE_URL = '';

const updateToken = (callback: any) =>
  keycloak.updateToken(5)
  .then(callback)
  .catch(keycloak.login);

export class Request {
  private readonly axiosInstance: AxiosInstance;

  public constructor() {
    this.axiosInstance = axios.create({
      baseURL: SERVICE_BASE_URL,
    });
    this.axiosInstance.interceptors.request.use((config) => {
      if(keycloak.authenticated) {
        const callback = () => {
          config.headers!.Authorization = (keycloak.token ? `Bearer ${keycloak.token}` : "");
          return Promise.resolve(config);
        };
        return updateToken(callback);
      }
    });
  }

  public get(url: string, data: any, options: AxiosRequestConfig<any> | undefined) {
    return this.axiosInstance(url, {
      method: 'get',
      params: data,
      ...options,
    });
  }

  public post(url: string, data: any, options?: AxiosRequestConfig<any> | undefined) {
    return this.axiosInstance(url, {
      method: 'post',
      data,
      ...options,
    });
  }
}

export default new Request();
