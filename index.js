const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// Allow public folder
app.use(express.static(path.join(process.cwd(), "public")));

// Helper to read JSON
function readJSON(name) {
  return JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "data", name), "utf8")
  );
}

// Serve Home Page
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

// API Routes
app.get("/api/geo/divisions", (req, res) =>
  res.json(readJSON("divisions.json"))
);
app.get("/api/geo/districts", (req, res) =>
  res.json(readJSON("districts.json"))
);
app.get("/api/geo/upazilas", (req, res) => res.json(readJSON("upazilas.json")));
app.get("/api/geo/unions", (req, res) => res.json(readJSON("unions.json")));

// Export app for Vercel
module.exports = app;
