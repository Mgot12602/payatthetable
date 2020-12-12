const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const menuSchema = new Schema({
  user: { type: ObjectId, ref: "User" },
  dishes: [{ type: ObjectId, ref: "Dish" }],
});

const Menu = model("Menu", menuSchema);

module.exports = Menu;
