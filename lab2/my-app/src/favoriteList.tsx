import { useContext } from "react";

interface favoriteListProps {
    favorites: Array<string>;
  }
  
const FavoriteList: React.FC<favoriteListProps> = ({ favorites }) => {
    return(
        <div>
            <h1>List of Favorites:</h1>
            {favorites.map((item) => (
                <li>{item}</li>
            ))}
        </div>
    )
  };

  export default FavoriteList;