import DeleteForeverIcon from "@mui/icons-material/DeleteForeverTwoTone";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export default function AllMovies(props: any) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  console.log(props);

  const deleteMovie = (movieId: any, name: string) => {
    axios
      .delete(`https://localhost:7114/movie/${movieId}`)
      .then((res) => {
        if (res.status === 200 || res.status === 204) {
          props.loadAllMovies();
          enqueueSnackbar(`${name} has been deleted successfully!`, {
            variant: "success",
          });
        } else {
          enqueueSnackbar("Error deleting the movie!", { variant: "error" });
        }
      })
      .catch((err: any) => {
        enqueueSnackbar(`${err.response.data.errorMessage}`, {
          variant: "error",
        });
      });
  };
  if (props.loading) {
    return (
      <div
        style={{
          margin: "50px",
          width: "100%",
          height: "300px",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <CircularProgress color="success" />
      </div>
    );
  }

  return (
    <>
      {props &&
        props.movies.length > 0 &&
        props.movies.map((movie: any) => {
          return (
            <div key={movie.id}>
              <Card
                sx={{ minWidth: 275, background: "gainsboro", margin: "20px" }}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    {movie.movieName}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {new Date(movie.releaseDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2">
                    Total Views : {movie.totalViews}$
                  </Typography>
                </CardContent>
                <CardActions>
                  {" "}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Button
                      size="small"
                      onClick={() => navigate(`${movie.id}`)}
                    >
                      Learn More
                    </Button>
                    <Button
                      size="large"
                      color="error"
                      onClick={() => deleteMovie(movie.id, movie.movieName)}
                    >
                      {" "}
                      <DeleteForeverIcon />
                    </Button>
                  </div>
                </CardActions>
              </Card>
            </div>
          );
        })}
    </>
  );
}