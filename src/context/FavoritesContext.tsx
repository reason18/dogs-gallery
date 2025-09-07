import React, { createContext, useContext, useMemo } from "react";
import { useFavoritesList } from "../hooks/useFavoritesList";

type FavoritesContextType = ReturnType<typeof useFavoritesList>;

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { favorites, addFavorite, removeFavorite } = useFavoritesList();

  const value = useMemo(
    () => ({ favorites, addFavorite, removeFavorite }),
    [favorites, addFavorite, removeFavorite]
  );
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
};
