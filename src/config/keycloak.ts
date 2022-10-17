/**
 * @file keycloak config
 * @author Mingze Ma
 */

import {KeycloakConfig} from "keycloak-js";
import Keycloak from 'keycloak-js';
import * as keycloakConstant from 'src/constant/keycloakConfig'

const keycloakConfig: KeycloakConfig = {
  realm: keycloakConstant.KC_REALM_NAME,
  url: keycloakConstant.KC_URL,
  clientId: keycloakConstant.KC_CLIENT_ID
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
