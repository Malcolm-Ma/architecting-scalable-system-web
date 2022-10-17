/**
 * @file App
 * @author Mingze Ma
 */

import React, { useState } from "react";
import Layout from "src/layout";
import ELearnThemeProvider from "./theme";
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from 'src/config/keycloak';
import LoadingSpinner from "./components/LoadingSpinner";
import actions from "./actions";

const keycloakProviderInitConfig = {
  onLoad: "check-sso"
};
const keycloakEvent = {
  ON_AUTH_SUCCESS: "onAuthSuccess",
  ON_INIT_ERROR: "onInitError"
}

const App: React.FC = () => {
  const [loadingTag, setLoadingTag] = useState(true);

  const onKeycloakEvent = (event: String, error: any) => {
    console.log("KcEventName: " + event, "Error: " + error);
    // If init failed, continue to load UI components
    if (event == keycloakEvent.ON_INIT_ERROR) {
      setLoadingTag(false);
    }
    //On auth success
    else if (event == keycloakEvent.ON_AUTH_SUCCESS) {
      console.log(keycloak.tokenParsed);
      const reqBody = {
        user_username: keycloak.tokenParsed!.preferred_username,
        user_email: keycloak.tokenParsed!.email,
        user_age: keycloak.tokenParsed!.age,
        user_contact: keycloak.tokenParsed!.contact,
        user_firstname: keycloak.tokenParsed!.given_name,
        user_lastname: keycloak.tokenParsed!.family_name,
        user_email_verified: keycloak.tokenParsed!.email_verified,
        keycloak_id: keycloak.tokenParsed!.sub,
        user_enabled: true
      };
      actions.createNewUser(reqBody).catch((error) => {
        console.log(error.response.data);
      });
    }
    
  }

  const loadingProps = loadingTag ? {
    LoadingComponent: <LoadingSpinner />
  } : {}

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={keycloakProviderInitConfig}
      onEvent={onKeycloakEvent}
      {...loadingProps}
    >

      <ELearnThemeProvider>
        <Layout />
      </ELearnThemeProvider>

    </ReactKeycloakProvider>

  );
};

export default App;
