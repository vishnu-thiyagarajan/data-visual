import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";

function NavBar() {
  return (
    <AppBar
      color="primary"
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Import Data from excel
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
