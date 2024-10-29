import React from 'react';
import { render, screen,fireEvent } from '@testing-library/react';
import  userEvent from '@testing-library/user-event'
import App from './App';
import {act} from 'react';
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});



test('removal of a list', () => {

  render(
    
      <App/>
       );

      const nENI = screen.getByPlaceholderText("Expense name")
      const nENc = screen.getByPlaceholderText("Expense cost")
      const save = screen.getByTitle("save")
      
      
     

      

      expect(nENI).toBeInTheDocument();

      act(() => 
      {
        fireEvent.change(nENI,
          {
            target: {value: "groceries"}
          });

          fireEvent.change(nENc, 
          {
              target: {value: "291"}
          });
    
          fireEvent.click(save,
            {
                
            });

            
      });
 

      userEvent.type(nENI, "groceries");
      
      const expenseName = screen.getByText("groceries");  
        

      expect(expenseName).toBeInTheDocument();

      expect(screen.getByTestId('groceries')).toBeInTheDocument();


  
      
   


      

});
