/**
 * @file Index page
 * @author Mingze Ma
 */
import React from "react";
import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import Header from "src/layout/header";

const MainLayout: React.FC = () => {

  return (
    <Box className="elearn-frame" sx={{ display: 'flex', width: '100%' }}>
      <Header />
      <Box className="elearn-main">
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
