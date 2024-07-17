const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  symbol: String,
  price: Number,
  timestamp: Date,
});

const Data = mongoose.model('Data', DataSchema);
module.exports = Data;
