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
const keycloakEvent = {
  ON_AUTH_SUCCESS: "onAuthSuccess"
}

const App: React.FC = () => {
  const onKeycloakEvent = (event: String, error: any) => {
    console.log("KcEventName: " + event, "Error: " + error);
    if(event == keycloakEvent.ON_AUTH_SUCCESS) {
      console.log(keycloak.tokenParsed);
      
    }
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
