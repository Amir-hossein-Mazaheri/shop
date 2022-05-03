import React, { MouseEvent, useCallback, useMemo, useState } from "react";

import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

interface PagesLinksProps {
  kind: "desktop" | "mobile";
}

const PagesLinks: React.FC<PagesLinksProps> = ({ kind }) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  }, []);

  const handleCloseNavMenu = useCallback(() => {
    setAnchorElNav(null);
  }, []);

  const pages = useMemo<Navbar.Item[]>(() => {
    return [
      {
        id: 1,
        text: "Products",
        to: "/products",
      },
      {
        id: 2,
        text: "Hot Offers",
        to: "/hot-offers",
      },
      {
        id: 3,
        text: "Contact Us",
        to: "/contact-us",
      },
    ];
  }, []);

  if (kind === "desktop") {
    return (
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          <Button
            key={page.id}
            onClick={handleCloseNavMenu}
            sx={{
              my: 2,
              color: "white",
              display: "block",
              textTransform: "capitalize",
              fontSize: "1rem",
            }}
          >
            <Link to={page.to}>{page.text}</Link>
          </Button>
        ))}
      </Box>
    );
  } else {
    return (
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="navbar-pages-links"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {pages.map((page) => (
            <MenuItem key={page.id} onClick={handleCloseNavMenu}>
              <Link to={page.to}>
                <Typography>{page.text}</Typography>
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    );
  }
};

export default PagesLinks;
