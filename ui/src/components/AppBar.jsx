import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
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
import DialogSelect from "./Dialog";

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
  {
    button: "Add",
  },
];

function AppBar() {
  const theme = useTheme()
  const location = useLocation()
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [open, setOpen] = useState(false);

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

  const getNavProps = page =>
    page.link
      ? { to: page.link }
      : {
          onClick: evt => {
            evt.preventDefault();
            setOpen(true);
          },
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
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Portal
            </Typography>
          </Link>
          <DialogSelect open={open} setOpen={setOpen} />

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
                <MenuItem key={page.button} onClick={handleCloseNavMenu}>
                  <Link {...getNavProps(page)}>
                    <Typography
                      textAlign="center"
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
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Portal
            </Typography>
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              marginX: "5rem",
              justifyContent: "flex-start",
            }}
          >
            {pages.map(page => (
              <Link to={page.link} key={page.button} style={{
                // This is a bit of a hack because we're not using the tabs component from material UI
                borderBottom: page.link === location.pathname ? `2px solid ${theme.palette.secondary.main}` : 'none'
              }}>
                {/* <Link {...getNavProps(page)} key={page.button}> */}
                <Button
                  key={page.button}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    mx: 2,
                    color: theme.palette.secondary.main,
                    display: "block",
                    fontSize: "1.1rem",
                    textTransform: "none",
                  }}
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
          </Box>
        </Toolbar>
      </Container>
    </_AppBar>
  );
}
export default AppBar;
