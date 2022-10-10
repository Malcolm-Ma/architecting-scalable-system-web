/**
 * @file
 * @author Mingze Ma
 */

import React, {useEffect} from "react";
import Header from "./header";
import Main from "./Main";
import useAuthService from "../hooks/useAuthService";
import ELearnThemeProvider from "../theme";
import {Box} from "@mui/material";

const Layout: React.FC = () => {
  const authService = useAuthService();

  useEffect(() => {
    authService.initKeycloak(() => {});
  }, [authService]);

  return (
    <ELearnThemeProvider>
      <Box className="elearn-frame" sx={{ display: 'flex', width: '100%' }}>
        <Header />
        <Main />
      </Box>
    </ELearnThemeProvider>
  );
};

export default Layout;
