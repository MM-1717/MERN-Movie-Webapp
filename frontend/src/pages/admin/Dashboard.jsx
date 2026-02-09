import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
} from "@mui/material";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import API from "../../services/api";

const Dashboard = () => {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  /* Fetch Movies */
  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      // Admin API
      const res = await API.get("/movies/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(res.data.movies)) {
        setMovies(res.data.movies);
      } else {
        throw new Error("Invalid server response");
      }

    } catch (err) {
      console.error("Dashboard fetch error:", err);

      if (
        err.response?.status === 401 ||
        err.response?.status === 403
      ) {
        localStorage.clear();
        navigate("/login");

      } else {
        setError("Server error. Try again later.");
      }

      setMovies([]);

    } finally {
      setLoading(false);
    }
  };

  /* Re-fetch on route change */
  useEffect(() => {
    fetchMovies();
  }, [location.pathname]);

  /* Stats */
  const totalMovies = movies.length;

  const avgRating =
    movies.length > 0
      ? (
          movies.reduce(
            (sum, m) => sum + (Number(m.rating) || 0),
            0
          ) / movies.length
        ).toFixed(1)
      : "0.0";

  const latestMovie =
    movies.length > 0
      ? movies[movies.length - 1]?.name
      : "N/A";

  /* UI */
  return (
    <Box
      sx={{
        color: "#FFFFFF",

        "& .MuiTypography-root": {
          color: "#FFFFFF",
        },

        "& .MuiPaper-root": {
          color: "#FFFFFF",
        },
      }}
    >
      {/* Header */}
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Dashboard
      </Typography>

      <Typography color="#AAAAAA" mb={3}>
        Welcome back, Admin 👋
      </Typography>

      {/* Loading */}
      {loading && (
        <Typography color="#AAAAAA" mb={3}>
          Loading dashboard...
        </Typography>
      )}

      {/* Error */}
      {error && (
        <Typography color="error" mb={3}>
          {error}
        </Typography>
      )}

      {/* Stats */}
      {!loading && !error && (
        <Grid container spacing={3} mb={4}>

          {/* Total */}
          <Grid item xs={12} md={4}>
            <Paper sx={cardStyle}>
              <Typography color="#AAAAAA">
                Total Movies
              </Typography>

              <Typography variant="h3" color="#FFB000">
                {totalMovies}
              </Typography>
            </Paper>
          </Grid>

          {/* Rating */}
          <Grid item xs={12} md={4}>
            <Paper sx={cardStyle}>
              <Typography color="#AAAAAA">
                Average Rating
              </Typography>

              <Typography variant="h3" color="#FFB000">
                ⭐ {avgRating}
              </Typography>
            </Paper>
          </Grid>

          {/* Latest */}
          <Grid item xs={12} md={4}>
            <Paper sx={cardStyle}>
              <Typography color="#AAAAAA">
                Latest Movie
              </Typography>

              <Typography mt={1}>
                {latestMovie}
              </Typography>
            </Paper>
          </Grid>

        </Grid>
      )}

      {/* Quick Actions */}
      <Paper sx={panelStyle}>

        <Typography variant="h6" mb={2}>
          Quick Actions
        </Typography>

        <Divider sx={dividerStyle} />

        <Button
          variant="contained"
          sx={yellowBtn}
          onClick={() => navigate("/admin/add")}
        >
          ➕ Add Movie
        </Button>

        <Button
          variant="outlined"
          sx={outlineBtn}
          onClick={() => navigate("/admin/movies")}
        >
          📂 Manage Movies
        </Button>

      </Paper>

      {/* Recent Movies */}
      <Paper sx={panelStyle}>

        <Typography variant="h6" mb={2}>
          Recently Added Movies
        </Typography>

        <Divider sx={dividerStyle} />

        {!loading &&
          !error &&
          movies
            .slice(-5)
            .reverse()
            .map((movie) => (
              <Box key={movie._id} sx={rowStyle}>

                <Typography>
                  {movie.name}
                </Typography>

                <Typography color="#FFB000">
                  ⭐ {movie.rating}
                </Typography>

              </Box>
            ))}

        {!loading && !error && movies.length === 0 && (
          <Typography color="#AAAAAA">
            No movies yet.
          </Typography>
        )}

      </Paper>
    </Box>
  );
};

/* Styles */

const cardStyle = {
  p: 3,
  borderRadius: 2,
  backgroundColor: "#1C1C1C",
  border: "1px solid #2A2A2A",
  textAlign: "center",
};

const panelStyle = {
  p: 3,
  mb: 4,
  backgroundColor: "#161616",
  border: "1px solid #2A2A2A",
  borderRadius: 2,
};

const dividerStyle = {
  backgroundColor: "#2A2A2A",
  mb: 2,
};

const yellowBtn = {
  backgroundColor: "#FFB000",
  color: "#000",
  fontWeight: "bold",
  mr: 2,

  "&:hover": {
    backgroundColor: "#E69A00",
  },
};

const outlineBtn = {
  borderColor: "#FFB000",
  color: "#FFB000",

  "&:hover": {
    borderColor: "#E69A00",
    backgroundColor: "rgba(255,176,0,0.1)",
  },
};

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  py: 1,
  borderBottom: "1px solid #2A2A2A",
};

export default Dashboard;
