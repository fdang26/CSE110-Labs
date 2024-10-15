import React from "react";
import "./App.css";
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import ToggleTheme from "./hooksExercise";
import FavoriteButton from "./favoriteButton";

function App() {
  return (
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
      </form>

      <div className="notes-grid">
        {dummyNotesList.map((note) => (
          <div key={note.id} className="note-item">
            <div className="notes-header">
              <FavoriteButton />
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
  );
}

export default App;
