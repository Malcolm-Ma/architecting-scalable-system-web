import axiox from 'axios';
import KeycloakService from './KeycloakService';

const HttpMethods = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT'
}

const _axios = axiox.create();

const configure = () => {
  _axios.interceptors.request.use((config) => {
    if(KeycloakService.isLoggedIn()) {
      const callback = () => {
        config.headers!.Authorization = `Bearer ${KeycloakService.getToken()}`;
        return Promise.resolve(config); 
      };
      return KeycloakService.updateToken(callback);
    }
  });
};

const getAxiosClient = () => _axios

const IntercepterService = {
  HttpMethods,
  configure,
  getAxiosClient
};

export default IntercepterService;