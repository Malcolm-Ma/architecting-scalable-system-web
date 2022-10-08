/**
 * @file
 * @author Mingze Ma
 */

import React, {useEffect} from "react";
import Header from "./header";
import Main from "./Main";
import useAuthService from "../hooks/useAuthService";

const Layout: React.FC = () => {
  const authService = useAuthService();

  useEffect(() => {
    authService.initKeycloak(() => {});
  }, [authService]);

  return (
    <div>
      <Header />
      <Main />
    </div>
  );
};

export default Layout;
