/**
 * @file course route
 * @author Mingze Ma
 */

import {RouteObject} from "react-router-dom";
import {suspenseLazyComponent} from "src/util/lazyLoading";
import React from "react";

const Course = React.lazy(() => import("src/module/course"));

const courseRoutes: RouteObject[] = [
  {
    path: 'course/:courseId',
    element: suspenseLazyComponent(Course),
  },
];

export default courseRoutes;
