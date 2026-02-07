import { Container, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Movies = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4">Admin Movies</Typography>

      <Button
        variant="contained"
        color="warning"
        sx={{ mt: 3 }}
        onClick={() => navigate("/admin/movies/add")}
      >
        Add Movie
      </Button>
    </Container>
  );
};

export default Movies;
