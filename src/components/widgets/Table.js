import MaterialTable from "material-table";
import React, { useState, useEffect } from "react";
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
      <MaterialTable
        title="Table View"
        data={tableCols.length ? data : []}
        columns={tableCols}
      />
    </div>
  );
}

export default Table;
