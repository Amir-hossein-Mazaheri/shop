import React from "react";

import { Box, Grid } from "@mui/material";
import NavbarUserMenu from "./UserMenu";
import CartMenu from "./CartMenu";
import { useAppSelector } from "../../Hooks/store";
import { selectIsLoggedIn } from "../../Store/entities/user";

const RightOptions = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Grid container spacing={3} alignItems="center">
        <Grid item>
          <CartMenu />
        </Grid>
        <Grid item>{isLoggedIn && <NavbarUserMenu />}</Grid>
      </Grid>
    </Box>
  );
};

export default RightOptions;
