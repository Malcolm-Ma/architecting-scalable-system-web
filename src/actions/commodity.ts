/**
 * @file commodity actions
 * @author Mingze Ma
 */
import api from "src/api";
import apiConfig from "src/api/apiConfig";

export const searchCommodity = (params: any) => api.post(apiConfig.commodity.search, params);