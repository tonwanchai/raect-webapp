import * as React from "react";
import AppBar from "@mui/material/AppBar";
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
import { withRouter } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

const lightColor = "rgba(255, 255, 255, 0.7)";

function Header(props) {
  const { history } = props;
  const checkResponsive = useMediaQuery("(min-width:900px)");
  const pages = ["Products", "Pricing", "Blog"];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleButtonClick = (pageURL) => {
    setAnchorElNav(null);
    history.push(pageURL);
    window.location.reload();
  };

  const handleSignOut = () => () => {
    localStorage.removeItem("access_token");
    window.location.reload();
  };
  // const handleButtonBack = pageURL => {
  //   history.push(pageURL);
  //   window.location.reload()
  // };

  return (
    <React.Fragment>
      <AppBar
        color="primary"
        sx={{ height: "70px", bgcolor: "#75582B" }}
        position="static"
        elevation={0}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {checkResponsive && (
              <img
                src="./images/Icon.png"
                alt="icon"
                width={56}
                height={56}
                style={{
                  display: { xs: "none", md: "flex" },
                  mr: 1,
                  marginTop: "-10px",
                }}
              />
            )}
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "kanit",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                marginLeft: "10px",
              }}
            >
              FRUIT
            </Typography>

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
                <MenuItem key={"setting"} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    fontSize={20}
                    onClick={() =>
                      handleButtonClick(
                        window.location.pathname == "/" ? "/setting" : "/"
                      )
                    }
                  >
                    {window.location.pathname == "/" ? "Setting" : "Home"}
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
            {!checkResponsive && (
              <img
                src="./images/Icon.png"
                alt="icon"
                width={56}
                height={56}
                style={{
                  display: { xs: "flex", md: "none" },
                  mr: 1,
                  marginTop: "4px",
                }}
              />
            )}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                marginLeft: "10px",
              }}
            >
              FRUIT
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                key={11}
                onClick={() =>
                  handleButtonClick(
                    window.location.pathname == "/" ? "/setting" : "/"
                  )
                }
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Typography variant="a" fontSize={20}>
                  {window.location.pathname == "/" ? "Setting" : "Home"}
                </Typography>
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip disableHoverListener title="Open settings">
                <Typography
                  fontSize={20}
                  sx={{ cursor: "pointer", marginBottom: '3px'}}
                  onClick={handleSignOut()}
                >
                  Sign out
                </Typography>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  );
}

export default withRouter(Header);
