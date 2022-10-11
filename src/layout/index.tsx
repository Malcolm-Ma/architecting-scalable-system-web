/**
 * @file index
 * @author Mingze Ma
 */

import React, {useEffect} from "react";
import Header from "./header";
import Main from "./Main";
import useAuthService from "../hooks/useAuthService";
import ELearnThemeProvider from "../theme";
import {Box} from "@mui/material";
import {setLoginStatus, setToken} from "src/reducer/globalReducer";
import {useDispatch} from "react-redux";

const Layout: React.FC = () => {
  const authService = useAuthService();

  const dispatch = useDispatch();

  useEffect(() => {
    authService.initKeycloak({
      onSuccess(token) {
        dispatch(setLoginStatus(true));
        dispatch(setToken(token));
      },
      onRejected() {
        dispatch(setLoginStatus(false));
      },
      onError() {
        dispatch(setLoginStatus(false));
      }
    });
  }, [authService, dispatch]);

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
