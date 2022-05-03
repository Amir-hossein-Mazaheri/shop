import React, { useCallback } from "react";

import { Box, Button, Stack, Typography } from "@mui/material";
import IncreaseIcon from "@mui/icons-material/Add";
import DecreaseIcon from "@mui/icons-material/Remove";
import { useAppDispatch } from "../Hooks/store";
import { DECREMENT_OR_INCREMENT_CART_ITEM } from "../Store/entities/cart";

interface ProductCountControlProps {
  currentCount: number;
  productId: number | string;
}

const ProductCountControl: React.FC<ProductCountControlProps> = ({
  productId,
  currentCount,
}) => {
  const dispatch = useAppDispatch();

  const handleIncreaseOrDecreaseProduct = useCallback(
    (amount: number) => {
      dispatch(DECREMENT_OR_INCREMENT_CART_ITEM({ productId, amount }));
    },
    [dispatch, productId]
  );

  return (
    <Box>
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <Button onClick={() => handleIncreaseOrDecreaseProduct(1)}>
          <IncreaseIcon />
        </Button>
        <Typography fontWeight={"semibold"}>{currentCount}</Typography>
        <Button onClick={() => handleIncreaseOrDecreaseProduct(-1)}>
          <DecreaseIcon />
        </Button>
      </Stack>
    </Box>
  );
};

export default ProductCountControl;
