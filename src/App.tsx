/**
 * @file App
 * @author Mingze Ma
 */

import React from "react";
import Layout from "src/layout";
// import useAuthService from "./hooks/useAuthService";
// import {setLoginStatus, setToken} from "src/reducer/globalReducer";
// import {useDispatch} from "react-redux";
import ELearnThemeProvider from "./theme";
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from 'src/config/keycloak';

const keycloakProviderInitConfig = {
  onLoad: "check-sso"
};

const App: React.FC = () => {
  // const authService = useAuthService();

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   authService.initKeycloak({
  //     onSuccess(token) {
  //       dispatch(setLoginStatus(true));
  //       dispatch(setToken(token));
  //     },
  //     onRejected() {
  //       dispatch(setLoginStatus(false));
  //     },
  //     onError() {
  //       dispatch(setLoginStatus(false));
  //     }
  //   });
  // }, [authService, dispatch]);

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={keycloakProviderInitConfig}>
      <ELearnThemeProvider>
        <Layout />
      </ELearnThemeProvider>
    </ReactKeycloakProvider>
    
  );
};

export default App;
