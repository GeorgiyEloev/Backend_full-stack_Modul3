const mongoose = require("mongoose");

const { Schema } = mongoose;

const shopSchema = new Schema({
  shop: String,
  date: String,
  money: String,
});

module.exports = Shop = mongoose.model("shops", shopSchema);
