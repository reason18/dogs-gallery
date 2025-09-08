import { useState, useCallback } from "react";

export const useFavoritesList = () => {
  const [favorites, setFavorites] = useState(new Set<string>());

  const addFavorite = useCallback((url: string) => {
    setFavorites((prev) => new Set(prev).add(url));
  }, []);

  const removeFavorite = useCallback((url: string) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);
      newSet.delete(url);
      return newSet;
    });
  }, []);

  return { favorites, addFavorite, removeFavorite };
};
