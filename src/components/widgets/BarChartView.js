import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { addCol, drop } from "utils/Common";

function BarChartView({ data }) {
  useEffect(() => {
    setBarCols([]);
  }, [data]);
  const [barCols, setBarCols] = useState([]);
  const addColToBar = addCol(setBarCols);
  // eslint-disable-next-line no-unused-vars
  const [collectedProps, dropBar] = useDrop(drop(addColToBar));
  return (
    <Card ref={dropBar} width="100%" style={{ marginTop: "2rem" }}>
      <Typography style={{ margin: "1.5rem" }} variant="h6">
        Bar Chart View
      </Typography>
      <BarChart width={1000} height={400} data={data} barSize={100}>
        <XAxis />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 4" />
        {barCols.length &&
          barCols.map((col) => (
            <Bar
              key={col.id}
              dataKey={col.title}
              fill={col.stroke}
              background={{ fill: "#eee" }}
            />
          ))}
      </BarChart>
    </Card>
  );
}

export default BarChartView;
