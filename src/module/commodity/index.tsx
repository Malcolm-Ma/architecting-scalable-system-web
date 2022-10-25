/**
 * @file commodity detail index
 * @author Mingze Ma
 */

import React, {useCallback, useEffect, useMemo, useState} from "react";
import Container from "@mui/material/Container";
import actions from "src/actions";
import {useParams} from "react-router-dom";
import {message, Tabs} from "antd";
import _ from "lodash";
import CircularProgress from "@mui/material/CircularProgress";
import {Alert} from "@mui/material";
import CommodityBrief from "src/module/commodity/CommodityBrief";
import Box from "@mui/material/Box";
import {AppstoreOutlined, CommentOutlined} from "@ant-design/icons";
import CourseList from "src/components/CourseList";
import CommentView from "src/components/CommentView";

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

  const items = useMemo(() => ([
    {
      label: 'Courses',
      key: 'course',
      icon: <AppstoreOutlined />,
      children: <CourseList moduleData={detailData} size="normal" />,
    },
    {
      label: 'User Comments',
      key: 'review',
      icon: <CommentOutlined />,
      children: <CommentView moduleData={detailData} />,
    },
  ]), [detailData]);

  useEffect(() => {
    getCommodityDetail();
  }, [getCommodityDetail]);

  return (
    <>
      {!loading
        ? <>
          {!_.isNil(detailData)
            ? <Container disableGutters maxWidth={false}>
              <CommodityBrief data={detailData}/>
              <Box sx={{p: 3}}>
                <Tabs
                  centered
                  defaultActiveKey={items[0].key}
                  items={_.map(items, item => ({
                    label: (<span>{item.icon}{item.label}</span>),
                    children: item?.children,
                    key: item.key
                  }))}
                />
              </Box>
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
