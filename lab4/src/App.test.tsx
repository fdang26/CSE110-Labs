import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("Budget tracker", () => {
  test("Create expense", () => {
    render(<App />);

    // Retrieve form input fields and submit button
    const newExpenseNameInput = screen.getByPlaceholderText("Expense name");
    const newExpenseCostInput = screen.getByPlaceholderText("Expense cost");
    const newExpenseSubmit = screen.getByText("Save");

    
    // Fill out the fields for a new expense and enter the form  
    fireEvent.change(newExpenseNameInput, {
      target: { value: "groceries" },
    });
    fireEvent.change(newExpenseCostInput, {
      target: { value: "302" },
    });
    fireEvent.click(newExpenseSubmit);

    const expenseName = screen.getByText("groceries");
    const expenseCost = screen.getByText("$302");
    expect(expenseName).toBeInTheDocument();
    expect(expenseCost).toBeInTheDocument();

    expect(screen.getByTestId("groceries")).toBeInTheDocument();
    expect(screen.getByTestId("Budget")).toHaveTextContent("Budget: $2000");
    expect(screen.getByTestId("Remaining")).toHaveTextContent(
      "Remaining: $1698"
    );
    expect(screen.getByTestId("Total")).toHaveTextContent("Spent so far: $302");
  });

  test("delete expense", () => {
    render(<App />);
    
    // Retrieve form input fields and submit button
    const newExpenseNameInput = screen.getByPlaceholderText("Expense name");
    const newExpenseCostInput = screen.getByPlaceholderText("Expense cost");
    const newExpenseSubmit = screen.getByText("Save");
    
    // Fill out the fields for a new expense and enter the form
    fireEvent.change(newExpenseNameInput, {
      target: { value: "groceries" },
    });
    fireEvent.change(newExpenseCostInput, {
      target: { value: "302" },
    });
    fireEvent.click(newExpenseSubmit);

    const expenseName = screen.getByText("groceries");
    const expenseCost = screen.getByText("$302");

    expect(expenseName).toBeInTheDocument();
    expect(expenseCost).toBeInTheDocument();

    const deleteButton = screen.getByTestId("groceriesX");
    fireEvent.click(deleteButton);

    expect(expenseName).not.toBeInTheDocument();
    expect(expenseCost).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();

    expect(screen.getByTestId("Budget")).toHaveTextContent("Budget: $2000");
    expect(screen.getByTestId("Remaining")).toHaveTextContent(
      "Remaining: $2000"
    );
    expect(screen.getByTestId("Total")).toHaveTextContent("Spent so far: $0");
  });

  test("budget balance verification", () => {
    render(<App />)

    // Retrieve form input fields and submit button
    const newExpenseNameInput = screen.getByPlaceholderText("Expense name");
    const newExpenseCostInput = screen.getByPlaceholderText("Expense cost");
    const newExpenseSubmit = screen.getByText("Save");

    expect(screen.getByTestId("Budget")).toHaveTextContent("Budget: $2000");
    expect(screen.getByTestId("Remaining")).toHaveTextContent(
      "Remaining: $2000"
    );
    expect(screen.getByTestId("Total")).toHaveTextContent("Spent so far: $0");
    
// Fill out the fields for a new expense and enter the form
    fireEvent.change(newExpenseNameInput, {
      target: { value: "groceries" },
    });
    fireEvent.change(newExpenseCostInput, {
      target: { value: "302" },
    });
    fireEvent.click(newExpenseSubmit);
    
    expect(screen.getByTestId("Budget")).toHaveTextContent("Budget: $2000");
    expect(screen.getByTestId("Remaining")).toHaveTextContent(
      "Remaining: $1698"
    );
    expect(screen.getByTestId("Total")).toHaveTextContent("Spent so far: $302");
    
    fireEvent.change(newExpenseNameInput, {
      target: { value: "batteries" },
    });
    fireEvent.change(newExpenseCostInput, {
      target: { value: "98" },
    });
    fireEvent.click(newExpenseSubmit);

    expect(screen.getByTestId("Budget")).toHaveTextContent("Budget: $2000");
    expect(screen.getByTestId("Remaining")).toHaveTextContent(
      "Remaining: $1600"
    );
    expect(screen.getByTestId("Total")).toHaveTextContent("Spent so far: $400");

    fireEvent.click(screen.getByTestId("batteriesX"));
    
    expect(screen.getByTestId("Budget")).toHaveTextContent("Budget: $2000");
    expect(screen.getByTestId("Remaining")).toHaveTextContent(
      "Remaining: $1698"
    );
    expect(screen.getByTestId("Total")).toHaveTextContent("Spent so far: $302");
    
    fireEvent.click(screen.getByTestId("groceriesX"));

    expect(screen.getByTestId("Budget")).toHaveTextContent("Budget: $2000");
    expect(screen.getByTestId("Remaining")).toHaveTextContent(
      "Remaining: $2000"
    );
    expect(screen.getByTestId("Total")).toHaveTextContent("Spent so far: $0");
  });
});

