import express from "express";

import {
  getMovies,
  getAdminMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

/* Public */
router.get("/", getMovies);

/* Admin */
router.get(
  "/admin",
  authMiddleware,
  adminMiddleware,
  getAdminMovies
);

router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  getMovieById
);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  addMovie
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateMovie
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteMovie
);

export default router;
