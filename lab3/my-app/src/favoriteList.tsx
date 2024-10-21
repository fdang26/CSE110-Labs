import { useContext } from "react";
import { FavListContext } from "./favListContext";

function FavoriteList() {
  const { favorites } = useContext(FavListContext);
  return (
    <div>
      <h1>List of Favorites:</h1>
      {favorites.map((item) => (
        <li>{item}</li>
      ))}
    </div>
  );
}

export default FavoriteList;
