/**
 * @file admin route
 * @author Mingze Ma
 */

import {RouteObject} from "react-router-dom";
import React from "react";
import {suspenseLazyComponent} from "src/util/lazyLoading";

const AdminDashboard = React.lazy(() => import('src/module/adminDashboard'));
const AdminModule = React.lazy(() => import('src/module/adminModule'));
const AdminModuleCreate = React.lazy(() => import('src/module/adminModule/create'));

const adminRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    element: suspenseLazyComponent(AdminDashboard),
  },
  {
    path: 'module',
    element: suspenseLazyComponent(AdminModule),
  },
  {
    path: 'module/list',
    element: suspenseLazyComponent(AdminModule),
  },
  {
    path: 'module/create',
    element: suspenseLazyComponent(AdminModuleCreate),
  }
];

export default adminRoutes;
