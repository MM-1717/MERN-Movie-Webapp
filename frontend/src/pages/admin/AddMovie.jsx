import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const API = "http://localhost:5000/api";

export default function AddMovie() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    rating: "",
    releaseDate: "",
    duration: ""
  });

  /* ===============================
     Handle Change
  =============================== */
  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ===============================
     Submit
  =============================== */
  const submit = async (e) => {

    e.preventDefault();

    if (loading) return;

    /* ===============================
       Validation
    =============================== */

    if (
      !form.name.trim() ||
      !form.description.trim() ||
      !form.rating ||
      !form.releaseDate ||
      !form.duration
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (form.rating < 0 || form.rating > 10) {
      toast.error("Rating must be between 0 and 10");
      return;
    }

    if (form.duration <= 0) {
      toast.error("Duration must be greater than 0");
      return;
    }

    setLoading(true);

    try {

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Session expired. Login again.");
        navigate("/login");
        return;
      }

      /* ===============================
         Send Data (No Poster)
      =============================== */

      await axios.post(
        `${API}/movies`,
        {
          name: form.name.trim(),
          description: form.description.trim(),
          rating: Number(form.rating),
          releaseDate: form.releaseDate,
          duration: Number(form.duration),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Movie added successfully");

      /* ===============================
         Reset
      =============================== */

      setForm({
        name: "",
        description: "",
        rating: "",
        releaseDate: "",
        duration: "",
      });

      /* ===============================
         Redirect
      =============================== */

      setTimeout(() => {
        navigate("/admin/movies");
      }, 1000);

    } catch (err) {

      console.error("ADD ERROR:", err.response || err);

      if (err.response?.status === 401) {
        toast.error("Session expired. Login again.");
        navigate("/login");
      }
      else if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      }
      else {
        toast.error("Failed to add movie");
      }

    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     UI
  =============================== */
  return (
    <div className="admin-container">

      {/* Toast */}
      <Toaster position="top-center" />

      {/* Internal CSS */}
      <style>{`
        .add-form {
          background: #1f1f1f;
          padding: 25px;
          border-radius: 8px;
          max-width: 500px;
        }

        .add-form input,
        .add-form textarea {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;

          background: white;
          color: black;

          border: none;
          border-radius: 4px;
        }

        .add-btn {
          background: orange;
          border: none;
          padding: 10px;
          width: 100%;

          cursor: pointer;
          font-weight: bold;
        }

        .add-btn:disabled {
          background: gray;
          cursor: not-allowed;
        }

        .add-btn:hover:not(:disabled) {
          background: darkorange;
        }
      `}</style>

      <h1>Add Movie</h1>

      <form
        onSubmit={submit}
        className="add-form"
      >

        {/* Name */}
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Movie Name"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />

        {/* Rating */}
        <input
          name="rating"
          type="number"
          step="0.1"
          min="0"
          max="10"
          value={form.rating}
          onChange={handleChange}
          placeholder="Rating (0–10)"
          required
        />

        {/* Release Date */}
        <input
          type="date"
          name="releaseDate"
          value={form.releaseDate}
          onChange={handleChange}
          required
        />

        {/* Duration */}
        <input
          name="duration"
          type="number"
          min="1"
          value={form.duration}
          onChange={handleChange}
          placeholder="Duration (minutes)"
          required
        />

        {/* Submit */}
        <button
          className="add-btn"
          disabled={loading}
        >
          {loading ? "Saving..." : "Add Movie"}
        </button>

      </form>

    </div>
  );
}
