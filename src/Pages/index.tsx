import React from "react";

import { Box, Container } from "@mui/material";
import Products from "../Components/Products";
import { ProductProps } from "../Components/ProductCard";

const products: ProductProps[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
].map((n) => ({
  id: n,
  title: "Some random shit " + Math.floor(Math.random() * n * 100),
  // language=HTML
  description:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores, corporis eum fuga inventore iste maiores minima unde? A, amet deleniti fugit molestiae necessitatibus nihil quae quia suscipit temporibus vel. Assumenda beatae est et eveniet fugiat illo ipsum labore maxime provident quae, quis sit, sunt tempore ullam veritatis vero voluptas?",
  unitPrice: 15,
  inventory: 2,
  rate: n,
  inventoryStatus: n % 2 ? "S" : "O",
  collections: [
    {
      id: Math.floor(Math.random() * 100),
      title: "Headphones",
    },
  ],
}));

const HomePage: React.FC = () => {
  return (
    <Container maxWidth={"xl"} sx={{ py: 6 }}>
      <Box>
        <Products products={products} />
      </Box>
    </Container>
  );
};

export default HomePage;
