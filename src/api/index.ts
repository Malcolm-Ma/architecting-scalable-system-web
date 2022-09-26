/**
 * @file API tools
 * @author Mingze Ma
 */

import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

const SERVICE_BASE_URL = '';

export class Request {
  private readonly axiosInstance: AxiosInstance;

  public constructor() {
    this.axiosInstance = axios.create({
      baseURL: SERVICE_BASE_URL,
    })
  }

  public get(url: string, data: any, options: AxiosRequestConfig<any> | undefined) {
    return this.axiosInstance(url, {
      method: 'get',
      params: data,
      ...options,
    });
  }

  public post(url: string, data: any, options: AxiosRequestConfig<any> | undefined) {
    return this.axiosInstance(url, {
      method: 'post',
      data,
      ...options,
    });
  }
}

export default new Request();
