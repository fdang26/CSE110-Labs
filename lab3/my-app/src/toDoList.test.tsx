import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { dummyGroceryList } from "./constants";

describe("to do list", () => {
    test("initial list generation", () => {
        render(<ToDoList />)

        dummyGroceryList.forEach((element) =>
            expect(screen.getByText(element.name)).toBeInTheDocument
          );
    });
    
    test("title updating when number of checked item changes", () => {
        render(<ToDoList />)
        
        const appleCheckbox = screen.getByTestId('checkbox-Apples');
        const bananaCheckbox = screen.getByTestId('checkbox-Bananas')

        fireEvent.click(appleCheckbox);
        
        expect(screen.getByText("Items bought: 1")).toBeInTheDocument();

        fireEvent.click(bananaCheckbox);
        
        expect(screen.getByText("Items bought: 2")).toBeInTheDocument();
        
        fireEvent.click(bananaCheckbox);

        expect(screen.getByText("Items bought: 1")).toBeInTheDocument();

        fireEvent.click(bananaCheckbox);
        
        expect(screen.getByText("Items bought: 2")).toBeInTheDocument();
        
        fireEvent.click(appleCheckbox);
        fireEvent.click(bananaCheckbox);

        expect(screen.getByText("Items bought: 0")).toBeInTheDocument();
    });
});