import { Card, CardHeader, CardMedia, IconButton, Stack } from "@mui/material";
import { useMemo } from "react";
import { useFavorites } from "@context/FavoritesContext";
import { getBreedName } from "../utils";
import { FavoriteAddIcon } from "@icons/FavoriteAdd";
import { BreedGalleryItem } from "../BreedGalleryItem";
import { useApiData } from "@hooks/useApiData";
import { FavoriteRemoveIcon } from "@icons/FavoriteRemove";

type RandomDogResponse = {
  message: string;
  status: string;
};

type RandomDogListResponse = {
  message: string[];
  status: string;
};

interface Props {
  selectedBreed: string | undefined;
  onSelect: (source: string) => void;
}

export const BreedGallery = ({ selectedBreed, onSelect }: Props) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { data: mainBreed, ...mainBreedState } = useApiData<RandomDogResponse>(
    "https://dog.ceo/api/breeds/image/random"
  );

  const { data: breedList, ...breedListState } =
    useApiData<RandomDogListResponse>(
      "https://dog.ceo/api/breeds/image/random/10"
    );

  const loading = mainBreedState.loading || breedListState.loading;
  const error = mainBreedState.error || breedListState.error;

  const mainItem = selectedBreed || mainBreed?.message || "";

  const breedName = useMemo(() => {
    if (mainItem) {
      return getBreedName(mainItem);
    }
    return "";
  }, [mainItem]);

  const handleAddClick = () => mainItem && addFavorite(mainItem);

  return (
    <Card variant="outlined">
      {loading ? (
        "Loading..."
      ) : (
        <>
          <CardHeader
            action={
              favorites.has(mainItem) ? (
                <IconButton
                  onClick={() => removeFavorite(mainItem)}
                  color="error"
                >
                  <FavoriteRemoveIcon />
                </IconButton>
              ) : (
                <IconButton onClick={handleAddClick}>
                  <FavoriteAddIcon />
                </IconButton>
              )
            }
            title={breedName}
          />
          <CardMedia
            component="img"
            width={386}
            height={386}
            image={`${mainItem}?w=386&h=200&fit=crop&auto=format`}
            alt={breedName + " image"}
          />

          <Stack direction="row" flexWrap="wrap" gap={1} sx={{ p: 2 }}>
            {breedList?.message.map((el) => (
              <BreedGalleryItem source={el} onSelect={onSelect} />
            ))}
          </Stack>
        </>
      )}
    </Card>
  );
};
