/**
 * @file course actions
 * @author Mingze Ma
 */
import api from "src/api";
import apiConfig from "src/api/apiConfig";

export const createCourse = (params: any) => api.post(apiConfig.course.create, params);

export const getCourseInfo = (params: any) => api.get(apiConfig.course.info, params);

