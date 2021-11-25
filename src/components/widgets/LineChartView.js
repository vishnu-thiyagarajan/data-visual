import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { addCol, drop } from "utils/Common";

function LineChartView({ data }) {
  useEffect(() => {
    setLineCols([]);
  }, [data]);
  const [lineCols, setLineCols] = useState([]);
  const addColToLine = addCol(setLineCols);
  // eslint-disable-next-line no-unused-vars
  const [collectedProps, dropLine] = useDrop(drop(addColToLine));
  return (
    <Card
      ref={dropLine}
      width="100%"
      style={{ marginTop: "2rem" }}
      elevation={10}
    >
      <Typography style={{ margin: "1.5rem" }} variant="h6">
        Line Chart View
      </Typography>
      <LineChart width={1000} height={400} data={data} LineSize={100}>
        <XAxis />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#eee" strokeDasharray="3 4" />
        {lineCols.length &&
          lineCols.map((col) => (
            <Line
              key={col.id}
              type="monotone"
              dataKey={col.name}
              stroke={col.stroke}
              strokeWidth={3}
            />
          ))}
      </LineChart>
    </Card>
  );
}

export default LineChartView;
