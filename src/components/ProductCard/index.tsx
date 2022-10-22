/**
 * @file Product card index
 * @author Mingze Ma
 */
import React, {useCallback} from "react";
import Container from "@mui/material/Container";
import _ from "lodash";
import ProductCardItem from "src/components/ProductCard/ProductCardItem";
import {Grid} from "@mui/material";

interface ProductCardProps {
  data: any[],
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const {data} = props;

  const handleCommodityDetail = useCallback((id: string) => {
    window.open('/commodity/' + id);
  }, []);

  return (
    <Container>
      <Grid container spacing={3}>
        {_.map(data, (item, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={6}
            md={4}
          >
            <ProductCardItem content={item} onClick={() => handleCommodityDetail(_.get(item, 'commodity_id', '#'))}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ProductCard;
