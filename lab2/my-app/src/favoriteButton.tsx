import { useState } from "react";

function FavoriteButton() {
    const [buttonImage, setButtonImage] = useState("img/heart-stockphoto-outline.jpg");
  
    const switchImage = () => {
        if(buttonImage === "img/heart-stockphoto-outline.jpg") {
            setButtonImage("img/heart-stockphoto.jpg");
        } else {
            setButtonImage("img/heart-stockphoto-outline.jpg");
        }
    };
  
    return (
      <div>
        <input className="favorite-button" type="image" src={buttonImage} onClick={switchImage} alt="Favorite Button"/>
      </div>
    );
  }

  export default FavoriteButton;