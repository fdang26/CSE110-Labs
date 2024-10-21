import { createContext } from "react";

export const FavListContext = createContext({
  favorites: [] as string[], 
  addToFavorites: (noteTitle: string) => {},
  removeFromFavorites: (noteTitle: string) => {},
});