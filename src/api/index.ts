/**
 * @file API tools
 * @author Mingze Ma
 */

import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import KeycloakService from "../services/KeycloakService";

const SERVICE_BASE_URL = '';

export class Request {
  private readonly axiosInstance: AxiosInstance;

  public constructor() {
    this.axiosInstance = axios.create({
      baseURL: SERVICE_BASE_URL,
    });
    this.axiosInstance.interceptors.request.use((config) => {
      if(KeycloakService.isLoggedIn()) {
        const callback = () => {
          config.headers!.Authorization = `Bearer ${KeycloakService.getToken()}`;
          return Promise.resolve(config);
        };
        return KeycloakService.updateToken(callback);
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
