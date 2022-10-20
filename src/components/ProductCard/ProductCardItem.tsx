/**
 * @file product card item
 * @author Mingze Ma
 */
import React from "react";
import Card from '@mui/material/Card';
import {CardActionArea, CardContent, CardMedia} from "@mui/material";
import _ from "lodash";
import Typography from "@mui/material/Typography";
import PriceDisplay from "src/components/PriceDisplay";
import OverviewChip from "src/components/OverviewChip";

interface ProductCardItemProps {
  content: any,
}

const ProductCardItem: React.FC<ProductCardItemProps> = (props) => {
  const {content} = props;

  return (
    <Card sx={{maxWidth: 345, height: '100%'}}>
      <CardActionArea sx={{height: '100%'}}>
        <CardMedia
          component="img"
          height="216px"
          image={_.get(content, 'commodity_cover')}
          alt={_.get(content, 'commodity_name')}
        />
        <CardContent sx={{
          height: 'calc(100% - 216px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <Typography gutterBottom variant="h5" component="div">
              {_.get(content, 'commodity_name')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {_.truncate(_.get(content, 'commodity_introduction'), {length: 100})}
            </Typography>
            <OverviewChip
              star={_.get(content, 'commodity_star', 0)}
              sold={_.get(content, 'commodity_sold_cnt', 0)}
              boxStyle={{pt: 2, pb: 0}}
            />
          </div>
          <PriceDisplay
            price={_.get(content, 'commodity_price', 0)}
            discount={_.get(content, 'commodity_discount', 1)}
            boxStyle={{ pb: 0 }}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCardItem;
