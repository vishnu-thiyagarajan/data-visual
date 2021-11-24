import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import ColDrawer from "components/ColDrawer";
import NavBar from "components/NavBar";
import uniqueId from "lodash/uniqueId";
import MaterialTable from "material-table";
import React, { useState } from "react";
import { useDrop } from "react-dnd";
import XLSX from "xlsx";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import {
  LineChart,
  Line,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

const EXTENSIONS = ["xlsx"];
const randomHSL = () => "hsla(" + ~~(360 * Math.random()) + ",70%,80%,1)";

export default function LandingPage() {
  const [colDefs, setColDefs] = useState();
  const [data, setData] = useState();
  const getExention = (file) => {
    const parts = file.name.split(".");
    const extension = parts[parts.length - 1];
    return EXTENSIONS.includes(extension);
  };

  const convertToJson = (headers, data) => {
    const rows = [];
    data.forEach((row) => {
      let rowData = {};
      row.forEach((element, index) => {
        rowData[headers[index]] = element;
      });
      rows.push(rowData);
    });
    return rows;
  };
  let heads;
  const importExcel = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const bstr = event.target.result;
      const workBook = XLSX.read(bstr, { type: "binary" });
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
      const headers = fileData[0];
      heads = headers.map((head) => ({
        title: head,
        field: head,
        id: uniqueId(),
      }));
      setColDefs(heads);
      fileData.splice(0, 1);
      setData(convertToJson(headers, fileData));
    };

    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file);
      } else {
        alert("Invalid file input, Select Excel file");
      }
    } else {
      setData([]);
      setColDefs([]);
    }
  };

  const [tableCols, setTableCols] = useState([]);
  const [barCols, setBarCols] = useState([]);
  const [lineCols, setLineCols] = useState([]);
  const [{}, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addColToTable(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const [{}, dropBar] = useDrop(() => ({
    accept: "image",
    drop: (item) => addColToBar(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const [{}, dropLine] = useDrop(() => ({
    accept: "image",
    drop: (item) => addColToLine(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const addColToLine = (id) => {
    const itemList = heads.filter((item) => id === item.id);
    setLineCols((cols) => {
      const prevLen = cols.length;
      cols = Array.from(new Set([...cols, itemList[0]]));
      if (prevLen === cols.length)
        alert(`${itemList[0].title} is already added`);
      return cols;
    });
  };
  const addColToBar = (id) => {
    const itemList = heads.filter((item) => id === item.id);
    setBarCols((cols) => {
      const prevLen = cols.length;
      cols = Array.from(new Set([...cols, itemList[0]]));
      if (prevLen === cols.length)
        alert(`${itemList[0].title} is already added`);
      return cols;
    });
  };
  const addColToTable = (id) => {
    const itemList = heads.filter((item) => id === item.id);
    setTableCols((cols) => {
      const prevLen = cols.length;
      cols = Array.from(new Set([...cols, itemList[0]]));
      if (prevLen === cols.length)
        alert(`${itemList[0].title} is already added`);
      return cols;
    });
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavBar />
      <ColDrawer colDefs={colDefs} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <h4 align="left">
          <input type="file" onChange={importExcel} />
        </h4>
        <div ref={drop}>
          <MaterialTable
            title="Table View"
            data={tableCols.length ? data : []}
            columns={tableCols}
          />
        </div>
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
                  dataKey={col.title}
                  fill={randomHSL()}
                  background={{ fill: "#eee" }}
                />
              ))}
          </BarChart>
        </Card>
        <Card ref={dropLine} width="100%" style={{ marginTop: "2rem" }}>
          <Typography style={{ margin: "1.5rem" }} variant="h6">
            Line Chart View
          </Typography>
          <LineChart width={1000} height={500} data={data}>
            <XAxis />
            <YAxis />
            <Legend />
            <CartesianGrid stroke="#eee" strokeDasharray="3 4" />
            {lineCols.length &&
              lineCols.map((col) => (
                <Line
                  type="monotone"
                  dataKey={col.title}
                  stroke={randomHSL()}
                />
              ))}
          </LineChart>
        </Card>
      </Box>
    </Box>
  );
}
