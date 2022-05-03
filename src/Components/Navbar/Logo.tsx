import React from "react";

import { Typography } from "@mui/material";

const Logo: React.FC<{ sx?: object }> = ({ sx }) => {
  return (
    <Typography variant="h6" noWrap component="h1" sx={sx}>
      Bomb Shop
    </Typography>
  );
};

export default Logo;
