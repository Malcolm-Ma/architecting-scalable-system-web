/**
 * @file keycloak actions
 * @author Yuzhe Huang
 */

import {keycloakApi} from 'src/api';
import apiConfig from "src/api/apiConfig";

export const searchCommodity = (params: any) => keycloakApi.post(apiConfig.keycloak.assignRole, params);