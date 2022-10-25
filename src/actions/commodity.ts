/**
 * @file commodity actions
 * @author Mingze Ma
 */
import api, {searchApi} from "src/api";
import apiConfig from "src/api/apiConfig";

export const searchCommodity = (params: any) => searchApi.post(apiConfig.search, params);

export const recommendCommodity = (params: any) => api.get(apiConfig.commodity.recommend, params);

export const getCommodityDetail = (params: any) => api.get(apiConfig.commodity.detail, params);

export const createCommodity = (params: any) => api.post(apiConfig.commodity.create, params);

export const getPublishedCommodityList = (params: any) => api.get(apiConfig.user.publishedCommodityList, params);

export const createReview = (params: any) => api.post(apiConfig.commodity.review.create, params);
