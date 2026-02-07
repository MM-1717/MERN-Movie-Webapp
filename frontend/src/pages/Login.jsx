import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Divider,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
  Movie,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import API from "../services/api";
import { useAuth } from "../context/AuthContext";

/* Toast */
import toast, { Toaster } from "react-hot-toast";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // Save auth
      login(res.data);

      // Success toast
      toast.success("Login successful! Redirecting...");

      // Wait then redirect
      setTimeout(() => {
        navigate("/admin", { replace: true });
      }, 2000);

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Invalid email or password"
      );

    } finally {
      setLoading(false);
    }
  };


  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #202020, #000000)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >

      {/* Toast container */}
      <Toaster position="top-center" />


      <Container maxWidth="sm">

        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 3,
          }}
        >

          {/* Header */}
          <Box textAlign="center" mb={3}>

            <Movie
              sx={{
                fontSize: 50,
                color: "#FFD700", // YELLOW
              }}
            />

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              Movie Explorer
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Manage your movie database
            </Typography>

          </Box>


          <Divider sx={{ mb: 3 }} />


          {/* Form */}
          <form onSubmit={handleSubmit}>

            <TextField
              fullWidth
              label="Admin Email"
              type="email"
              margin="normal"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />


            <TextField
              fullWidth
              label="Password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              margin="normal"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required

              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />


            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"

              disabled={loading}

              sx={{
                mt: 3,
                py: 1.3,
                fontWeight: "bold",

                backgroundColor: "#FFB000",
                color: "#000",

                "&:hover": {
                  backgroundColor: "#E69A00",
                },

                "&:disabled": {
                  backgroundColor: "#F5D27A",
                  color: "#666",
                },
              }}
            >

              {loading ? (
                <CircularProgress
                  size={24}
                  color="inherit"
                />
              ) : (
                "Login"
              )}

            </Button>

          </form>

        </Paper>

      </Container>

    </Box>
  );
};

export default Login;
