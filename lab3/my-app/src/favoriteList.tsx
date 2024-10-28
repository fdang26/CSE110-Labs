import { useContext } from "react";
import { FavListContext } from "./favListContext";
import { Note } from "./types"

interface FavoriteListProps {
  notesList: Note[]
}

function FavoriteList( props: FavoriteListProps) {
  const { favorites } = useContext(FavListContext);
  const notes = props.notesList
  return (
    <div>
      <h1>List of Favorites:</h1>
      {notes.map((note) => 
        favorites.includes(note.id) ? <li>{note.title}</li> : null
      )}
    </div>
  );
}

export default FavoriteList;
