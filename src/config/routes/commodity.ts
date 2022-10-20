/**
 * @file commodity route config
 * @author Mingze Ma
 */

import {RouteObject} from "react-router-dom";
import {suspenseLazyComponent} from "src/util/lazyLoading";
import React from "react";

const Commodity = React.lazy(() => import("src/module/commodity"));

const commodityRoutes: RouteObject[] = [
  {
    path: 'commodity/:commodityId',
    element: suspenseLazyComponent(Commodity),
  },
];

export default commodityRoutes;
