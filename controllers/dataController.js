const fs = require("fs");
const path = require("path");
const dataFile = path.join(__dirname, "../data/data.json");

const readData = () => JSON.parse(fs.readFileSync(dataFile, "utf-8"));
const writeData = (data) =>
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

module.exports = {
  getData: (req, res) => {
    const data = readData();
    res.json(data);
  },

  addData: (req, res) => {
    const data = readData();
    const newItem = { id: Date.now(), ...req.body };
    data.push(newItem);
    writeData(data);
    res.json(newItem);
  },

  updateData: (req, res) => {
    const data = readData();
    const index = data.findIndex((item) => item.id == req.params.id);
    if (index !== -1) {
      data[index] = { ...data[index], ...req.body };
      writeData(data);
      res.json(data[index]);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  },

  deleteData: (req, res) => {
    let data = readData();
    const index = data.findIndex((item) => item.id == req.params.id);
    if (index !== -1) {
      const deleted = data.splice(index, 1);
      writeData(data);
      res.json(deleted[0]);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  },
};
