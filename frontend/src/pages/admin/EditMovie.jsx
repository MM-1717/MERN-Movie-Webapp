import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    description: "",
    rating: "",
    releaseDate: "",
    duration: "",
    poster: "",
  });

  /* LOAD MOVIE */
  useEffect(() => {
    const loadMovie = async () => {
      try {
        const res = await axios.get(`${API}/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setForm(res.data);

        setLoading(false);
      } catch (err) {
        console.error("Load error:", err.response || err);

        alert("Failed to load movie");

        navigate("/admin/movies");
      }
    };

    loadMovie();
  }, [id, navigate]);

  /* HANDLE CHANGE */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* UPDATE MOVIE */
  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API}/movies/${id}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Movie updated successfully");

      navigate("/admin/movies");
    } catch (err) {
      console.error("Update error:", err.response || err);

      toast.error("Failed to update movie");
    }
  };

  /* LOADING */
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="admin-container">
      <style>{`
        .edit-form {
          background: #1f1f1f;
          padding: 25px;
          border-radius: 8px;
          max-width: 500px;
        }

        .edit-form input,
        .edit-form textarea {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;

          background: white;
          color: black;

          border: none;
          border-radius: 4px;
        }

        .save-btn {
          background: orange;
          border: none;
          padding: 10px;
          width: 100%;

          cursor: pointer;
          font-weight: bold;
        }

        .save-btn:hover {
          background: darkorange;
        }
      `}</style>

      <h1>Edit Movie</h1>

      <form onSubmit={submit} className="edit-form">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Movie Name"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />

        <input
          name="rating"
          type="number"
          step="0.1"
          value={form.rating}
          onChange={handleChange}
          placeholder="Rating"
          required
        />

        <input
          type="date"
          name="releaseDate"
          value={form.releaseDate ? form.releaseDate.slice(0, 10) : ""}
          onChange={handleChange}
          required
        />

        <input
          name="duration"
          type="number"
          value={form.duration}
          onChange={handleChange}
          placeholder="Duration (minutes)"
          required
        />

        <input
          name="poster"
          value={form.poster}
          onChange={handleChange}
          placeholder="Poster URL"
        />

        <button className="save-btn">Update Movie</button>
      </form>
    </div>
  );
}
