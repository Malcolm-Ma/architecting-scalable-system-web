/**
 * @file commodity detail index
 * @author Mingze Ma
 */
import React, {useCallback, useEffect, useState} from "react";
import Container from "@mui/material/Container";
import actions from "src/actions";
import {useParams} from "react-router-dom";
import {message} from "antd";
import _ from "lodash";
import CircularProgress from "@mui/material/CircularProgress";
import {Alert} from "@mui/material";
import CommodityBrief from "src/module/commodity/CommodityBrief";

const Commodity: React.FC = () => {
  const {commodityId} = useParams();

  const [detailData, setDetailData] = useState<object | null>(null);

  const [loading, setLoading] = useState(true);

  const getCommodityDetail = useCallback(async () => {
    try {
      setLoading(true);
      const res = await actions.getCommodityDetail({commodityID: commodityId});
      if (!res) {
        setDetailData(null);
        message.error("Invalid Course, please try again");
        return;
      }
      setDetailData(res);
    } catch (e) {
      setDetailData(null);
      message.error("Invalid Course, please try again");
    } finally {
      setLoading(false);
    }
  }, [commodityId]);

  useEffect(() => {
    getCommodityDetail();
  }, [getCommodityDetail]);

  return (
    <>
      {!loading
        ? <>
          {!_.isNil(detailData)
            ? <Container disableGutters>
              <CommodityBrief data={detailData}/>
            </Container>
            : <Alert sx={{m: 3}} severity="error">The commodity does not exist, please try again</Alert>
          }
        </>
        : <CircularProgress/>
      }
    </>
  );
}

export default Commodity;
