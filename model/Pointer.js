const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pointerSchema = new Schema({
  name: { type: String, minlenght: 3, maxlenght: 50 },
  register: [{
    mes: Number,
    days: [{
      data: String, 
      pointers: [String]
    }]
  }]
});

const Pointer = mongoose.model('Pointer', pointerSchema);

module.exports = Pointer;
