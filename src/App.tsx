import CssBaseline from "@mui/material/CssBaseline";
import {
  AppBar,
  Box,
  Card,
  CardContent,
  CardMedia,
  colors,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { fetchData, getBreedName } from "./utils";

type RandomDogResponse = {
  message: string;
  status: string;
};

type RandomDogListResponse = {
  message: string[];
  status: string;
};

function App() {
  const [loading, setLoading] = useState(false);
  const [mainBread, setMainBread] = useState<string>();
  const [breadList, setBreadList] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    fetchData<RandomDogResponse>("https://dog.ceo/api/breeds/image/random")
      .then((data) => {
        data && setMainBread(data.message);
        return data;
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchData<RandomDogListResponse>(
      "https://dog.ceo/api/breeds/image/random/10"
    )
      .then((data) => {
        data && setBreadList(data.message);
        return data;
      })
      .finally(() => setLoading(false));
  }, []);

  const breadName = useMemo(() => {
    if (mainBread) {
      return getBreedName(mainBread);
    }
    return "";
  }, [mainBread]);

  return (
    <Box width="100%" height="100%" sx={{ backgroundColor: colors.grey[100] }}>
      <CssBaseline />
      <Box>
        <AppBar position="static" variant="elevation" color="success">
          <Toolbar>
            <Typography variant="h6" component="div">
              Dog Gallery
            </Typography>
          </Toolbar>
        </AppBar>
        <Box>
          <Box sx={{ maxWidth: 816, mx: "auto", mt: "3rem" }}>
            <Card raised>
              {loading ? (
                "Loading..."
              ) : (
                <>
                  <CardMedia
                    component="img"
                    height="400"
                    image={`${mainBread}?w=600&h=400&fit=crop&auto=format`}
                    alt={breadName + " image"}
                  />
                  <CardContent sx={{ pb: "1rem" }}>
                    <Typography variant="h5" component="div">
                      {breadName}
                    </Typography>
                    <Stack direction="row" spacing={2}>
                      {breadList.map((el) => (
                        <span key={el} onClick={() => setMainBread(el)}>
                          <img
                            width="64px"
                            height="64px"
                            srcSet={`${el}?w=64&h=64&fit=crop&auto=format&dpr=2 2x`}
                            src={`${el}?w=64&h=64&fit=crop&auto=format`}
                            alt={el}
                            loading="lazy"
                          />
                        </span>
                      ))}
                    </Stack>
                  </CardContent>
                </>
              )}
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
