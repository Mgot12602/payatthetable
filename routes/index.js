const router = require("express").Router();
const Dish = require("../models/Dish.model");
const authRoutes = require("./auth");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post("/newDish", (req, res, next) => {
  const { name, description, tags, format, picture_url, stock } = req.body;
  Dish.create({
    name,
    description,
    tags,
    format,
    picture_url,
    stock,
  }).then((createdDish) => {
    console.log("created Dish", createdDish);
    res.json(createdDish);
  });
});

router.get("/getAllDishes", (req, res, next) => {
  Dish.find()
  .then((allDishes) => {
    res.json(allDishes);
  });
  // Questions.find({}).then(allQuestions=>{
  console.log("allDishes", allDishes);
  //   res.json(allQuestions);
  // })
});

router.use("/auth", authRoutes);

module.exports = router;
