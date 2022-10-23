/**
 * @file commodity actions
 * @author Mingze Ma
 */
import api from "src/api";
import apiConfig from "src/api/apiConfig";

export const searchCommodity = (params: any) => api.post(apiConfig.commodity.search, params);

export const recommendCommodity = (params: any) => api.get(apiConfig.commodity.recommend, params);

export const getCommodityDetail = (params: any) => api.get(apiConfig.commodity.detail, params);

export const createCommodity = (params: any) => api.post(apiConfig.commodity.create, params);
