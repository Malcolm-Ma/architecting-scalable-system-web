/**
 * @file App
 * @author Mingze Ma
 */

import React from "react";
import Layout from "src/layout";
import ELearnThemeProvider from "./theme";
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from 'src/config/keycloak';

const keycloakProviderInitConfig = {
  onLoad: "check-sso"
};

const App: React.FC = () => {
  const onKeycloakEvent = (event: any, error: any) => {
    console.log(typeof(event));
    console.log('onKeycloakEvent', event, error)
  }

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={keycloakProviderInitConfig}
      onEvent={onKeycloakEvent}>
      <ELearnThemeProvider>
        <Layout />
      </ELearnThemeProvider>
    </ReactKeycloakProvider>
    
  );
};

export default App;
