/**
 * @file App
 * @author Mingze Ma
 */

import React, {useEffect} from "react";
import Layout from "src/layout";
import useAuthService from "./hooks/useAuthService";
import ELearnThemeProvider from "./theme";
import {setLoginStatus, setToken} from "src/reducer/globalReducer";
import {useDispatch} from "react-redux";

const App: React.FC = () => {
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
      <Layout />
    </ELearnThemeProvider>
  );
};

export default App;
