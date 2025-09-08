import {
  Alert,
  Card,
  CardHeader,
  CardMedia,
  IconButton,
  Skeleton,
  Stack,
} from "@mui/material";
import { useMemo } from "react";
import { useFavorites } from "@contexts/FavoritesContext";
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

const MediaSize = 386;

export const BreedGallery = ({ selectedBreed, onSelect }: Props) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { data: mainBreed, ...mainBreedState } = useApiData<RandomDogResponse>(
    "https://dog.ceo/api/breeds/image/random"
  );

  const { data: breedList, ...breedListState } =
    useApiData<RandomDogListResponse>(
      "https://dog.ceo/api/breeds/image/random/10"
    );

  const error = mainBreedState.error || breedListState.error;
  const mainItemLoading = mainBreedState.loading || !!mainBreedState.error;
  const listItemsLoading = breedListState.loading || !!breedListState.error;

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
      {error && <Alert severity="error">{error}</Alert>}
      <>
        <CardHeader
          action={
            !mainItemLoading &&
            (favorites.has(mainItem) ? (
              <IconButton
                aria-label="Remove from favorite"
                onClick={() => removeFavorite(mainItem)}
                color="error"
              >
                <FavoriteRemoveIcon />
              </IconButton>
            ) : (
              <IconButton aria-label="Add to favorite" onClick={handleAddClick}>
                <FavoriteAddIcon />
              </IconButton>
            ))
          }
          title={mainItemLoading ? <Skeleton variant="text" /> : breedName}
        />
        {mainItemLoading ? (
          <Skeleton
            sx={{ height: MediaSize }}
            animation="wave"
            variant="rectangular"
          />
        ) : (
          <CardMedia
            component="img"
            width={MediaSize}
            height={MediaSize}
            image={`${mainItem}?w=${MediaSize}&h=200&fit=crop&auto=format`}
            alt={breedName + " image"}
          />
        )}

        {listItemsLoading ? (
          <Skeleton
            sx={{ height: "100px", m: "1rem" }}
            animation="wave"
            variant="rectangular"
          />
        ) : (
          <Stack direction="row" flexWrap="wrap" gap={1} sx={{ p: 2 }}>
            {breedList?.message.map((el) => (
              <BreedGalleryItem key={el} source={el} onSelect={onSelect} />
            ))}
          </Stack>
        )}
      </>
    </Card>
  );
};
