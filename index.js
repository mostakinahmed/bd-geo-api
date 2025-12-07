const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

app.get("/api/divisions", (req, res) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "data/divisions.json"))
  );
  res.json(data);
});

app.get("/api/districts", (req, res) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "data/districts.json"))
  );
  res.json(data);
});

app.get("/api/upazilas", (req, res) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "data/upazilas.json"))
  );
  res.json(data);
});

app.get("/api/unions", (req, res) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "data/unions.json"))
  );
  res.json(data);
});

// IMPORTANT: No app.listen() on Vercel
module.exports = app;
