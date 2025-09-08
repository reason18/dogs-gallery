import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { CloseIcon } from "@icons/Close";
import { useMemo } from "react";
import { getBreedName } from "../utils";
import { ItemImage } from "./styled";

interface Props {
  source: string;
  onSelect: (url: string) => void;
  onRemove: (url: string) => void;
}

export const FavoriteListItem = ({ source, onSelect, onRemove }: Props) => {
  const breedName = useMemo(() => {
    if (source) {
      return getBreedName(source);
    }
    return "";
  }, [source]);
  return (
    <ListItem
      secondaryAction={
        <IconButton
          aria-label="Remove from favorite"
          onClick={() => onRemove(source)}
          edge="end"
          size="small"
        >
          <CloseIcon sx={{ p: "0.2rem" }} />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar onClick={() => onSelect(source)}>
          <ItemImage
            src={`${source}?w=64&h=auto&fit=crop&auto=format`}
            srcSet={`${source}?w=64&h=auto&fit=crop&auto=format&dpr=2 2x`}
            alt={breedName}
            loading="lazy"
          />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={breedName} />
    </ListItem>
  );
};
