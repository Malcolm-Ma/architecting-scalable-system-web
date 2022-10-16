/**
 * @file Home index
 * @author Mingze Ma
 */
import React, {useCallback, useEffect} from "react";
import actions from "src/actions";

const Home: React.FC = () => {

  const getCommodityList = useCallback(async () => {
    try {
      const res = await actions.searchCommodity({
        keyword: '',
      });
      console.log('--res--\n', res);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getCommodityList();
  }, [getCommodityList]);

  return (
    <>Home</>
  );
};

export default Home;
