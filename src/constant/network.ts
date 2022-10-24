/**
 * @file network constants
 * @author Mingze Ma
 */

export const SERVICE_BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8090/api' : 'https://elearnteam3.com/api';

export const KEYCLOAK_BASE_URL = 'https://authsvc-acs.com';
