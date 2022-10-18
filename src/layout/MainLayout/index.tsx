/**
 * @file Index page
 * @author Mingze Ma
 */
import React from "react";
import {Box, styled} from "@mui/material";
import {Outlet} from "react-router-dom";
import Header from "src/layout/header";
import Toolbar from "@mui/material/Toolbar";

const Main = styled(Box)(({theme}) => ({
  width: '100%',
  minHeight: '100vh',
  flexGrow: 1,
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(3),
  }
}));

const MainLayout: React.FC = () => {

  return (
    <Box className="elearn-frame" sx={{display: 'flex', width: '100%'}}>
      <Header/>
      <Main>
        <Toolbar className="header-placeholder" />
        <Outlet/>
      </Main>
    </Box>
  );
};

export default MainLayout;
