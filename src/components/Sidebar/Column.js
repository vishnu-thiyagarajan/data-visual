import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
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
    <ListItem
      ref={drag}
      style={{ border: isDragging ? "5px solid pink" : "0px" }}
    >
      <ListItemText primary={props.col.title} />
    </ListItem>
  );
}

export default Column;
