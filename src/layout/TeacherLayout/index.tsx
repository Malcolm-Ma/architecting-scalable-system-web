/**
 * @file teacher layout
 * @author Mingze Ma
 */

import React from "react";
import {Box, styled, useTheme} from "@mui/material";
import {Outlet} from "react-router-dom";
import Header from "src/layout/header";
import Toolbar from "@mui/material/Toolbar";
import Sidebar from "src/layout/Sidebar";
import {HEADER_HEIGHT, HEADER_HEIGHT_M} from "src/constant/constants";

const Main = styled(Box)(() => ({
  width: '100%',
  minHeight: '100vh',
  flexGrow: 1,
}));

const TeacherLayout: React.FC = () => {
  const theme = useTheme();

  return (
    <Box className="elearn-frame" sx={{display: 'flex', width: '100%'}}>
      <Header isAdmin/>
      <Main>
        <Toolbar className="header-placeholder" />
        <Box sx={{
          pt: 0.5,
          width: '100%',
          minHeight: `calc(100vh - ${HEADER_HEIGHT})`,
          display: 'flex',
          [theme.breakpoints.down('sm')]: {
            minHeight: `calc(100vh - ${HEADER_HEIGHT_M})`,
          }
        }}>
          <Sidebar/>
          <Box sx={{width: '100%', bgcolor: 'grey.100'}}>
            <Outlet/>
          </Box>
        </Box>
      </Main>
    </Box>
  );
};

export default TeacherLayout;
