/**
 * @file index
 * @author Mingze Ma
 */

import React, {Suspense} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import { routeMainConfig, routeAdminConfig } from "src/config/routes";
import MainLayout from "src/layout/MainLayout";
import {CircularProgress} from "@mui/material";

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
    <Suspense fallback={<CircularProgress />}>
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  );
};

export default Layout;
