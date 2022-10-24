/**
 * @file admin route
 * @author Mingze Ma
 */

import {RouteObject, Navigate} from "react-router-dom";
import React from "react";
import {suspenseLazyComponent} from "src/util/lazyLoading";

const AdminDashboard = React.lazy(() => import('src/module/adminDashboard'));
const AdminModule = React.lazy(() => import('src/module/adminModule'));
const AdminModuleCreate = React.lazy(() => import('src/module/adminModule/create'));
const AdminCourse = React.lazy(() => import('src/module/adminCourse'));
const AdminCourseCreate = React.lazy(() => import('src/module/adminCourse/create'));


const adminRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    element: suspenseLazyComponent(AdminDashboard),
  },
  {
    path: 'module',
    element: <Navigate to="'module/list'" replace/>,

  },
  {
    path: 'module/list',
    element: suspenseLazyComponent(AdminModule),
  },
  {
    path: 'module/create',
    element: suspenseLazyComponent(AdminModuleCreate),
  },
  {
    path: 'course/list',
    element: suspenseLazyComponent(AdminCourse),
  },
  {
    path: 'course/create',
    element: suspenseLazyComponent(AdminCourseCreate),
  },
];

export default adminRoutes;
