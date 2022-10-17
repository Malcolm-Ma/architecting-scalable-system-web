/**
 * @file API tools
 * @author Mingze Ma
 */

import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import keycloak from "src/config/keycloak";

const SERVICE_BASE_URL = 'http://localhost:8090';

export class Request {
  private readonly axiosInstance: AxiosInstance;

  public constructor() {
    this.axiosInstance = axios.create({
      baseURL: SERVICE_BASE_URL,
    });

    this.axiosInstance.interceptors.request.use((config) => {
      config.headers!.Authorization = (keycloak.authenticated ? `Bearer ${keycloak.token}` : "");
      return config;
    });

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.response === undefined) {
          throw error;
        }
        if (error.response.status === 401) {
          try {
            // Try to refresh the access token
            const result = await keycloak.updateToken(5);
            // Was refreshing the access token successfull?
            if (result === true) {
              // Repeat the request
              return await axios({ ...error.config });
            } else {
              // If the access token could not be refreshed we reject the promise 
              // and the code responsible for the request has to handle it.
              throw new Error("Unauthorized");
            }
          } catch (error) {
            keycloak.logout();
            throw error;
          }
        }
        // No special treatment of any other error
        throw error;
      }
    );
  }

  public get(url: string, data: any, options?: AxiosRequestConfig<any> | undefined) {
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
