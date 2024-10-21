// Credit to https://www.youtube.com/watch?v=HYKDUF8X3qI for help on useContext
import React, { useState } from "react";
import "./App.css";
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import ToggleTheme from "./hooksExercise";
import FavoriteButton from "./favoriteButton";
import FavoriteList from "./favoriteList";
import { FavListContext } from "./favListContext";
import { ThemeContext, themes } from "./themeContext";

function App() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const addToFavorites = (noteTitle: string) => {
    const newFavorites = [...favorites];
    newFavorites.push(noteTitle);
    setFavorites(newFavorites);
  };

  const removeFromFavorites = (noteTitle: string) => {
    const newFavorites = [...favorites];
    const index = newFavorites.indexOf(noteTitle);
    newFavorites.splice(index, 1);
    setFavorites(newFavorites);
  };

  const [theme, setTheme] = useState(themes.light);

  const changeTheme = () => {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  };

  return (
    <FavListContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {/* context for favorite button and favorite list */}
      <ThemeContext.Provider value={theme}>
        <div
          style={{
            background: theme.mainBackground,
            color: theme.mainForeground,
          }}
          className="app-container"
        >
          <form className="note-form">
            <div>
              <input placeholder="Note Title"></input>
            </div>

            <div>
              <textarea></textarea>
            </div>

            <div>
              <button type="submit">Create Note</button>
            </div>

            <FavoriteList />
          </form>

          <div className="notes-grid">
            {dummyNotesList.map((note) => (
              <div
                style={{
                  background: theme.subBackground,
                  color: theme.subForeground,
                }}
                key={note.id}
                className="note-item"
              >
                <div className="notes-header">
                  <FavoriteButton title={note.title} />
                  <button>x</button>
                </div>
                <h2> {note.title} </h2>
                <p> {note.content} </p>
                <p> {note.label} </p>
              </div>
            ))}
          </div>
          <button onClick={changeTheme}> Toggle Theme </button>
        </div>
      </ThemeContext.Provider>
    </FavListContext.Provider>
  );
}

export default App;
