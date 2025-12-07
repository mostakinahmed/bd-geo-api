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
// Helper to wrap JSON response
function wrapResponse(data, message = "Successfully retrieved data") {
  return {
    success: true,
    data,
    message,
    count: Array.isArray(data) ? data.length : 1,
    timestamp: new Date().toISOString(),
  };
}

// API Routes
app.get("/api/geo/divisions", (req, res) => {
  const divisions = readJSON("divisions.json");
  res.json(wrapResponse(divisions, "Successfully retrieved all divisions."));
});

app.get("/api/geo/districts", (req, res) => {
  const districts = readJSON("districts.json");
  res.json(wrapResponse(districts, "Successfully retrieved all districts."));
});

app.get("/api/geo/upazilas", (req, res) => {
  const upazilas = readJSON("upazilas.json");
  res.json(wrapResponse(upazilas, "Successfully retrieved all upazilas."));
});

app.get("/api/geo/unions", (req, res) => {
  const unions = readJSON("unions.json");
  res.json(wrapResponse(unions, "Successfully retrieved all unions."));
});

// Export app for Vercel
module.exports = app;
