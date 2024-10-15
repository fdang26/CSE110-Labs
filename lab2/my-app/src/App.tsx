// Credit to https://www.youtube.com/watch?v=HYKDUF8X3qI for help on useContext
import React, { useState } from "react";
import "./App.css";
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import ToggleTheme from "./hooksExercise";
import FavoriteButton from "./favoriteButton";
import FavoriteList from "./favoriteList";
import { FavListContext } from "./context";

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


  return (
    <FavListContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
    <div className="app-container">
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

        
        <FavoriteList favorites={favorites}/>
        
      </form>

      <div className="notes-grid">
        {dummyNotesList.map((note) => (
          <div key={note.id} className="note-item">
            <div className="notes-header">
              <FavoriteButton title={note.title}/>
              <button>x</button>
            </div>
            <h2> {note.title} </h2>
            <p> {note.content} </p>
            <p> {note.label} </p>
          </div>
        ))}
      </div>

      <ToggleTheme />
    </div>
    </FavListContext.Provider>
  );
}

export default App;
