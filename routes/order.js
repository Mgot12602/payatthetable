const router = require("express").Router();
const Dish = require("../models/Dish.model");
const Menu = require("../models/Menu.model");
const authRoutes = require("./auth");
const mongoose = require("mongoose");
const Order = require("../models/Order.model");
const { findByIdAndUpdate } = require("../models/Dish.model");

router.post("/addNewOrder", (req, res, next) => {
  console.log("thi is the received object in Order Server", req.body);
  const { table } = req.body;
  Order.create({
    table,
    dishesOrdered: [],
    totalItems: 0,
    totalPrice: 0,
  }).then((createdOrder) => {
    console.log(createdOrder);
    res.json(createdOrder);
  });
});

router.post("/getOrder", (req, res, next) => {
  console.log("Received Request in getOrder ServerSide", req.body);
  console.log("req.body", req.body.table);

  Order.find({ table: req.body.table })
    .populate("dishes")
    .then((Order) => {
      console.log("this is the returned Order from backend", Order);
      res.json(Order);
    });

  //   .populate("dishes")
  //   .then((Order) => {

  //     res.json(Order);
  //   });
});

router.post("/addDishToOrder", (req, res, next) => {
  const { dishId, table } = req.body;
  console.log(`This is the DishId ${dishId}, this is the table ${table}`);
  Order.find({ table: req.body.table }).then((foundOrder) => {
    console.log("this is the found order id", foundOrder[0]._id);
    // console.log("this is the found order object", foundOrder[0]);
    // if (foundOrder[0].dishesOrdered.includes(dishId)) {
    //   console.log("it says that it already includes the dish");
    // } else {
    //   console.log("it says that still doesn't include the dish");
    // }

    console.log("dishId", dishId);

    const exists = foundOrder[0].dishesOrdered.reduce((acc, el) => {
      if (el.dishType == dishId) {
        return (acc = true);
      }
    }, false);
    console.log("exists", exists);

    if (!exists) {
      Order.findByIdAndUpdate(
        foundOrder[0]._id,
        { $addToSet: { dishesOrdered: { dishType: dishId, units: 1 } } },
        { new: true }
      )
        .populate("dishesOrdered.dishType")
        // .populate("dishesOrdered")
        .then((newAndUpdatedOrder) => {
          console.log(
            "newAndUpdatedOrder which didnt exist-->",
            newAndUpdatedOrder
          );
        });
      return;
    }
    Order.updateOne(
      { _id: foundOrder[0]._id, "dishesOrdered.dishType": dishId },
      { $inc: { "dishesOrdered.$.units": 1 } },
      { new: true }
    )
      .populate("dishesOrdered.dishType")
      // .populate("dishesOrdered")
      .then(() => {
        Order.find({ table: table }).then((newAndUpdatedOrder) => {
          console.log(
            "newAndUpdatedOrder which existed-->",
            newAndUpdatedOrder
          );
        });
      });
  });
});
// console.log(
//   "this is the returned check from find",
//   foundOrder[0].dishesOrdered.find((el) => {
//     console.log(
//       `el.dishType: ${el.dishType} == ${dishId} ==>${el.dishType == dishId}`
//     );
//     return el.dishType == dishId;
//   })
// );

module.exports = router;
