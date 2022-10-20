/**
 * @file PriceDisplay
 * @author Mingze Ma
 */
import {BoxProps, TypographyProps} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {red} from "@mui/material/colors";
import {useMemo} from "react";
import _ from "lodash";

interface PriceDisplayProps {
  price: number,
  discount?: number | null | undefined,
  boxProps?: BoxProps,
  priceProps?: TypographyProps,
  discountProps?: TypographyProps,
}

export default function PriceDisplay(props: PriceDisplayProps) {
  const {price = 0, discount, boxProps, priceProps, discountProps} = props;

  const validDiscount = useMemo(() => (_.isNumber(discount) && discount > 0 && discount < 1), [discount]);

  const currentPrice = useMemo(() => {
    if (validDiscount && typeof discount == "number") {
      return _.floor(price * discount, 2);
    }
    return price;
  }, [discount, price, validDiscount]);

  return(
    <Box
      sx={{py: 2, display: 'flex'}}
      {...boxProps}
    >
      <Typography
        color={validDiscount ? red[500] : 'inherit'}
        variant="body1"
        sx={{ pr: 1 }}
        {...priceProps}
      >
        ${currentPrice}
      </Typography>
      {validDiscount && <Typography
        variant="body1"
        {...discountProps}
      >
        <s>${_.floor(price, 2)}</s>
      </Typography>}
    </Box>
  );
}
