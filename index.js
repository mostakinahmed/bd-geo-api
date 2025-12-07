const express = require("express");
const path = require("path");
const dataRoutes = require("./routes/dataRoutes");
const locationRoutes = require("./routes/locationRoutes"); // divisions, districts, upazilas, unions

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api", dataRoutes); // all other APIs
app.use("/api/geo", locationRoutes); // location APIs under /api/geo

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
