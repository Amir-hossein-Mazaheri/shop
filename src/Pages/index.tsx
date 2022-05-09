import React from "react";

import { useQuery } from "react-query";
import { Box, Container, styled } from "@mui/material";
import { SwiperSlide, Swiper } from "swiper/react";
import Products from "../Components/Products";
import useSlider from "../Hooks/useSlider";
import { fetchProducts } from "../Api/fetchProducts";
import Loading from "../Common/Loading";

const ProductSlide = styled("div")(() => ({
  height: 450,
  maxWidth: "100%",
  position: "relative",

  "& > img": {
    transform: "rotate(-10)",
  },
}));

const HomePage: React.FC = () => {
  const {
    isLoading,
    isError,
    data: products,
  } = useQuery("products", fetchProducts);

  const [options] = useSlider({
    direction: "horizontal",
    delay: 1800,
    hasPagination: true,
    hasNavigation: true,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p>An Error Happened</p>;
  }

  return (
    <Box sx={{ py: 6 }}>
      <Box sx={{ width: "100%", minHeight: 400 }}>
        <Swiper {...options}>
          <SwiperSlide>
            <ProductSlide>Something with 1</ProductSlide>
          </SwiperSlide>
          <SwiperSlide>
            <ProductSlide>Something with 2</ProductSlide>
          </SwiperSlide>
          <SwiperSlide>
            <ProductSlide>Something with 3</ProductSlide>
          </SwiperSlide>
        </Swiper>
      </Box>
      <Container maxWidth={"xl"} sx={{ py: 4 }}>
        <Box>
          <Products products={products as any} />
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
