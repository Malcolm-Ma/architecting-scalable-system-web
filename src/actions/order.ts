/**
 * @file order actions
 * @author Mingze Ma
 */
import api from "src/api";
import apiConfig from "src/api/apiConfig";

export const addModuleToCart = (params: any) => api.post(apiConfig.order.cart.create, params);
