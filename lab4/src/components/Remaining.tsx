import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";


const Remaining = () => {
  const { expenses } = useContext(AppContext);
  let bdget = 1000;

  const { budget } = useContext(AppContext)

  
  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + item.cost);
  }, 0);

 // const alertType = totalExpenses > bdget ? "alert-danger" : "alert-success";
  const alertType = totalExpenses > budget ? "alert-danger" : "alert-success";
  // Exercise: Create an alert when Remaining is less than 0.


   
    
  //const aler = bdget - totalExpenses
  const aler = budget - totalExpenses

  if(aler < 0)
    {
      alert("You have exceeded your budget!")

    }
   

  return (
    <div className={`alert ${alertType}`}>
      <span>Remaining: ${budget - totalExpenses}</span>
    </div>
  );
};

export default Remaining;
