import React, { useCallback, useMemo, useState } from "react";

import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../Hooks/store";
import { selectImageURL } from "../../Store/entities/user";

const NavbarUserMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const imageURL = useAppSelector(selectImageURL);

  const logout = useCallback<React.MouseEventHandler>(
    (event: React.MouseEvent<HTMLDivElement>) => {
      console.log(event);
    },
    []
  );

  const handleOpenUserMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    },
    []
  );

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const settings = useMemo<Navbar.Item[]>(() => {
    return [
      {
        id: 1,
        text: "Profile",
        to: "/profile",
      },
      {
        id: 2,
        text: "Logout",
        to: "",
        action: logout,
      },
    ];
  }, [logout]);

  return (
    <Box>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar src={imageURL} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="navbar-user-menu"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
            <div onClick={setting.action}>
              <Typography textAlign="center">
                <Link to={setting.to}>{setting.text}</Link>
              </Typography>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default NavbarUserMenu;
