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

// Serve Home Page
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

// All Divisions
app.get("/api/geo/divisions", (req, res) => {
  const divisions = readJSON("divisions.json");
  res.json(wrapResponse(divisions, "Successfully retrieved all divisions."));
});

// all districts
app.get("/api/geo/districts", (req, res) => {
  const districts = readJSON("districts.json");
  res.json(wrapResponse(districts, "Successfully retrieved all districts."));
});

// Districts by division
app.get("/api/geo/districts/:divisionId", (req, res) => {
  const districts = readJSON("districts.json");
  const { divisionId } = req.params;

  const filteredDistricts = districts.filter(
    (d) => d.division_id === divisionId
  );
  res.json(
    wrapResponse(
      filteredDistricts,
      `Successfully retrieved districts for division ${divisionId}.`
    )
  );
});

// All Upazilas
app.get("/api/geo/upazilas", (req, res) => {
  const upazilas = readJSON("upazilas.json");
  res.json(wrapResponse(upazilas, "Successfully retrieved all upazilas."));
});

// Upazilas by district
app.get("/api/geo/upazilas/:districtId", (req, res) => {
  const upazilas = readJSON("upazilas.json");
  const { districtId } = req.params;

  const filteredUpazilas = upazilas.filter((u) => u.district_id === districtId);

  res.json(
    wrapResponse(
      filteredUpazilas,
      `Successfully retrieved upazilas for district ${districtId}.`
    )
  );
});

// All Unions
app.get("/api/geo/unions", (req, res) => {
  const unions = readJSON("unions.json");
  res.json(wrapResponse(unions, "Successfully retrieved all unions."));
});

// Unions by Upazila ID (path parameter)
app.get("/api/geo/unions/:upazilaId", (req, res) => {
  const unions = readJSON("unions.json");
  const { upazilaId } = req.params;

  const filteredUnions = unions.filter((u) => u.upazila_id === upazilaId);

  res.json(
    wrapResponse(
      filteredUnions,
      `Successfully retrieved unions for upazila ${upazilaId}.`
    )
  );
});

// Export app for Vercel
module.exports = app;

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
