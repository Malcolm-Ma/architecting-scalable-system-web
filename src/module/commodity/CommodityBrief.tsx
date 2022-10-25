/**
 * @file commodity brief
 * @author Mingze Ma
 */
import React, {useCallback, useMemo} from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {Grid, Stack, useTheme} from "@mui/material";
import {convertToRGB} from "src/util/HexToRgb";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import OverviewChip from "src/components/OverviewChip";
import Avatar from "@mui/material/Avatar";
import PriceDisplay from "src/components/PriceDisplay";
import Button from "@mui/material/Button";
import moment from "moment";
import {useSelector} from "react-redux";
import {RootState} from "src/reducer";
import actions from "src/actions";
import {message} from "antd";

interface CommodityBriefProps {
  data: any,
}

const CommodityBrief: React.FC<CommodityBriefProps> = (props) => {
  const {data} = props;

  const theme = useTheme();
  const user = useSelector((state: RootState) => state.global);

  const handleAddCartClick = useCallback(async () => {
    try {
      await actions.addModuleToCart({
        user_id: _.get(user, 'userInfo.user_id'),
        commodity_id: _.get(data, 'commodity_id'),
      });
      message.success(`Add ${_.get(data, 'commodity_name')} to cart successfully.`);
      setTimeout(() => window.location.reload(), 1000);
    } catch (e) {
      console.error(e)
    }
  }, [data, user]);

  const inCart = useMemo(() => {
    if (user.loggedIn) {
      return _.includes(
        _.map(_.get(user, 'userInfo.user_shopping_cart.cart_commodity', []), 'commodity_id'),
        _.get(data, 'commodity_id', '')
      );
    }
    return false;
  }, [data, user]);

  const teacherFullName = useMemo(() => {
    if (!_.get(data, 'published_by')) {
      return 'System Course';
    }
    return `${_.get(data, 'published_by.user_firstname', '')} ${_.get(data, 'published_by.user_lastname', '')}`
  }, [data]);

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(90deg, ${convertToRGB(theme.palette.primary[800])}, ${convertToRGB(theme.palette.primary.main)})`,
        py: 6,
        width: '100%'
      }}
    >
      <Container maxWidth="xl" sx={{minHeight: '250px'}}>
        <Grid container sx={{px: {xs: 0, sm: 2}}}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h1" color="primary.contrastText">
              {_.get(data, 'commodity_name', '-')}
            </Typography>
            <Typography variant="body1" color="primary.contrastText">
              {_.get(data, 'commodity_introduction', '')}
            </Typography>
            <OverviewChip
              boxStyle={{py: 2}}
              starColor="#fff"
              chipStyle={{color: '#fff'}}
              star={_.get(data, 'commodity_star', 0)}
              sold={_.get(data, 'commodity_sold_cnt', 0)}
            />
            <PriceDisplay
              price={_.get(data, 'commodity_price', 0)}
              discount={_.get(data, 'commodity_discount', 1)}
              priceProps={{variant: 'h3', color: '#fff'}}
              discountProps={{variant: 'h4'}}
              boxStyle={{display: 'flex', alignItems: 'center', pb: 0, pt: 2}}
            />
            <Button
              size="large"
              variant="contained"
              sx={{
                mt: {xs: 4, sm: 6},
                bgcolor: 'rgb(167, 131, 55)',
                '&:disabled': {
                  color: '#fff',
                  bgcolor: 'rgba(167, 131, 55, .8)',
                },
              }}
              onClick={handleAddCartClick}
              disabled={inCart}
            >
              {!inCart ? 'Add to Cart' : 'Already In Cart'}
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} sx={{px: {xs: 0, sm: 6}}}>
            <Box
              sx={{
                backgroundImage: `url(${_.get(data, 'commodity_cover')})`,
                backgroundSize: 'contain',
                backgroundPosition: 'left',
                backgroundRepeat: 'no-repeat',
                height: theme.spacing(20),
                margin: 'auto',
                mb: 2,
                mt: {xs: 2, sm: 0}
              }}
            ></Box>
            <Typography variant="h4" color="primary.contrastText" sx={{pb: 2, pt: {xs: 2, sm: 0}}}>
              Offered by
            </Typography>
            <Stack direction="row" spacing={2} sx={{display: 'flex', alignItems: 'center'}}>
              <Avatar alt={teacherFullName} src={_.get(data, 'published_by.user_avatar', '#')}/>
              <Typography variant="body1" color="primary.contrastText">{teacherFullName}</Typography>
            </Stack>
            <Typography color="primary.contrastText" sx={{pt: 3}}>
              Last Updated in {moment(_.get(data, 'commodity_update_time')).format('LLL')}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CommodityBrief;
