/**
 * @file route config index
 * @author Mingze Ma
 */
import {RouteObject} from "react-router-dom";

import homeRoutes from "./home";
import teacherRoutes from "./teacher";

export const routeMainConfig: RouteObject[] = [
  ...homeRoutes,
];

export const routeAdminConfig: RouteObject[] = [
  ...teacherRoutes,
];
