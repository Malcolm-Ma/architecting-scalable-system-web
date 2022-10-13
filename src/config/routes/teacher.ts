/**
 * @file admin route
 * @author Mingze Ma
 */

import {RouteObject} from "react-router-dom";
import React from "react";
import {suspenseLazyComponent} from "src/util/lazyLoading";

const AdminDashboard = React.lazy(() => import('src/module/adminDashboard'));

const adminRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    element: suspenseLazyComponent(AdminDashboard),
  }
];

export default adminRoutes;
