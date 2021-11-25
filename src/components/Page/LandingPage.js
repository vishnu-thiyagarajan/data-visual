import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Stack from "@mui/material/Stack";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import NavBar from "components/NavBar/NavBar";
import ColDrawer from "components/Sidebar/ColDrawer";
import BarChartView from "components/widgets/BarChartView";
import LineChartView from "components/widgets/LineChartView";
import Table from "components/widgets/Table";
import uniqueId from "lodash/uniqueId";
import React, { useState } from "react";
import { convertToJson, getExention, randomHSL } from "utils/Common";
import XLSX from "xlsx";

const Input = styled("input")({
  display: "none",
});

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
        name: head,
        field: head,
        id: uniqueId(),
        stroke: randomHSL(),
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

  return (
    <Box sx={{ display: "flex" }} bgcolor="primary.light">
      <CssBaseline />
      <NavBar />
      {colDefs && colDefs.length && <ColDrawer colDefs={colDefs} />}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Stack spacing={8} direction="row">
          <label htmlFor="button-file">
            <Input id="button-file" onChange={importExcel} type="file" />
            <Button
              variant="contained"
              color="success"
              startIcon={<FileUploadIcon />}
              component="span"
            >
              Upload Excel
            </Button>
          </label>
          <a
            id="sample-file"
            href="https://github.com/vishnu-thiyagarajan/data-visual/raw/main/public/Sample_Data.xlsx"
            download
          >
            <Button
              variant="contained"
              color="success"
              startIcon={<FileDownloadIcon />}
            >
              Sample Excel
            </Button>
          </a>
        </Stack>
        <hr />
        <Table data={data} />
        <BarChartView data={data} />
        <LineChartView data={data} />
      </Box>
    </Box>
  );
}
