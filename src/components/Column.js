import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { useDrag } from "react-dnd";

function Column({ id, title }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <ListItem
      ref={drag}
      style={{ border: isDragging ? "5px solid pink" : "0px" }}
    >
      <ListItemText primary={title} />
    </ListItem>
  );
}

export default Column;
