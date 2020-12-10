const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const menuSchema = new Schema({
  menu: [{ type: ObjectId, ref: "Dish" }],
});

const Menu = model("Menu", menuSchema);

module.exports = Menu;
