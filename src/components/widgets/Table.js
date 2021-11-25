import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { addCol, drop } from "utils/Common";

function Table({ data }) {
  const [tableCols, setTableCols] = useState([]);
  const addColToTable = addCol(setTableCols);
  // eslint-disable-next-line no-unused-vars
  const [collectedProps, dropTable] = useDrop(drop(addColToTable));
  useEffect(() => {
    setTableCols([]);
  }, [data]);
  return (
    <div ref={dropTable}>
      <MUIDataTable
        title="Table View"
        data={tableCols.length ? data : []}
        columns={tableCols}
        options={{
          filter: true,
          sort: true,
          selectableRows: "none",
        }}
      />
    </div>
  );
}

export default Table;
