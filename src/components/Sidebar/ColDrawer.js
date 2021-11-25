import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Column from "components/Sidebar/Column";
import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

const drawerWidth = 240;

function ColDrawer({ colDefs }) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Scrollbars style={{ width: "100%", height: "100%" }}>
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem>
              <ListItemText
                disableTypography
                primary={
                  <Typography variant="h4" color="primary">
                    Columns
                  </Typography>
                }
              />
            </ListItem>
            <Divider />
            {colDefs && colDefs.map((col) => <Column key={col.id} col={col} />)}
          </List>
        </Box>
      </Scrollbars>
    </Drawer>
  );
}

export default ColDrawer;
