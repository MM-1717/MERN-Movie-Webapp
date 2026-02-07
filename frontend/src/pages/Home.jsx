import React, { useEffect, useState } from "react";

import { getMovies } from "../api/moviesApi";
import BackToTop from "../components/BackToTop";

import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";

export default function Home() {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const LIMIT = 10;


  const loadMovies = async (
    currentPage = page
  ) => {

    try {
      setLoading(true);

      const data = await getMovies(
        search,
        sort,
        currentPage
      );

      setMovies(data.movies || []);
      setTotalPages(data.totalPages || 1);

    } catch (error) {

      console.error("Failed to load movies:", error);
      setMovies([]);

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadMovies(page);
  }, [page]);


  useEffect(() => {

    setPage(1);
    loadMovies(1);

  }, [search, sort]);


  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };


  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };


  return (
    <div>

      {loading && <div className="top-loader"></div>}


      <Navbar onSearch={setSearch} />


      <div className="controls">

        <div className="container flex items-center">

          <p className="sort-label">Sort:</p>

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            className="sort-container"
          >
            <option value="">Sort By</option>

            <option value="name">
              Name (A-Z)
            </option>

            <option value="rating">
              Rating (High-Low)
            </option>

            <option value="releaseDate">
              Release Date (New-Old)
            </option>

            <option value="duration">
              Duration (Long-Short)
            </option>
          </select>

        </div>

      </div>


      <div className="movie-list">

        <div className="container">


          {loading &&
            Array.from({ length: 8 }).map(
              (_, i) => (
                <div
                  key={i}
                  className="skeleton-row"
                ></div>
              )
            )}


          {!loading &&
            movies.length > 0 &&
            movies.map((movie, index) => {

              const rank =
                (page - 1) * LIMIT +
                index +
                1;

              return (
                <MovieCard
                  key={movie._id || rank}
                  movie={movie}
                  index={rank}
                />
              );
            })}


          {!loading && movies.length === 0 && (
            <p
              style={{
                textAlign: "center",
                color: "#aaa",
                marginTop: "40px",
              }}
            >
              No movies found
            </p>
          )}


          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "15px",
                marginTop: "40px",
              }}
            >

              <button
                disabled={page === 1}
                onClick={handlePrev}
                className="page-btn"
              >
                Prev
              </button>


              <span
                style={{
                  color: "#FFB000",
                  fontWeight: "bold",
                }}
              >
                {page} / {totalPages}
              </span>


              <button
                disabled={page === totalPages}
                onClick={handleNext}
                className="page-btn"
              >
                Next
              </button>

            </div>
          )}

        </div>

      </div>


      <BackToTop />

    </div>
  );
}
