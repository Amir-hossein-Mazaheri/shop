import React from "react";

import { AppBar, Container, Toolbar } from "@mui/material";
import Logo from "../Components/Navbar/Logo";
import PagesLinks from "../Components/Navbar/PagesLinks";
import RightOptions from "../Components/Navbar/RightOptions";

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
            }}
          />

          <PagesLinks kind="mobile" />

          <Logo sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }} />

          <PagesLinks kind="desktop" />

          <RightOptions />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
