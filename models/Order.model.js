const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const orderSchema = new Schema({
  table: Number,

  dishesOrdered: [{ type: ObjectId, ref: "Dish" }, { units: Number }],
  totalItems: Number,
  totalPrice: Number,
});

const Order = model("Order", orderSchema);

module.exports = Order;
