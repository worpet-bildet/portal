import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import _AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import {
  CuratorPageButtons,
  DeveloperPageButtons,
  UserPageButtons,
} from "../constants/sidebarButtons";

const pages = [
  {
    button: "Applications",
    link: "/apps/portal/",
  },
  {
    button: "Curators",
    link: "/apps/portal/usr/curs",
  },
  {
    button: "Groups",
    link: "/apps/portal/usr/groups",
  },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function AppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <_AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Link to="/apps/portal/usr">
            <Typography
              variant="h6"
              noWrap
              // component="a"
              // href="/apps/portal/usr"
              // className="w-full ml-3 font-basis text-lg"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Portal L
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
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
              {pages.map(page => (
                <MenuItem
                  key={page.button}
                  onClick={handleCloseNavMenu}
                  // className="w-56 p-1 border border-black text-gray-900 bg-white dark:text-white hover:border-2 hover:font-semibold dark:hover:bg-gray-700"
                  // className="w-full ml-3 font-basis text-lg"
                >
                  <Link to={page.link}>
                    <Typography
                      textAlign="center"
                      fontFamily={"monospace"}
                      // fontSize={"1.1rem"}
                      // className="w-full ml-3 font-basis text-lg"
                    >
                      {page.button}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Link to="/apps/portal/usr">
            <Typography
              variant="h5"
              noWrap
              // component="a"
              // href="/apps/portal/usr"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Portal M
            </Typography>
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              marginX: "5rem",
              justifyContent: "flex-start",
              // justifyContent: "normal",
              // justifyContent: "space-evenly",
              // justifyContent: "center",
            }}
          >
            {pages.map(page => (
              <Link to={page.link} key={page.button}>
                <Button
                  // this is the large view
                  key={page.button}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    mx: 2,
                    color: "white",
                    display: "block",
                    fontFamily: "monospace",
                    fontSize: "1.1rem",
                    textTransform: "none",
                  }}
                  // className="w-56 p-1 border border-black text-gray-900 bg-white dark:text-white hover:border-2 hover:font-semibold dark:hover:bg-gray-700"
                  // className="w-full ml-3 font-basis text-lg"
                >
                  {page.button}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
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
              {settings.map(setting => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </_AppBar>
  );
}
export default AppBar;
