/**
 * @file checkout page
 * @author Mingze Ma
 */
import React, {useCallback, useEffect, useState} from "react";
import {Backdrop, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import actions from "src/actions";
import {useSelector} from "react-redux";
import {RootState} from "src/reducer";
import _ from "lodash";
import {List, Space, Avatar, message} from "antd";
import {StarOutlined, MessageOutlined} from '@ant-design/icons';
import Button from "@mui/material/Button";
import {DeleteOutlined} from "@mui/icons-material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import {useNavigate} from "react-router-dom";

import './index.less';

const IconText = ({ icon, text }: { icon?: React.FC; text: string }) => (
  <Space>
    {icon && React.createElement(icon)}
    {text}
  </Space>
);

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const {userInfo}: any = useSelector<RootState>(state => state.global);

  const [cartId, setCardId] = useState('');
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);

  const getCartList = useCallback(async () => {
    setLoading(true);
    try {
      const res: any = await actions.getCartList({
        userId: userInfo.user_id
      });
      setCardId(res.cart_id);
      setData(_.get(res, 'cart_commodity', []));
    } catch (e: any) {
      console.error(e.message || e);
    } finally {
      setLoading(false);
    }
  }, [userInfo]);

  const handleRemoveClick = useCallback(async (item: any) => {
    try {
      await actions.removeCommodityFromCart({
        user_id: userInfo.user_id,
        commodity_id: item.commodity_id,
      });
      message.success('Remove successfully');
      await getCartList();
    } catch (e: any) {
      message.error(e.message);
    }
  }, [getCartList, userInfo.user_id]);

  const handleCheckoutClick = useCallback(async () => {
    setOpen(true);
    try {
      await actions.makePayment({
        cart_id: cartId,
      });
      setTimeout(() => {
        setOpen(false);
        message.success('Payment successfully');
        navigate('/');
      }, 1000);
    } catch (e: any) {
      setTimeout(() => {
        setOpen(false);
        message.error(e.message);
      }, 500);
    } finally {
    }
  }, [cartId]);

  useEffect(() => {
    !_.isEmpty(userInfo) && getCartList();
  }, [getCartList, userInfo]);

  return (
    <Container maxWidth="lg" sx={{py: 4}}>
      <Typography variant="h2">
        One more step to enjoy your course...
      </Typography>
      <Card sx={{my: 3, py: 3}}>
        <Typography sx={{pb: 2, px: 3}} variant="h3">Your shopping cart</Typography>
        <List
          loading={loading}
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
                  <IconText  text={item.commodity_sold_cnt + ' enrolled'} key="list-vertical-like-o" />,
                  <IconText icon={MessageOutlined} text={item.review_list.length} key="list-vertical-message" />,
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
                    <Typography variant="h4" component="div">
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
      </Card>
      <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
        <Button
          variant="contained"
          sx={{mr: 3, width: 150}}
          onClick={handleCheckoutClick}
          disabled={data.length === 0}
        >
          CHECK OUT
        </Button>
        <Button variant="outlined">
          BACK
        </Button>
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default Checkout;
