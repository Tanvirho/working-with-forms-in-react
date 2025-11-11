import React from "react";

export const ContextMenu = ({
  menuPosition,
  setMenuPosition,
  setTableData,
  rowId,
  setExpense,
  tableData,
  setEditingRow,
}) => {
  if (!menuPosition.left) return;
  return (
    <div className="context-menu" style={{ ...menuPosition }}>
      <div
        onClick={() => {
          const { title, category, amount } = tableData.find(
            (e) => e.id === rowId
          );
          setEditingRow(rowId);
          setExpense({ title, category, amount });
          setMenuPosition({});
        }}
      >
        Edit
      </div>
      <div
        onClick={() => {
          setMenuPosition({});
          setTableData((prevState) =>
            prevState.filter((tableData) => tableData.id !== rowId)
          );
        }}
      >
        Delete
      </div>
    </div>
  );
};
