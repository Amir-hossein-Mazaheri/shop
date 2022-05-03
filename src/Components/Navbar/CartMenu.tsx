import React, { useCallback, useState } from "react";

import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import CartIcon from "@mui/icons-material/ShoppingCart";
import EmptyCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useAppSelector } from "../../Hooks/store";
import CartMenuItem from "./CartMenuItem";
import { selectCartItems } from "../../Store/entities/cart";

const CartMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const cartItems = useAppSelector(selectCartItems);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  return (
    <Box>
      <Tooltip title="Shopping Cart">
        <IconButton onClick={handleMenuOpen} color="inherit">
          <CartIcon />
        </IconButton>
      </Tooltip>
      <TableContainer
        component={Menu}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        id="navbar-cart-menu"
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Product</TableCell>
              <TableCell align="center">Unit Price</TableCell>
              <TableCell align="center">Total Price</TableCell>
              <TableCell align="center">QTY</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartMenuItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  count={item.count}
                  unitPrice={item.unitPrice}
                  totalPrice={item.totalPrice}
                />
              ))
            ) : (
              <MenuItem>
                <Typography fontWeight={"bold"} variant="body1" component="p">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <EmptyCartIcon />
                    <span>No items added so far.</span>
                  </Stack>
                </Typography>
              </MenuItem>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CartMenu;
