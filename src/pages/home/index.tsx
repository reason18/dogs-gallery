import { Box, colors } from "@mui/material";
import { useState } from "react";
import { NavBar } from "@components/NavBar";
import { FavoritesProvider } from "@context/FavoritesContext";
import { BreedGallery } from "./components/BreedGallery";
import { Favorites } from "./components/Favorites";

function Home() {
  const [selectedBreed, setSelectedBreed] = useState<string>();

  return (
    <Box width="100%" height="100%" sx={{ backgroundColor: colors.grey[100] }}>
      <NavBar />

      <Box sx={{ maxWidth: 386, mx: "auto", mt: "3rem" }}>
        <FavoritesProvider>
          <BreedGallery
            selectedBreed={selectedBreed}
            onSelect={setSelectedBreed}
          />
          <Favorites onSelect={setSelectedBreed} />
        </FavoritesProvider>
      </Box>
    </Box>
  );
}

export default Home;
