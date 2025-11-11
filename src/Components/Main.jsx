import React, { useState } from "react";
import { Form } from "./Form";
import { Table } from "./Table";
import TableData from "../assets/TableData";
import { useLocalStorage } from "../Hooks/useLocalStorage";

function Main() {
  const [tableData, setTableData] = useLocalStorage("tableData",TableData);
  const [expense, setExpense] = useLocalStorage("expense",{
    title: "",
    category: "",
    amount: "",
  });
  const [editingRow , setEditingRow] = useLocalStorage('editingRow','')

  return (
    <>
      <main>
        <h1>Track Your Expense</h1>
        <div className="expense-tracker">
          <Form
            setTableData={setTableData}
            setExpense={setExpense}
            expense={expense}
            editingRow={editingRow}
            setEditingRow={setEditingRow}
          />
          <Table
            tableData={tableData}
            setTableData={setTableData}
            setExpense={setExpense}
            setEditingRow={setEditingRow}
          />
        </div>
      </main>
    </>
  );
}

export default Main;
