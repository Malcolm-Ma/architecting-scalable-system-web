/**
 * @file hook for checking admin auth
 * @author Mingze Ma
 */

import {useSelector} from "react-redux";
import {RootState} from "src/reducer";
import _ from "lodash";
import React, {useMemo} from "react";
import Box from "@mui/material/Box";
import {Alert, Link} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

interface AuthCheckProps {
  children: React.ReactNode
}

export default function useAdminCheck() {
  const user = useSelector<RootState, RootState['global']>(state => state.global);

  const isAdmin = useMemo(() => {
    return user.loggedIn && !_.isEmpty(user.userInfo) && _.get(user.userInfo, 'role') === 'teacher';
  }, [user]);

  const AuthCheck: React.FC<AuthCheckProps> = (props: AuthCheckProps) => {
    const { children } = props;

    if (!user.init) {
      return <CircularProgress />;
    }
    if (isAdmin) {
      return <>{children}</>;
    }
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          You are not allowed to access this page as a student.
          <Link href={'/'}>Go back to home</Link>
        </Alert>
      </Box>
    );
  };

  return {
    user,
    userInfo: _.get(user, 'userInfo', {}),
    AuthCheck,
  };
};
