import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import "components/Sidebar/sidebar.css";
import React from "react";
import { useDrag } from "react-dnd";

function Column(props) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "column",
    item: props.col,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <ListItem ref={drag} className={isDragging ? "highlightcol" : ""}>
      <ListItemText primary={props.col.name} />
    </ListItem>
  );
}

export default Column;
