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
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

const lightColor = "rgba(255, 255, 255, 0.7)";

function Header(props) {
  const { onDrawerToggle } = props;

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
          <Tooltip>
            <Button
              variant="contained"
              size="large"
              sx={{ margin: "10px", bgcolor: "#c1c1c1" }}
            >
              Setting
            </Button>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Header;
