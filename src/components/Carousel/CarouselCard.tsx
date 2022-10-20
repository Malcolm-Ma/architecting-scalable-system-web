/**
 * @file CarouselCard
 * @author Mingze Ma
 */
import Box from "@mui/material/Box";
import React, {useMemo} from "react";
import _ from "lodash";
import Typography from "@mui/material/Typography";
import {Chip} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import PriceDisplay from "src/components/PriceDisplay";

interface CarouselCardProps {
  content: object,
  height: number,
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}

export default function CarouselCard(props: CarouselCardProps) {
  const {content, height, onClick} = props;

  const imageContainerSx = useMemo(() => ({
    backgroundImage: `url(${_.replace(_.get(content, 'commodity_cover'), ' ', '%20')})`,
    // backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: -2,
  }), [content]);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: height + 'px',
        position: 'relative',
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          width: '30%',
          color: '#fff',
          backgroundColor: 'rgba(0,0,0,.4)',
          py: 3,
          px: 2,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h3" sx={{color: 'inherit', py: 2}}>
          {_.get(content, 'commodity_name', 'Unknown')}
        </Typography>
        <Typography variant="body2" sx={{color: 'inherit'}}>
          {_.truncate(_.get(content, 'commodity_introduction', '-'), {length: 100})}
        </Typography>
        <PriceDisplay
          price={_.get(content, 'commodity_price', 0)}
          discount={_.get(content, 'commodity_discount', 1)}
        />
        <Box sx={{pb: 2}}>
          <Chip
            className="commodity-star"
            sx={{color: '#fff', mr: 1}}
            size="small"
            variant="outlined"
            icon={<StarIcon/>}
            label={_.get(content, 'commodity_star', 0) + ' stars'}
          />
          <Chip
            sx={{color: '#fff'}}
            size="small"
            variant="outlined"
            label={
              <span>
                {_.get(content, 'commodity_sold_cnt', 0).toLocaleString()}
                <Typography component="span" variant="body2"> sold</Typography>
              </span>
            }
          />
        </Box>
      </Box>
      <Box
        sx={imageContainerSx}
      />
    </Box>
  );
}
