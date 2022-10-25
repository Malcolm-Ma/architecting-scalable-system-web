import React, {useMemo} from "react";
import _ from "lodash";
import {useSelector} from "react-redux";
import {RootState} from "src/reducer";
import {Alert, Link} from "@mui/material";
import Box from "@mui/material/Box";

/**
 * @file sign in check hook
 * @author Mingze Ma
 */

export interface useSignInCheckProps {
  commodityInfo?: any;
}

export interface LoginCheckProps {
  children: React.ReactNode;
}

export default function useSignInCheck(props: useSignInCheckProps) {
  const {commodityInfo} = props;
  const user = useSelector((state: RootState) => state.global);


  const isPurchased = useMemo(() => {
    console.log('--commodityInfo--\n', commodityInfo);
    if (!commodityInfo) {
      return false;
    }
    const transactionList = _.get(user.userInfo, 'transaction_list', []);
    let result: any[] = [];
    _.map(transactionList, (transaction) => {
      result.push(_.map(_.get(transaction, 'commodity_list', []), 'commodity_id'));
    });
    result = _.flatten(result);
    return _.includes(result, commodityInfo.commodity_id);
  }, [commodityInfo, user.userInfo]);

  const LoginCheck: React.FC<LoginCheckProps> = (props) => {
    const { children } = props;

    return (
      <>
        {user.loggedIn
          ? <>{children}</>
          : <Box sx={{ p: 3 }}>
            <Alert severity="error">
              You are not allowed to access this page as a guest.
              <Link href={'/'}>Go back to home</Link>
            </Alert>
          </Box>
        }
      </>
    );
  };

  return {
    isPurchased,
    LoginCheck,
  };
}
