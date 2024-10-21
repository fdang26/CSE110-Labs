// Credit to https://www.youtube.com/watch?v=HYKDUF8X3qI for help on useContext
import React, { useState } from "react";
import "./App.css";
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import FavoriteButton from "./favoriteButton";
import FavoriteList from "./favoriteList";
import { FavListContext } from "./favListContext";
import { ThemeContext, themes } from "./themeContext";

function App() {
  // first implement onclick for each note, then for each onclick, update selectedNote state variable to contain that notes information and populate the form
  // fields with the notes contents (with having an empty note by default (useState(emptyNote))); there should be a flag based on whether the id of
  // is -1 or not (creating or updating) that impacts whether the onSubmit should create new or replace old
  // to replace old find the note in the list through the id and then place the new note into that spot

  // Favoriting and favorites list: state(list of favorites) and methods to add and remove
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
  const [createNote, setCreateNote] = useState(initialNote);

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: ", createNote.title);
    console.log("content: ", createNote.content);
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
  };

  const trackChanges = (e:React.FormEvent<HTMLDivElement>, id:number) => {
    const { tagName, innerText, className } = e.target as HTMLElement;
    var savedTitle = "";
    const newNotes = notes.map((note) => {
      if (note.id === id) {
        if (tagName === "H2") {
          savedTitle = note.title;
          return { ...note, title: innerText };
        } else if ((tagName === "P") && (className === "noteContent")) {
          return { ...note, content: innerText };
        } else if ((tagName === "P") && (className === "noteLabel")) {
          return { ...note, label: innerText as Label };
        } else {
          return note;
        }
      } else {
        return note;
      }
    });

    setNotes(newNotes);

    const potentialFavoritedNote = newNotes.find(note => note.id === id);
    if(potentialFavoritedNote){
      if(favorites.includes(savedTitle)){
        removeFromFavorites(savedTitle);
        addToFavorites(potentialFavoritedNote.title);
      }
    }
  }

  const deleteNoteHandler = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
    const noteToRemove = notes.find( (note) => note.id === id);
    if(noteToRemove){
      removeFromFavorites(noteToRemove.title);
    } 
  }

  // JSX
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
                placeholder="Note Title"
                onChange={(event) =>
                  setCreateNote({ ...createNote, title: event.target.value })}
                required>
              </input>
            </div>


            <div>
              <textarea
                onChange={(event) =>
                  setCreateNote({ ...createNote, content: event.target.value })}
                required>
              </textarea>
            </div>
            
            <div>
              <select
                onChange={(event) =>
                  setCreateNote({ ...createNote, label: event.target.value as Label})} 
                  // typecasting safe since the only options available below are Label values
                required>
                <option value={Label.personal}>Personal</option>
                <option value={Label.study}>Study</option>
                <option value={Label.work}>Work</option>
                <option value={Label.other}>Other</option>
              </select>
            </div>
            <div><button type="submit">Create Note</button></div>
            <FavoriteList />
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
                  <FavoriteButton title={note.title} />
                  <button onClick={() => deleteNoteHandler(note.id)}>x</button>
                </div>
                <div contentEditable="true" onInput={(e)=>trackChanges(e, note.id)}>
                  <h2 contentEditable="true"> {note.title} </h2>
                  <p contentEditable="true" className="noteContent"> {note.content} </p>
                  <p contentEditable="true" className="noteLabel"> {note.label} </p>
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

export default App;
