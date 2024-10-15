import { useState, useEffect, useContext } from "react";
import { FavListContext } from "./context";

interface FavoriteButtonProps {
  title: string;
}

function FavoriteButton({title}:FavoriteButtonProps) {
    const [buttonImage, setButtonImage] = useState("img/heart-stockphoto-outline.jpg");
    const [isFavorited, setIsFavorited] = useState(false);
    const { favorites, addToFavorites, removeFromFavorites } = useContext(FavListContext);
    const switchImage = () => {
      // If unfavorited then favorite
        if(buttonImage === "img/heart-stockphoto-outline.jpg") {
            setButtonImage("img/heart-stockphoto.jpg");
            setIsFavorited(false);
            addToFavorites(title)
          } else {
            // If favorited then unfavorite
            removeFromFavorites(title)
            setButtonImage("img/heart-stockphoto-outline.jpg");
            setIsFavorited(true);
        }
    };
  
    return (
      <div>
        <input className="favorite-button" type="image" src={buttonImage} onClick={switchImage} alt="Favorite Button"/>
      </div>
    );
  }

  export default FavoriteButton;