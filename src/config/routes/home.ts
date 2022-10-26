/**
 * @file home route config
 * @author Mingze Ma
 */

import {RouteObject} from "react-router-dom";
import React from "react";
import {suspenseLazyComponent} from "src/util/lazyLoading";

const Home = React.lazy(() => import('src/module/home'));
const Checkout = React.lazy(() => import('src/module/checkout'));
const Search = React.lazy(() => import('src/module/search'));
const User = React.lazy(() => import('src/module/user'));


const homeRoutes: RouteObject[] = [
  {
    path: '',
    element: suspenseLazyComponent(Home),
  },
  {
    path: 'home',
    element: suspenseLazyComponent(Home),
  },
  {
    path: 'checkout',
    element: suspenseLazyComponent(Checkout),
  },
  {
    path: 'search',
    element: suspenseLazyComponent(Search),
  },
  {
    path: 'user',
    element: suspenseLazyComponent(User),
  },
];

export default homeRoutes;
