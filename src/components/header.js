import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { withRouter } from "react-router-dom";
const lightColor = "rgba(255, 255, 255, 0.7)";

function Header(props) {
  const { history } = props;

  const handleButtonClick = pageURL => {
    history.push(pageURL);
    window.location.reload()
  };

  const handleSignOut = () => () => {
    localStorage.removeItem("access_token")
    window.location.reload()
  }
  // const handleButtonBack = pageURL => {
  //   history.push(pageURL);
  //   window.location.reload()
  // };

  return (
    <React.Fragment>
      <AppBar
        color="primary"
        position="static"
        sx={{ height: "70px" }}
        elevation={0}
      >
        <Toolbar>
          <Grid container spacing={1} alignItems="center" />
          <Tooltip disableHoverListener title={"tab"}>
            <Box sx={{display:'flex', width:'50%', flexGrow:1}}>
              <Button
                variant="contained"
                size="large"
                sx={{ margin: "10px", bgcolor: "#c1c1c1" }}
                onClick={() => handleButtonClick(window.location.pathname == '/' ? "/setting":"/")}
              >
                {window.location.pathname == '/' ? "Setting":"Home"}
              </Button>
              <Button
               variant="contained"
               size="large"
               sx={{ margin: "10px", bgcolor: "#c1c1c1" }}
               onClick={handleSignOut()}
              >
                Sign out
              </Button>
            </Box>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default withRouter(Header);
