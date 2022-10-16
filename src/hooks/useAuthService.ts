/**
 * @file Auth Service hook
 * @author Mingze Ma
 */

import keycloak from "src/config/keycloak";

interface InitKeycloakProps {
  onSuccess: (token: string | undefined) => void,
  onRejected?: () => void | undefined,
  onError?: () => void | undefined,
}

export default function useAuthService() {
  const _kc = keycloak;

  const initKeycloak = ({onSuccess, onRejected, onError}: InitKeycloakProps) => {
    _kc.init({
      onLoad: 'check-sso',
      adapter: 'default'
    })
      .then((authenticated: boolean) => {
        if (authenticated) {
          onSuccess(getToken());
        } else {
          onRejected?.();
          console.warn('not authenticated !!!');
        }
      })
      .catch((reason: any) => {
        onError?.();
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

  return {
    initKeycloak,
    doLogin,
    doLogout,
    getToken,
    isLoggedIn,
    updateToken,
    getUsername,
    hasRole,
    getKcInstance
  };
};
