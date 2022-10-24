/**
 * @file course actions
 * @author Mingze Ma
 */
import api from "src/api";
import apiConfig from "src/api/apiConfig";

export const createCourse = (params: any) => api.post(apiConfig.course.create, params);
