import { useState, useContext } from "react";
import { FavListContext } from "./favListContext";

interface FavoriteButtonProps {
  id: number;
}

function FavoriteButton({ id }: FavoriteButtonProps) {
  const [buttonImage, setButtonImage] = useState(
    "img/heart-stockphoto-outline.jpg"
  );
  const { addToFavorites, removeFromFavorites } = useContext(FavListContext);
  const switchImage = () => {
    // If unfavorited then favorite
    if (buttonImage === "img/heart-stockphoto-outline.jpg") {
      addToFavorites(id); // Context
      setButtonImage("img/heart-stockphoto.jpg"); // State
    } else {
      // If favorited then unfavorite
      removeFromFavorites(id); // Context
      setButtonImage("img/heart-stockphoto-outline.jpg"); // State
    }
  };

  return (
    <div>
      <input
        className="favorite-button"
        type="image"
        src={buttonImage}
        onClick={switchImage}
        alt="Favorite Button"
      />
    </div>
  );
}

export default FavoriteButton;
