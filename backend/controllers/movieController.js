import Movie from "../models/Movie.js";

/* PUBLIC: GET MOVIES (Paginated) */
export const getMovies = async (req, res) => {
  try {

    const { search, sortBy, order } = req.query;

    let query = {};

    /* Search */
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      };
    }

    /* Sort */
    let sortOptions = {};

    if (sortBy) {
      sortOptions[sortBy] =
        order === "desc" ? -1 : 1;
    } else {
      sortOptions.rating = -1;
    }

    /* Pagination */
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const total = await Movie.countDocuments(query);

    const movies = await Movie.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      movies,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalMovies: total,
    });

  } catch (error) {

    console.error("Get Movies Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};


/* ADMIN: GET ALL MOVIES */
export const getAdminMovies = async (req, res) => {
  try {

    const movies = await Movie.find()
      .sort({ rating: -1 });

    res.status(200).json({
      movies,
      totalMovies: movies.length,
    });

  } catch (error) {

    console.error("Admin Get Movies Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};


/* GET SINGLE MOVIE */
export const getMovieById = async (req, res) => {
  try {

    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.status(200).json(movie);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


/* ADD MOVIE (ADMIN) */
export const addMovie = async (req, res) => {
  try {

    const {
      name,
      description,
      rating,
      releaseDate,
      duration,
    } = req.body;

    /* Validation */
    if (
      !name ||
      !description ||
      !rating ||
      !releaseDate ||
      !duration
    ) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    /* Check duplicate */
    const exists = await Movie.findOne({ name });

    if (exists) {
      return res.status(400).json({
        message: "Movie already exists",
      });
    }

    /* Fetch Poster from OMDB */

    let posterUrl = "N/A";

    const apiKey = process.env.OMDB_API_KEY;

    console.log("OMDB KEY:", apiKey); // Debug

    if (!apiKey) {
      return res.status(500).json({
        message: "OMDB API key missing",
      });
    }

    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(
      name.trim()
    )}&apikey=${apiKey}`;

    console.log("OMDB URL:", url); // Debug

    const response = await fetch(url);
    const data = await response.json();

    console.log("OMDB RESPONSE:", data); // Debug

    if (data.Response === "True" && data.Poster !== "N/A") {
      posterUrl = data.Poster;
    }

    /* Save Movie */

    const movie = await Movie.create({
      name: name.trim(),
      description: description.trim(),
      rating,
      releaseDate,
      duration,
      poster: posterUrl,
    });

    res.status(201).json(movie);

  } catch (error) {

    console.error("Add Movie Error:", error);

    res.status(500).json({
      message: "Failed to add movie",
      error: error.message,
    });
  }
};


/* UPDATE MOVIE (ADMIN) */
export const updateMovie = async (req, res) => {
  try {

    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.status(200).json(movie);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


/* DELETE MOVIE (ADMIN)*/
export const deleteMovie = async (req, res) => {
  try {

    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.status(200).json({
      message: "Movie deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};
