import { Box, Divider, Drawer, List, Stack, Typography } from "@mui/material";
import { FavoriteRemoveIcon } from "@icons/FavoriteRemove";
import { useFavorites } from "@context/FavoritesContext";
import { FavoriteListItem } from "../FavoritesListItem";

const drawerWidth = 400;

interface Props {
  onSelect: (source: string) => void;
}

export const Favorites = ({ onSelect }: Props) => {
  const { favorites, removeFavorite } = useFavorites();
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="right"
    >
      <Stack
        direction="row"
        alignItems="center"
        px={"1rem"}
        height={"4rem"}
        gap={2}
      >
        <Typography variant="body1">Favorites</Typography>
        <FavoriteRemoveIcon />
      </Stack>
      <Divider />
      {favorites.size === 0 ? (
        <Box p="2rem">
          <Typography variant="h6" textAlign="center" color="textSecondary">
            No favorites yet.
          </Typography>
          <Typography variant="body2" textAlign="center" color="textSecondary">
            Click the heart icon to save to favorite.
          </Typography>
        </Box>
      ) : (
        <List dense>
          {Array.from(favorites).map((el) => (
            <FavoriteListItem
              source={el}
              onRemove={() => removeFavorite(el)}
              onSelect={() => onSelect(el)}
            />
          ))}
        </List>
      )}
    </Drawer>
  );
};
