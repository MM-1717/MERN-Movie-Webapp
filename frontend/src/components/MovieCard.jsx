import React from "react";

export default function MovieCard({ movie, index }) {
  return (
    <div className="movie-row">

      {/* Rank */}
      <div className="rank">#{index}</div>

      {/* Poster */}
      <img
        src={movie.poster}
        alt={movie.name}
        className="row-poster"
      />

      {/* Info */}
      <div className="row-info">

        <h3>{movie.name}</h3>

        <p className="meta">
          {new Date(movie.releaseDate).getFullYear()} •{" "}
          {movie.duration} min
        </p>

        <p className="rating">
          ⭐ {movie.rating}
        </p>

        <p className="desc">
          {movie.description}
        </p>

      </div>
    </div>
  );
}
