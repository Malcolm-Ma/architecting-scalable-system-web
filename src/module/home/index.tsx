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
import Typography from "@mui/material/Typography";
import {Empty} from "antd";

const Home: React.FC = () => {

  const [result, setResult] = useState<any[]>([]);
  const [loading, setLoaidng] = useState(true);

  const getHomeCommodityList = useCallback(async () => {
    setLoaidng(true);
    try {
      const res = await actions.recommendCommodity({
        limit: 12,
      });
      setResult(res as any);
      console.log('--res--\n', res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoaidng(false);
    }
  }, []);

  useEffect(() => {
    getHomeCommodityList();
  }, [getHomeCommodityList]);

  return (
    <Container maxWidth="xl" sx={{bgcolor: 'grey.100', pb: 4}}>
      {
        !loading
          ? <>{!_.isEmpty()
            ? <>
              <Box
                sx={{
                  mx: '-24px',
                  bgcolor: 'background.default'
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
                <Typography variant="h3" sx={{pb: 2}}>
                  TOP Star Courses
                </Typography>
                <ProductCard data={result.slice(3)}/>
              </Box>
            </>
            : <Box sx={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Empty description="No modules, please contact the admin"/>
            </Box>
          }</>
          : <CircularProgress/>
      }
    </Container>
  );
};

export default Home;
