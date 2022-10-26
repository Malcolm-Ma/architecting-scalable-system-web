/**
 * @file user
 * @author Mingze Ma
 */
import Container from "@mui/material/Container";
import useSignInCheck from "src/hooks/useSignInCheck";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import {useMemo} from "react";
import Box from "@mui/material/Box";
import ProductCard from "src/components/ProductCard";

export default function User() {
  const {userInfo, LoginCheck} = useSignInCheck({});
  const enrolled = useMemo(() => {
    const transactionList = _.get(userInfo, 'transaction_list', []);
    let result: any[] = [];
    _.map(transactionList, (transaction) => {
      result.push(_.get(transaction, 'commodity_list', []));
    });
    result = _.flatten(result);
    return result;
  }, [userInfo]);

  return (
    <LoginCheck>
      <Container sx={{py: 3}}>
        <Typography variant="h3" sx={{pb: 3}}>
          Enrolled Modules
        </Typography>
        <Box>
          <ProductCard data={enrolled}></ProductCard>
        </Box>
      </Container>
    </LoginCheck>
  );
}
