/**
 * @file checkout page
 * @author Mingze Ma
 */
import React, {useCallback, useEffect, useState} from "react";
import {Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import actions from "src/actions";
import {useSelector} from "react-redux";
import {RootState} from "src/reducer";
import _ from "lodash";
import {List, Space, Avatar, message} from "antd";
import {StarOutlined, MessageOutlined} from '@ant-design/icons';
import Box from "@mui/material/Box";

import './index.less';
import Button from "@mui/material/Button";
import {DeleteOutlined} from "@mui/icons-material";

const IconText = ({ icon, text }: { icon?: React.FC; text: string }) => (
  <Space>
    {icon && React.createElement(icon)}
    {text}
  </Space>
);

const Checkout: React.FC = () => {

  const {userInfo}: any = useSelector<RootState>(state => state.global);

  const [data, setData] = useState([]);

  const getCartList = useCallback(async () => {
    try {
      const res = await actions.getCartList({
        userId: userInfo.user_id
      });
      console.log('--res--\n', res);
      setData(_.get(res, 'cart_commodity', []));
    } catch (e) {
      console.error(e);
    }
  }, [userInfo]);

  const handleRemoveClick = useCallback(async (item: any) => {
    try {
      await actions.removeCommodityFromCart({
        user_id: userInfo.user_id,
        commodity_id: item.commodity_id,
      });
    } catch (e: any) {
      message.error(e.message);
    }
  }, [userInfo]);

  useEffect(() => {
    !_.isEmpty(userInfo) && getCartList();
  }, [getCartList, userInfo]);

  return (
    <Container maxWidth="xl" sx={{py: 4}}>
      <Typography variant="h3">
        One more step to enjoy your course...
      </Typography>
      <Box sx={{py: 3}}>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={data}
          renderItem={(item: any) => {
            const teacherName = (() => {
              if (!_.get(data, 'published_by')) {
                return 'System Course';
              }
              return `${_.get(data, 'published_by.user_firstname', '')} ${_.get(data, 'published_by.user_lastname', '')}`
            })();
            return (
              <List.Item
                key={item.commodity_id}
                actions={[
                  <IconText icon={StarOutlined} text={item.commodity_star} key="list-vertical-star-o" />,
                  <IconText  text={item.commodity_star + ' enrolled'} key="list-vertical-like-o" />,
                  <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                  <Button
                    size="small"
                    startIcon={<DeleteOutlined />}
                    variant="outlined"
                    onClick={() => handleRemoveClick(item)}
                  >Remove from cart</Button>
                ]}
                extra={
                  <img
                    width={256}
                    alt="logo"
                    src={item.commodity_cover || '#'}
                  />
                }
              >
                <List.Item.Meta
                  title={
                    <Typography variant="h4">
                      <a href={`/commodity/${item.commodity_id}`}>{item.commodity_name}</a>
                    </Typography>
                  }
                  description={item.commodity_introduction}
                />
                <List.Item.Meta
                  className="checkout-teacher"
                  avatar={<Avatar
                    src={_.get(item, 'published_by.user_avatar')}
                    alt={teacherName}
                  />}
                  title={teacherName}
                />
              </List.Item>
            )
          }}
        />
      </Box>
    </Container>
  );
};

export default Checkout;
