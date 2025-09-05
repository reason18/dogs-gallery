import CssBaseline from "@mui/material/CssBaseline";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  colors,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useFetch } from "./hooks/useFetch";
import { useEffect, useMemo } from "react";
import { getBreedName } from "./utils";

type RandomDogResponse = {
  message: string;
  status: string;
};

type RandomDogListResponse = {
  message: string[];
  status: string;
};

function App() {
  const { data, loading } = useFetch<RandomDogResponse>(
    "https://dog.ceo/api/breeds/image/random"
  );

  const breadName = useMemo(() => {
    if (data) {
      return getBreedName(data.message);
    }
    return "";
  }, [data]);

  return (
    <Box width="100%" height="100%" sx={{ backgroundColor: colors.grey[100] }}>
      <CssBaseline />
      <Box>
        <AppBar position="static" variant="elevation" color="success">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Dog Gallery
            </Typography>
          </Toolbar>
        </AppBar>
        <Box>
          <Box>
            <Card raised sx={{ maxWidth: 600, mx: "auto", mt: "3rem" }}>
              <CardMedia
                component="img"
                height="400"
                image={data?.message}
                alt={breadName + " image"}
              />
              <CardContent sx={{ pb: "1rem" }}>
                <Typography variant="h5" component="div">
                  {breadName}
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box>
            <Stack direction="row" spacing={2}>
              <Box>Item 1</Box>
              <Box>Item 2</Box>
              <Box>Item 3</Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
