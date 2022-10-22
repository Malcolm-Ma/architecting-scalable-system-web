/**
 * @file commodity brief
 * @author Mingze Ma
 */
import React, {useEffect} from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {useTheme} from "@mui/material";
import {convertToRGB} from "src/util/HexToRgb";

interface CommodityBriefProps {
  data: any,
}

const CommodityBrief: React.FC<CommodityBriefProps> = (props) => {
  const {} = props;

  const theme = useTheme();

  useEffect(() => {
    console.log('--theme--\n', theme);
  }, []);
  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(90deg, ${convertToRGB(theme.palette.primary[800])}, ${convertToRGB(theme.palette.primary.main)})`,
      }}
    >
      <Container maxWidth="xl" sx={{minHeight: '250px'}}>

      </Container>
    </Box>
  );
};

export default CommodityBrief;
