import React, { useEffect, useState, useContext } from "react";
import { ThemeContext, themes } from "./themeContext";
function ClickCounter() {
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   document.title = `You clicked ${count} times`;
  // }, [count]);

  const theme = useContext(ThemeContext); // Access to the "currentTheme" given by Toggle wrapper
  
  return (
    <div
      style={{
        background: theme.mainBackground,
        color: theme.mainForeground,
        padding: "20px",
      }}
    >
      <p>You clicked {count} times </p>
      <button
        onClick={() => setCount(count + 1)}
        style={{ background: theme.mainForeground, color: theme.mainBackground }}
      >
        Click me
      </button>
    </div>
  );
}

// Wrapper component to provide context
// Ignore above comment: now 
function ToggleTheme() {
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  return (
    <ThemeContext.Provider value={currentTheme}>
      <button onClick={toggleTheme}> Toggle Theme </button>
      <ClickCounter />
    </ThemeContext.Provider>
  );
}

export default ToggleTheme;
