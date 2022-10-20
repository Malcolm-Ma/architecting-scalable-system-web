/**
 * @file Home index
 * @author Mingze Ma
 */
import React, {useCallback, useEffect, useState} from "react";
import actions from "src/actions";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Carousel from "src/components/Carousel";

import _ from "lodash";
import CircularProgress from "@mui/material/CircularProgress";
import ProductCard from "src/components/ProductCard";

const Home: React.FC = () => {

  const [result, setResult] = useState<any[]>([]);

  const getHomeCommodityList = useCallback(async () => {
    try {
      const res = await actions.recommendCommodity({
        limit: 12,
      });
      setResult(res as any);
      console.log('--res--\n', res);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getHomeCommodityList();
  }, [getHomeCommodityList]);

  return (
    <Container maxWidth="xl" disableGutters>
      {
        !_.isEmpty(result)
          ? <>
            <Box
              sx={{
                background: '#fff',
                mx: '-24px',
                mt: '-24px',
              }}
            >
              <Carousel data={result.slice(0, 3)} height={480} autoplay>
              </Carousel>
            </Box>
            <Box
              sx={{
                pt: 3,
              }}
            >
              <ProductCard data={result.slice(3)} />
            </Box>
          </>
          : <CircularProgress/>
      }
    </Container>
  );
};

export default Home;
