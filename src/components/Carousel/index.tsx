/**
 * @file Carousel index
 * @author Mingze Ma
 */

import {Carousel as AntCarousel, CarouselProps as AntCarouselProps} from 'antd';
import {useCallback, useEffect} from "react";
import _ from "lodash";
import CarouselCard from "src/components/Carousel/CarouselCard";

import './index.less';
import Container from "@mui/material/Container";
import {useTheme} from "@mui/material";

interface CarouselProps extends AntCarouselProps{
  data: any,
  height: number
}

export default function Carousel(props: CarouselProps) {
  const {data, height, ...carouselProps} = props;

  const theme = useTheme();

  const handleCommodityClick = useCallback((id: string) => {
    window.open('/commodity/' + id);
  }, []);

  useEffect(() => {
    console.log('--data--\n', data);
  }, [data]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        pt: 3,
        pb: 4,
        [theme.breakpoints.up('md')]: {
          pt: 5,
          pb: 6,
          px: 5
        },
        maxWidth: '1152px'
      }}
    >
      <AntCarousel autoplay={true} effect="fade" {...carouselProps}>
        {_.map(data, (item, index) => (
          <CarouselCard
            content={item}
            key={index}
            height={height}
            onClick={() => handleCommodityClick(_.get(item, 'commodity_id'))}
          />
        ))}
      </AntCarousel>
    </Container>
  );
}
