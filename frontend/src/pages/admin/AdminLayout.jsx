import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

export default function AdminLayout() {

  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="admin-wrapper">

      {/* Sidebar */}
      <div className="admin-sidebar">

        <h2 className="admin-logo"> Movie Explorer</h2>
        

        <nav className="admin-nav">

          <Link
            to="/admin"
            className={isActive(location, "/admin")}
          >
            Dashboard
          </Link>

          <Link
            to="/admin/movies"
            className={isActive(location, "/admin/movies")}
          >
            Movies
          </Link>

          <Link
            to="/admin/add"
            className={isActive(location, "/admin/add")}
          >
            Add Movie
          </Link>

        </nav>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

      {/* Main */}
      <div className="admin-main">
        <Outlet />
      </div>

    </div>
  );
}

/* Highlight active link */
function isActive(location, path) {
  return location.pathname === path
    ? "nav-link active"
    : "nav-link";
}
