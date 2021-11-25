export const EXTENSIONS = ["xlsx", "xls"];

export const randomHSL = () =>
  "hsla(" + ~~(360 * Math.random()) + ",70%,80%,1)";
export const getExention = (file) => {
  const parts = file.name.split(".");
  const extension = parts[parts.length - 1];
  return EXTENSIONS.includes(extension);
};

export const convertToJson = (headers, data) => {
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

export const addCol = (setterFunc) => {
  return (column) => {
    setterFunc((cols) => {
      const prevLen = cols.length;
      cols = Array.from(new Set([...cols, column]));
      if (prevLen === cols.length) alert(`${column.title} is already added`);
      return cols;
    });
  };
};

export const drop = (addColFunc) => {
  return () => ({
    accept: "column",
    drop: (item) => addColFunc(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
};
