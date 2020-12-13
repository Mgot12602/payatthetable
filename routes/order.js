const router = require("express").Router();
const Dish = require("../models/Dish.model");
const Menu = require("../models/Menu.model");
const authRoutes = require("./auth");
const mongoose = require("mongoose");
const Order = require("../models/Order.model");

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

module.exports = router;
