import { createContext } from "react";

export const FavListContext = createContext({
  favorites: [] as number[], 
  addToFavorites: (noteId: number) => {},
  removeFromFavorites: (noteId: number) => {},
});