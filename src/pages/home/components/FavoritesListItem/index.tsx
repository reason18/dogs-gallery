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
          onClick={() => onRemove(source)}
          edge="end"
          size="small"
          aria-label="delete"
        >
          <CloseIcon sx={{ p: "0.2rem" }} />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar onClick={() => onSelect(source)}>
          <img
            width="64px"
            height="64px"
            srcSet={`${source}?w=64&h=auto&fit=crop&auto=format&dpr=2 2x`}
            src={`${source}?w=64&h=auto&fit=crop&auto=format`}
            alt={breedName}
            loading="lazy"
            style={{ display: "block", objectFit: "cover" }}
          />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={breedName} />
    </ListItem>
  );
};
