const fs = require("fs");
const path = require("path");

const divisionsFile = path.join(__dirname, "../data/divisions.json");
const districtsFile = path.join(__dirname, "../data/districts.json");
const upazilasFile = path.join(__dirname, "../data/upazilas.json");
const unionsFile = path.join(__dirname, "../data/unions.json");

const readJSON = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf-8"));

module.exports = {
  getDivisions: (req, res) => {
    const divisions = readJSON(divisionsFile);

    res.json({
      success: true,
      data: divisions,
      message: "Successfully retrieved all divisions.",
      count: divisions.length,
      timestamp: new Date().toISOString(),
    });
  },

  getDistricts: (req, res) => {
    const districts = readJSON(districtsFile);
    const { division_id } = req.query;

    let filtered = districts;
    if (division_id) {
      filtered = districts.filter((d) => d.division_id == division_id);
    }

    res.json({
      success: true,
      data: filtered,
      message: division_id
        ? `Successfully retrieved districts for division ID ${division_id}.`
        : "Successfully retrieved all districts.",
      count: filtered.length,
      timestamp: new Date().toISOString(),
    });
  },

  getUpazilas: (req, res) => {
    const upazilas = readJSON(upazilasFile);
    const { district_id } = req.query;

    let filtered = upazilas;
    if (district_id) {
      filtered = upazilas.filter((u) => u.district_id == district_id);
    }

    res.json({
      success: true,
      data: filtered,
      message: district_id
        ? `Successfully retrieved upazilas for district ID ${district_id}.`
        : "Successfully retrieved all upazilas.",
      count: filtered.length,
      timestamp: new Date().toISOString(),
    });
  },

  getUnions: (req, res) => {
    const unions = readJSON(unionsFile);
    const { upazila_id } = req.query;

    let filtered = unions;
    if (upazila_id) {
      filtered = unions.filter((u) => u.upazila_id == upazila_id);
    }

    res.json({
      success: true,
      data: filtered,
      message: upazila_id
        ? `Successfully retrieved unions for upazila ID ${upazila_id}.`
        : "Successfully retrieved all unions.",
      count: filtered.length,
      timestamp: new Date().toISOString(),
    });
  },
};
