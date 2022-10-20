/**
 * @file API tools
 * @author Mingze Ma
 */

import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from "axios";
import keycloak from "src/config/keycloak";
import {message} from "antd";
import {SERVICE_BASE_URL} from "src/constant/network";

export class Request {
  private readonly axiosInstance: AxiosInstance;

  public constructor() {
    this.axiosInstance = axios.create({
      baseURL: SERVICE_BASE_URL,
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
        if (response.status === 200) {
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
        console.error('Fall to request：' + response);
      },
      async (error: AxiosError) => {
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
        if (data && data.message != "User doesn't exist.") {
          console.log(data);
          const {status, message: errMessage, error: err, path} = data;
          console.error(`${status} ${err}: ${errMessage}, on path:${path}`);
          message.error(`${status}-${err}: ${errMessage}, on path:${path}`);
        } else {
          if (error.name == AxiosError.ERR_NETWORK) {
            message.error(error.message + ', please check the network');
            return;
          }
          // No special treatment of any other error
          console.error(error.message);
          throw error;
        }
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
