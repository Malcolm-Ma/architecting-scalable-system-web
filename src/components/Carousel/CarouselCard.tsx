/**
 * @file CarouselCard
 * @author Mingze Ma
 */
import Box from "@mui/material/Box";
import React, {useMemo} from "react";
import _ from "lodash";
import Typography from "@mui/material/Typography";
import PriceDisplay from "src/components/PriceDisplay";
import OverviewChip from "src/components/OverviewChip";
import {useTheme} from "@mui/material";

interface CarouselCardProps {
  content: object,
  height: number,
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}

export default function CarouselCard(props: CarouselCardProps) {
  const {content, height, onClick} = props;

  const theme = useTheme()

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
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
          height: `calc(${height}px - 200px)`,
        }
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
          [theme.breakpoints.down('sm')]: {
            width: '100%',
            backgroundColor: 'rgba(0,0,0,.5)',
          }
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
        <OverviewChip
          star={_.get(content, 'commodity_star', 0)}
          sold={_.get(content, 'commodity_sold_cnt', 0)}
          chipStyle={{ color: '#fff', mr: 1 }}
          starColor="#fff"
        />
      </Box>
      <Box
        sx={imageContainerSx}
      />
    </Box>
  );
}
