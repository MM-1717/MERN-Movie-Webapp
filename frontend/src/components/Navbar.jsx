import React from "react";

export default function Navbar({ onSearch }) {
  return (
    <nav className="navbar">

      <div className="nav-container">

        {/* Left */}
        <h2>Movie Explorer</h2>

        {/* Right */}
        <input
          type="text"
          className="search-input"
          placeholder="Search movies..."
          onChange={(e) => onSearch(e.target.value)}
        />

      </div>

    </nav>
  );
}
