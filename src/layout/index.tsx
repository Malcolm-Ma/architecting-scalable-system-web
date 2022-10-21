/**
 * @file index
 * @author Mingze Ma
 */

import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import { routeMainConfig, routeAdminConfig } from "src/config/routes";
import MainLayout from "src/layout/MainLayout";

const Layout: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: routeMainConfig,
    },
    {
      path: '/teacher',
      element: <MainLayout />,
      children: routeAdminConfig,
    }
  ]);

  return (
    <RouterProvider router={router}/>
  );
};

export default Layout;
