/**
 * @file admin module index
 * @author Mingze Ma
 */

import React, {useCallback, useEffect, useState} from "react";
import AdminPage from "src/components/AdminPage";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import Card from "@mui/material/Card";
import {CardContent} from "@mui/material";
import {Table, TableColumnsType} from "antd";
import actions from "src/actions";
import useAdminCheck from "src/hooks/useAdminCheck";
import _ from "lodash";
import PriceDisplay from "src/components/PriceDisplay";
import moment from "moment";
import IconButton from "@mui/material/IconButton";
import ImageIcon from '@mui/icons-material/Image';

const columnConfig = (payloads: any): TableColumnsType<any> => {
  const {} = payloads;

  return [
    {
      dataIndex: 'commodity_name',
      title: 'Module Title',
      render: (text, record) => (
        <a href={'/commodity/' + _.get(record, 'commodity_id')}>
          {text}
        </a>
      ),
    },
    {
      dataIndex: 'commodity_sold_cnt',
      title: 'Sold Count'
    },
    {
      dataIndex: 'commodity_price',
      title: 'Price per Module',
      render: (text, record) => (
        <PriceDisplay
          price={text}
          discount={_.get(record, 'commodity_discount', 1)}
          boxStyle={{p: 0}}
        />
      ),
    },
    {
      dataIndex: 'commodity_discount',
      title: 'Price Discount',
      render: (text) => {
        if (text === 1 || !text) {
          return 'N/A';
        }
        return `${text * 100}%`;
      },
    },
    {
      dataIndex: 'commodity_star',
      title: 'Module Stars',
      render: (text) => (
        <div><b>{text}</b>/5.0</div>
      ),
    },
    {
      dataIndex: 'course_list',
      title: 'Course Number',
      render: (text) => (
        <a>
          {_.get(text, 'length', '0')}
        </a>
      ),
    },
    {
      dataIndex: 'commodity_cover',
      title: 'Cover Image',
      render: (text) => (
        <IconButton onClick={() => window.open(_.replace(text, ' ', '%20'))}>
          <ImageIcon/>
        </IconButton>
      ),
    },
    {
      dataIndex: 'commodity_create_time',
      title: 'Created on',
      render: (text) => moment(text).format('LLL'),
    }
  ];
};

const AdminModule: React.FC = () => {
  const navigate = useNavigate();

  const {userInfo, AuthCheck} = useAdminCheck();

  const [listData, setListData] = useState<any[]>([]);

  const getPublishedCommodityList = useCallback(async () => {
    try {
      const res: any = await actions.getPublishedCommodityList({
        userId: _.get(userInfo, 'user_id'),
      });
      setListData(res);
      console.log('--res--\n', res);
    } catch (e: any) {
      console.error(e);
      setListData([]);
    }
  }, [userInfo]);

  useEffect(() => {
    !_.isEmpty(userInfo) && getPublishedCommodityList();
    return () => setListData([]);
  }, [getPublishedCommodityList, userInfo]);

  const payloads = {};
  return (
    <AuthCheck>
      <AdminPage
        headerText="Module List"
        headerAction={<Button variant="contained" onClick={() => navigate('/teacher/module/create')}>
          Create Module
        </Button>}
      >
        <Card>
          <CardContent>
            <Table
              dataSource={listData}
              columns={columnConfig(payloads)}
              rowKey="commodity_id"
            />
          </CardContent>
        </Card>
      </AdminPage>
    </AuthCheck>
  );
};

export default AdminModule;
