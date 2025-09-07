import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ItemBox = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  border: `1px solid ${theme.palette.common.black}`,
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  overflow: "hidden",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.short,
  }),
  userSelect: "none",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

export const ItemImage = styled("img")({
  width: "100%",
  height: "100%",
  display: "block",
  objectFit: "cover",
});
