import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import BarChartView from "components/widgets/BarChartView";
import ColDrawer from "components/Sidebar/ColDrawer";
import LineChartView from "components/widgets/LineChartView";
import NavBar from "components/NavBar/NavBar";
import Table from "components/widgets/Table";
import uniqueId from "lodash/uniqueId";
import React, { useState } from "react";
import { convertToJson, getExention, randomHSL } from "utils/Common";
import XLSX from "xlsx";

export default function LandingPage() {
  const [colDefs, setColDefs] = useState();
  const [data, setData] = useState();
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
      const heads = headers.map((head) => ({
        title: head,
        field: head,
        id: uniqueId(),
        stroke: randomHSL(),
      }));
      console.log(heads);
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

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavBar />
      {colDefs && colDefs.length && <ColDrawer colDefs={colDefs} />}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <h4 align="left">
          <input type="file" onChange={importExcel} />
        </h4>
        <Table data={data} />
        <BarChartView data={data} />
        <LineChartView data={data} />
      </Box>
    </Box>
  );
}
