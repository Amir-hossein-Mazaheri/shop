import React from "react";

import { Box, Grid } from "@mui/material";
import ProductCard, { ProductProps } from "./ProductCard";

interface ProductsProps {
  products: ProductProps[];
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  return (
    <Box component={"section"}>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid xs={12} md={4} lg={3} item key={product.id}>
            <ProductCard
              id={product.id}
              title={product.title}
              description={product.description}
              unitPrice={product.unitPrice}
              inventory={product.inventory}
              rate={product.rate}
              inventoryStatus={product.inventoryStatus}
              collections={product.collections}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Products;
