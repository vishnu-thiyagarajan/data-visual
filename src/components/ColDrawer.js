import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Column from "components/Column";
import React from "react";

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
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem>
            <ListItemText primary="Columns" />
          </ListItem>
          <Divider />
          {colDefs &&
            colDefs.map((col, index) => (
              <Column key={index} title={col.title} id={col.id} />
            ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default ColDrawer;
