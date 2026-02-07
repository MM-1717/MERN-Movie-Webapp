import fs from "fs";

try {
  console.log("Reading imdb.txt...");

  // Read saved source file
  const data = fs.readFileSync("imdb.txt", "utf-8");

  // Find all IMDb IDs
  const matches = data.match(/tt\d{7,8}/g);

  if (!matches) {
    throw new Error("No IMDb IDs found in file");
  }

  // Remove duplicates
  const unique = [...new Set(matches)];

  console.log("Found:", unique.length, "unique IDs");

  // Take first 150
  const top150 = unique.slice(0, 150);

  // Save
  fs.writeFileSync("imdb_ids.txt", top150.join("\n"));

  console.log("Saved", top150.length, "IDs to imdb_ids.txt");

} catch (err) {
  console.error("Error:", err.message);
}
