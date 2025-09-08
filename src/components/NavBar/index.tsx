import { AppBar, Toolbar, Typography } from "@mui/material";

export const NavBar = () => {
  return (
    <AppBar
      position="static"
      color="default"
      sx={{
        backgroundColor: "white",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
      }}
      elevation={0}
    >
      <Toolbar>
        <Typography variant="h6">Dog Gallery</Typography>
      </Toolbar>
    </AppBar>
  );
};
