/**
 * @file keycloak config
 * @author Mingze Ma
 */

import {KeycloakConfig} from "keycloak-js";
import Keycloak from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
  realm: 'demo',
  url: 'https://authsvc-acs.com/',
  clientId: 'DEMO_CLIENT'
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
