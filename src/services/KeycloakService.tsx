import Keycloak from "keycloak-js";
import keyCloakConfig from "../config/keycloak";

const _kc = new Keycloak(keyCloakConfig);

const initKeycloak = (onAuthenticatedCallback: any) => {
  _kc.init({
    onLoad: 'check-sso'
  })
    .then((authenticated: boolean) => {
      if (authenticated) {
        onAuthenticatedCallback();
      } else {
        onAuthenticatedCallback();
        console.warn('not authenticated !!!');
      }
    })
    .catch((reason: any) => {
      onAuthenticatedCallback();
      console.error(reason);
    })
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback: any) =>
  _kc.updateToken(5)
    .then(successCallback)
    .catch(doLogin);

const getUsername = () => _kc.tokenParsed?.preferred_username;

const hasRole = (roles: string[]) => roles.some((role: string) => _kc.hasRealmRole(role));

const getKcInstance = () => _kc;

const KeycloakService = {
  initKeycloak,
  doLogin,
  doLogout,
  getToken,
  isLoggedIn,
  updateToken,
  getUsername,
  hasRole,
  getKcInstance
}

export default KeycloakService;
