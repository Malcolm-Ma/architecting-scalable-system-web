/**
 * @file route config index
 * @author Mingze Ma
 */
import {RouteObject} from "react-router-dom";

import homeRoutes from "./home";
import teacherRoutes from "./teacher";
import commodityRoutes from "./commodity";
import courseRoutes from "src/config/routes/course";

export const routeMainConfig: RouteObject[] = [
  ...homeRoutes,
  ...commodityRoutes,
  ...courseRoutes,
];

export const routeAdminConfig: RouteObject[] = [
  ...teacherRoutes,
];
