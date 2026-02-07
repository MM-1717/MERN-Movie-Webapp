    import mongoose from "mongoose";
    import Movie from "./models/Movie.js";
    import fs from "fs";
    import dotenv from "dotenv";

    dotenv.config();

    const API_KEY = process.env.OMDB_API_KEY;
    const MONGO_URI = process.env.MONGO_URI;

    if (!API_KEY || !MONGO_URI) {
    console.error("Missing .env variables");
    process.exit(1);
    }

    // Read IMDb IDs
    const imdbIds = fs
    .readFileSync("imdb_ids.txt", "utf-8")
    .split("\n")
    .map((id) => id.trim())
    .filter(Boolean);

    // Connect DB
    await mongoose.connect(MONGO_URI);

    const sleep = (ms) =>
    new Promise((r) => setTimeout(r, ms));

    async function seed() {
    console.log("Seeding started...");

    await Movie.deleteMany();

    for (const id of imdbIds) {
        try {
        const res = await fetch(
            `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
        );

        const data = await res.json();

        if (data.Response !== "True") {
            console.log("Skipped:", id);
            continue;
        }

        await Movie.create({
            name: data.Title,
            rating: Number(data.imdbRating),
            releaseDate: `${data.Year}-01-01`,
            duration: parseInt(data.Runtime),
            description: data.Plot,
            poster: data.Poster,
        });

        console.log("Saved:", data.Title);

        await sleep(400);

        } catch (err) {
        console.log("Error:", id, err.message);
        }
    }

    console.log("Seeding finished.");
    process.exit();
    }

    seed();
