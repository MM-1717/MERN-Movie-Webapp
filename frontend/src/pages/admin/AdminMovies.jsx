import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

/* API URL */
const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export default function AdminMovies() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  /* Load Movies */
  useEffect(() => {
    fetchMovies();
  }, []);

  /* Fetch Admin Movies */
  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      // Not logged in
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await axios.get(`${API}/movies/admin`, {
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
      console.error("Fetch movies error:", err);

      // Unauthorized → logout
      if (
        err.response?.status === 401 ||
        err.response?.status === 403
      ) {
        localStorage.clear();

        setError("Session expired. Please login again.");

        setTimeout(() => {
          navigate("/login");
        }, 1500);

      } else {
        setError("Server error. Please try again later.");
      }

      setMovies([]);

    } finally {
      setLoading(false);
    }
  };

  /* Delete Movie */
  const deleteMovie = async (id) => {
    if (!window.confirm("Delete this movie?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API}/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchMovies();

    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed. Try again.");
    }
  };

  /* Filter & Sort */
  const filteredMovies = movies
    .filter((m) =>
      m?.name?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "name") {
        return (a?.name || "").localeCompare(b?.name || "");
      }

      if (sort === "rating") {
        return (b?.rating || 0) - (a?.rating || 0);
      }

      if (sort === "date") {
        return (
          new Date(b?.releaseDate || 0) -
          new Date(a?.releaseDate || 0)
        );
      }

      return 0;
    });

  /* UI */
  return (
    <div className="admin-movies">

      {/* Styles */}
      <style>{`
        .controls {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
        }

        .controls input,
        .controls select {
          padding: 8px;
          border-radius: 4px;
          border: none;
        }

        .movie-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 20px;
        }

        .movie-card {
          background: #1f1f1f;
          color: white;
          padding: 15px;
          border-radius: 8px;
        }

        .movie-card img {
          width: 100%;
          height: 280px;
          object-fit: cover;
          border-radius: 6px;
        }

        .movie-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }

        .edit-btn {
          background: #3498db;
          border: none;
          color: white;
          padding: 6px 10px;
          cursor: pointer;
        }

        .delete-btn {
          background: #e74c3c;
          border: none;
          color: white;
          padding: 6px 10px;
          cursor: pointer;
        }
      `}</style>

      <h1>Manage Movies</h1>

      {/* Loading */}
      {loading && (
        <p style={{ color: "#aaa" }}>Loading...</p>
      )}

      {/* Error */}
      {error && (
        <p style={{ color: "red" }}>{error}</p>
      )}

      {/* Controls */}
      {!loading && !error && (
        <div className="controls">

          <input
            type="text"
            placeholder="Search movie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="rating">Rating</option>
            <option value="date">Release Date</option>
          </select>

        </div>
      )}

      {/* Movies */}
      {!loading && !error && (
        <div className="movie-grid">

          {filteredMovies.map((m) => (
            <div key={m._id} className="movie-card">

              <img
                src={m.poster || "/no-poster.png"}
                alt={m.name}
              />

              <h3>{m.name}</h3>

              <p>⭐ {m.rating || "N/A"}</p>

              <div className="movie-actions">

                <Link to={`/admin/edit/${m._id}`}>
                  <button className="edit-btn">
                    Edit
                  </button>
                </Link>

                <button
                  className="delete-btn"
                  onClick={() => deleteMovie(m._id)}
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

          {filteredMovies.length === 0 && (
            <p style={{ color: "#aaa" }}>
              No movies found.
            </p>
          )}

        </div>
      )}

    </div>
  );
}
