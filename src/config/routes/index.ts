/**
 * @file route config index
 * @author Mingze Ma
 */
import {RouteObject} from "react-router-dom";

import homeRoutes from "./home";
import teacherRoutes from "./teacher";
import commodityRoutes from "./commodity";

export const routeMainConfig: RouteObject[] = [
  ...homeRoutes,
  ...commodityRoutes,
];

export const routeAdminConfig: RouteObject[] = [
  ...teacherRoutes,
];
