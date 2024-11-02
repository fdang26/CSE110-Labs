import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const ExpenseTotal = () => {
  const expensesContext = useContext(AppContext);

  const totalExpenses = expensesContext.expenses.reduce((total, item) => {
    return (total = total + item.cost);
  }, 0);

  return (
    <div className="alert alert-primary">
      <span data-testid="Total">Spent so far: ${totalExpenses}</span>
    </div>
  );
};

export default ExpenseTotal;