import React, { useState } from "react";
import Input from "./Input";
import { SelectInput } from "./SelectInput";

export const Form = ({
  setTableData,
  setExpense,
  expense,
  editingRow,
  setEditingRow,
}) => {
  // const [title , setTitle] = useState('')
  // const [category , setCategory] = useState('')
  // const [amount , setAmount] = useState('')

  const FormHandler = (e) => {
    e.preventDefault();

    const validateData = validate(expense);
    if (Object.keys(validateData).length) return;
    // const expense = {title , category , amount}
    if (editingRow) {
      setTableData((prevState) =>
        prevState.map((prevData) => {
          if (prevData.id === editingRow) {
            return { ...expense, id: editingRow };
          }
          return prevData;
        })
      );
      setEditingRow("");
      setExpense({
        title: "",
        category: "",
        amount: "",
      });
      return;
    }
    setTableData((prevState) => [
      ...prevState,
      { ...expense, id: crypto.randomUUID() },
    ]);

    setExpense({
      title: "",
      category: "",
      amount: "",
    });
    // another way
    // const expense = {...getFormData(e.target) , id: crypto.randomUUID()}
    // setTableData((prevState)=> [...prevState , expense])

    // e.target.reset()
  };

  // const getFormData = (form) =>{
  //     const formData = new FormData(form)
  //     const data = {}
  //     for (const [key , value] of formData.entries()) {
  //         data[key] = value
  //     }
  //     return data
  // }

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setExpense((prevState) => ({ ...prevState, [name]: value }));
    setErrors({});
  };

  const [errors, setErrors] = useState({});

  const validationConfig = {
    title: [
      { required: true, message: "Please enter title" },
      { minLength: 2, message: "Title should be at least 2 characters" },
    ],
    category: [{ required: true, message: "Please select category" }],
    amount: [
      { required: true, message: "Please enter an amount" },
      { pattern: /^[1-9]\d*(\.\d+)?$/, message: "Please enter a valid number " }
    ],
  };
  const validate = (formData) => {
    const errorsData = {};

    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorsData[key] = rule.message;
          return true;
        }
        if (rule.minLength && value.length < rule.minLength) {
          errorsData[key] = rule.message;
          return true;
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          errorsData[key] = rule.message;
          return true;
        }
      });
    });

    // if (!formData.title) {
    //   errorsData.title = "Title is required";
    // }
    // if (!formData.category) {
    //   errorsData.category = "Please selected Category";
    // }
    // if (!formData.amount) {
    //   errorsData.amount = "Amount is required";
    // }
    setErrors(errorsData);
    return errorsData;
  };

  return (
    <>
      <form className="expense-form" onSubmit={FormHandler}>
        {/* <div className="input-container">
                    <label htmlFor="title">Title</label>
                    <input id="title" name="title" value={expense.title} onChange={changeHandler} />
                    <p className='error'>{errors.title}</p>
                </div> */}
        <Input
          label="Title"
          id="title"
          name="title"
          error={errors.title}
          value={expense.title}
          onChange={changeHandler}
        />
        {/* <div className="input-container">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={expense.category}
            onChange={changeHandler}
          >
            <option hidden>Select Category</option>
            <option value="Grocery">Grocery</option>
            <option value="Clothes">Clothes</option>
            <option value="Bills">Bills</option>
            <option value="Education">Education</option>
            <option value="Medicine">Medicine</option>
          </select>
          <p className="error">{errors.category}</p>
        </div> */}
        <SelectInput
          label="Category"
          id="category"
          name="category"
          value={expense.category}
          onChange={changeHandler}
          error={errors.category}
          defaultOption="Select Category"
          options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
        />
        {/* <div className="input-container">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={expense.amount}
            onChange={changeHandler}
          />
          <p className="error">{errors.amount}</p>
        </div> */}
        <Input
          label="Amount"
          id="amount"
          name="amount"
          error={errors.amount}
          value={expense.amount}
          onChange={changeHandler}
        />
        <button className="add-btn">{editingRow ? "Save" : "Add"}</button>
      </form>
    </>
  );
};
