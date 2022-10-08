/**
 * @file
 * @author Mingze Ma
 */

import React, {useEffect} from "react";
import Header from "./header";
import Main from "./Main";
import useAuthService from "../hooks/useAuthService";
import ELearnThemeProvider from "../theme";

const Layout: React.FC = () => {
  const authService = useAuthService();

  useEffect(() => {
    authService.initKeycloak(() => {});
  }, [authService]);

  return (
    <ELearnThemeProvider>
      <div className="elearn-frame">
        <Header />
        <Main />
      </div>
    </ELearnThemeProvider>
  );
};

export default Layout;
