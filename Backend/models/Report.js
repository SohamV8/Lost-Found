const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  id: String,
  itemName: String,
  itemImg: String,
  itemDesc: String,
  itemDate: Date,
  itemCategory: String,
  itemStatus: String,
  itemLocation: String
});

const Lost = mongoose.model('Lost', reportSchema);
const Found = mongoose.model('Found', reportSchema);

module.exports = { Lost, Found };
