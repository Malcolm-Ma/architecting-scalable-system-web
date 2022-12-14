/**
 * @file API tools
 * @author Mingze Ma
 */

import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from "axios";
import keycloak from "src/config/keycloak";
import {message} from "antd";
import {SERVICE_BASE_URL, KEYCLOAK_BASE_URL, SERVICE_SEARCH_URL} from "src/constant/network";

export class Request {
  private readonly axiosInstance: AxiosInstance;

  public constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
    });

    // Add request interceptors to add Authorization token
    this.axiosInstance.interceptors.request.use((config) => {
      config.headers!.Authorization = (keycloak.authenticated ? `Bearer ${keycloak.token}` : "");
      return config;
    });
    // Intercepter handling error response
    this.axiosInstance.interceptors.response.use(
      (response) => {
        // valid response
        console.log(response);
        if (response.status === 200 || response.status === 204) {
          // Check if the response comes from keycloak,
          // because keycloak response is different,don't contain status attribute
          if(!response.data.status) {
            return response.data;
          }
          const {code, message: resMessage, data} = response.data;
          // error in business
          if (code >= 400) {
            const error = new Error(resMessage);
            return Promise.reject(error);
          }
          // success business res
          return data;
        }
        // Invalid response
        console.error('Fall to request: ' + response);
      },
      async (error: any) => {
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
              return await axios({...error.config});
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
        // Handle Error from BE
        const data: any = error.response?.data;
        if (data && data.message !== "User doesn't exist.") {
          console.log(data);
          const {status, message: errMessage, error: err, path} = data;
          console.error(`${status} ${err}: ${errMessage}, on path:${path}`);
        } else {
          if (error.name === AxiosError.ERR_NETWORK) {
            message.error(error.message + ', please check the network');
          }
          // No special treatment of any other error
          console.error(error.response.data);
        }
        console.log(error.response.data);
        return Promise.reject(error.response.data);
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

export default new Request(SERVICE_BASE_URL);

export const keycloakApi = new Request(KEYCLOAK_BASE_URL);

export const searchApi = new Request(SERVICE_SEARCH_URL);
