/**
 * @file keycloak config
 * @author Mingze Ma
 */

import {KeycloakConfig} from "keycloak-js";

const keyCloakConfig: KeycloakConfig = {
  realm: 'demo',
  url: 'https://authsvc-acs.com/',
  clientId: 'DEMO_CLIENT',
  // 'ssl-required': 'external',
  // resource: 'DEMO_CLIENT',
  // 'public-client': true,
  // 'verify-token-audience': true,
  // 'use-resource-role-mappings': true,
  // 'confidential-port': 0
};

export default keyCloakConfig;
