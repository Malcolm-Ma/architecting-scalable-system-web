/**
 * @file CarouselCard
 * @author Mingze Ma
 */
import Box from "@mui/material/Box";
import {useMemo} from "react";
import _ from "lodash";
import Typography from "@mui/material/Typography";

interface CarouselCardProps {
  content: object,
  height: number
}

export default function CarouselCard(props: CarouselCardProps) {
  const {content, height} = props;

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
    <Box sx={{display: 'flex', width: '100%', height: height + 'px', position: 'relative'}}>
      <Box sx={{color: '#fff'}}>
        <Typography variant="h5" sx={{color: 'inherit'}}>
          {_.get(content, 'commodity_name')}
        </Typography>
      </Box>
      <Box
        sx={imageContainerSx}
      />
    </Box>
  );
}
