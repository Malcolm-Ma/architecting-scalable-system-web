/**
 * @file produt sales and star over chip
 * @author Mingze Ma
 */
import React from "react";
import {Chip, SxProps} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import './index.less';

interface OverviewChipProps {
  star: number,
  sold: number,
  boxStyle?: SxProps,
  chipStyle?: SxProps,
  starColor?: string
}

const OverviewChip: React.FC<OverviewChipProps> = (props) => {
  const {star = 0, sold = 0, boxStyle, chipStyle, starColor} = props;

  return (
    <Box sx={{pb: 2, ...boxStyle}}>
      <Chip
        sx={{mr: 1, ...chipStyle}}
        size="small"
        variant="outlined"
        icon={<StarIcon style={{color: starColor}}/>}
        label={
          <span><b>{star}</b><Typography sx={{color: starColor}} component="span" variant="body2"> stars</Typography></span>
        }
      />
      <Chip
        sx={{...chipStyle}}
        size="small"
        variant="outlined"
        label={
          <span>
            <b>{sold.toLocaleString()}</b>
            <Typography component="span" variant="body2" sx={{color: starColor}}> enrolled</Typography>
          </span>
        }
      />
    </Box>
  );
};

export default OverviewChip;
