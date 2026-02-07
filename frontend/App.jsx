import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminLogin from "./pages/admin/AdminLogin";
import Movies from "./pages/admin/Movies";
import AddMovie from "./pages/admin/AddMovie";
import EditMovie from "./pages/admin/EditMovie";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* User */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin/movies"
            element={
              <ProtectedRoute role="admin">
                <Movies />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/movies/add"
            element={
              <ProtectedRoute role="admin">
                <AddMovie />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/movies/edit/:id"
            element={
              <ProtectedRoute role="admin">
                <EditMovie />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
