const { Schema, model } = require("mongoose");

const dishSchema = new Schema({
  name: String,
  description: String,
  tags: String,
  format: String,
  picture_url: String,
  stock: String,
});

const Dish = model("Dish", dishSchema);

module.exports = Dish;
