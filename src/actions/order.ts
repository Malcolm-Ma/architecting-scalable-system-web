/**
 * @file order actions
 * @author Mingze Ma
 */
import api from "src/api";
import apiConfig from "src/api/apiConfig";

export const addModuleToCart = (params: any) => api.post(apiConfig.order.cart.create, params);

export const getCartList = (params: any) => api.get(apiConfig.order.cart.display, params);

export const removeCommodityFromCart = (params: any) => api.post(apiConfig.order.cart.remove, params);

export const makePayment = (params: any) => api.post(apiConfig.order.pay, params);

