import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";
const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
  const context = useContext(AppContext);

  // Exercise: Create name and cost to state variables
  const [nameInput, setNameInput] = useState("");
  const [costInput, setCostInput] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newExpense: Expense = {
      id: (context.expenses.length + 1).toString(),
      name: nameInput,
      cost: parseInt(costInput),
    };

    const expenseList = [...context.expenses, newExpense];
    // Exercise: Add add new expense to expenses context array
    context.setExpenses(expenseList);
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={nameInput}
            placeholder="Expense name"
            onChange={(e) => setNameInput(e.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            value={costInput}
            placeholder="Expense cost"
            onChange={(e) => setCostInput(e.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;