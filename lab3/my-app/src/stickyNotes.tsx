// Credit to https://www.youtube.com/watch?v=HYKDUF8X3qI for help on useContext
import React, { useState } from "react";
import "./App.css";
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import FavoriteButton from "./favoriteButton";
import FavoriteList from "./favoriteList";
import { FavListContext } from "./favListContext";
import { ThemeContext, themes } from "./themeContext";

function StickyNotes() {
  // Favoriting and favorites list: state(list of favorites) and methods to add and remove
  const [favorites, setFavorites] = useState<number[]>([]);

  const addToFavorites = (noteId: number) => {
    const newFavorites = [...favorites];
    newFavorites.push(noteId);
    setFavorites(newFavorites);
  };

  const removeFromFavorites = (noteId: number) => {
    const newFavorites = [...favorites];
    const index = newFavorites.indexOf(noteId);
    newFavorites.splice(index, 1);
    setFavorites(newFavorites);
  };

  // Light and dark mode: state and onclick handler
  const [theme, setTheme] = useState(themes.light);

  const changeTheme = () => {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  };

  // Notes
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.personal,
  };

  const [notes, setNotes] = useState(dummyNotesList); 
  // const [createNote, setCreateNote] = useState(initialNote);
  const [selectedNote, setSelectedNote] = useState<Note>(initialNote);

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if(selectedNote.id === -1) { // If this note is a new note, aka not a selected note
      // setSelectedNote({...selectedNote, id: notes.length + 1});
      selectedNote.id = notes.length + 1;
      setNotes([selectedNote, ...notes]);
      console.log(selectedNote);
    } else { // If this note is a selected note and should replace not append
      const indexOfSelectedNote = notes.findIndex((note) => note.id === selectedNote.id)
      let notesCopy = notes;
      notesCopy.splice(indexOfSelectedNote, 1, selectedNote);
      setNotes(notesCopy);
      console.log("replaced!");
      console.log(notes);
    }
    setSelectedNote(initialNote);
  };

  // Removes the note from the list of notes and from the favorites list if its also in there
  const deleteNoteHandler = (id: number) => {
    removeFromFavorites(id);
    setNotes(notes.filter((note) => note.id !== id));
  }

  const noteSelectionHandler = (id:number) => {
    const selected = notes.find((note) => note.id === id);
    if(selected) {
      setSelectedNote(selected);
    }
  }
  const resetSelectionHandler = () => {
    setSelectedNote(initialNote);
  }

  /** --------------- JSX Below -------------------*/
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
          <form className="note-form" onSubmit={createNoteHandler}>
            <div>
              <input
                value={selectedNote.title}
                placeholder="Note Title"
                onChange={(e) => setSelectedNote({...selectedNote, title: e.target.value})}
                required>
              </input>
            </div>


            <div>
              <textarea
                value={selectedNote.content}
                onChange={(e) => setSelectedNote({...selectedNote, content: e.target.value})}
                required>
              </textarea>
            </div>
            
            <div>
              <select
                value={selectedNote.label}
                onChange={(e) => setSelectedNote({...selectedNote, label: e.target.value as Label})}
                  // typecasting safe since the only options available below are Label values
                required>
                <option value={Label.personal}>Personal</option>
                <option value={Label.study}>Study</option>
                <option value={Label.work}>Work</option>
                <option value={Label.other}>Other</option>
              </select>
            </div>
            <div><button type="submit">Create/Update Note</button></div>
            <div><button type="reset" onClick={resetSelectionHandler}>Clear Fields</button></div>
            <FavoriteList notesList={notes} />
          </form>

          <div className="notes-grid">
            {notes.map((note) => (
              <div
                style={{
                  background: theme.subBackground,
                  color: theme.subForeground,
                }}
                key={note.id}
                className="note-item"
              >
                <div className="notes-header">
                  <FavoriteButton id={note.id} />
                  <button onClick={() => deleteNoteHandler(note.id)}>x</button>
                </div>
                <div>
                  <h2 onClick={(e)=>noteSelectionHandler(note.id)}> {note.title} </h2>
                  <p onClick={(e)=>noteSelectionHandler(note.id)} className="noteContent"> {note.content} </p>
                  <p onClick={(e)=>noteSelectionHandler(note.id)} className="noteLabel"> {note.label} </p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={changeTheme}> Toggle Theme </button>
        </div>
      </ThemeContext.Provider>
    </FavListContext.Provider>
  );
}

export default StickyNotes;
