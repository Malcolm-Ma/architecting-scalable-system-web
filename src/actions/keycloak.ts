/**
 * @file keycloak actions
 * @author Yuzhe Huang
 */

import {keycloakApi} from 'src/api';
import apiConfig from "src/api/apiConfig";

export const assignMerchantRoleToUser = (userId: string, params: any) => 
  keycloakApi.post(
    apiConfig.keycloak.assignRole + userId + apiConfig.keycloak.roleMappingSuffix, 
    params
  );

export const getMerchantRole = () => keycloakApi.get(apiConfig.keycloak.getMerchantRole, null);