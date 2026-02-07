import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";

/* Admin Pages */
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminMovies from "./pages/admin/AdminMovies";
import AddMovie from "./pages/admin/AddMovie";
import EditMovie from "./pages/admin/EditMovie";

/* Protection */
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Section */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >

        {/* Dashboard */}
        <Route index element={<Dashboard />} />

        {/* Movies List */}
        <Route path="movies" element={<AdminMovies />} />

        {/* Add Movie */}
        <Route path="add" element={<AddMovie />} />

        {/* Edit Movie */}
        <Route path="edit/:id" element={<EditMovie />} />

      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}
