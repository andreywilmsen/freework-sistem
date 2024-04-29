const mongoose = require("mongoose");

let pointerSchema = new mongoose.Schema({
  name: { type: String, minlenght: 3, maxlenght: 50 },
  register: { type: Array, required: true },
  createdAt: { type: Date, required: true, default: Date.now() },
});

module.exports = Pointer = mongoose.model("Pointer", pointerSchema);
