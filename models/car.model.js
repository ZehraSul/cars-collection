// Schema for mongoose

const mongoose = require("mongoose");

let carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: Number, required: true },
  registration: { type: String, required: true },
  owner: { type: String, required: true },
});

module.exports = mongoose.model("Cars", carSchema);
