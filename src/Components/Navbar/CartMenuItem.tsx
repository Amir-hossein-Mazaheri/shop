import React from "react";

import { TableCell, TableRow } from "@mui/material";
import { CartItem as CartMenuItemProps } from "../../Store/entities/cart";
import ProductCountControl from "../ProductCountControl";

const CartMenuItem: React.FC<CartMenuItemProps> = ({
  id,
  title,
  unitPrice,
  totalPrice,
  count,
}) => {
  return (
    <TableRow>
      <TableCell align="center">{title}</TableCell>
      <TableCell align="center">{unitPrice}</TableCell>
      <TableCell align="center">{totalPrice}</TableCell>
      <TableCell align="center">
        <ProductCountControl productId={id} currentCount={count} />
      </TableCell>
    </TableRow>
  );
};

export default CartMenuItem;
