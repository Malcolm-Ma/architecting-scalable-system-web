/**
 * @file Home index
 * @author Mingze Ma
 */
import React, {useCallback, useEffect, useState} from "react";
import actions from "src/actions";
import Container from "@mui/material/Container";

const Home: React.FC = () => {

  const [_result, setResult] = useState<any>([]);

  const getCommodityList = useCallback(async () => {
    try {
      const res = await actions.recommendCommodity({
        limit: 10,
      });
      setResult(res);
      console.log('--res--\n', res);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getCommodityList();
  }, [getCommodityList]);

  return (
    <Container maxWidth="xl">
      Home
    </Container>
  );
};

export default Home;
