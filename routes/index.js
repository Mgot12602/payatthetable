const router = require("express").Router();
const Dish = require("../models/Dish.model");
const Menu = require("../models/Menu.model");
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

// router.get("/getMenu")

router.post("/addDishToMenu", (req, res, next) => {
  // const { id } = req.body[0]._id;

  console.log("req.body", req.body);
  // console.log("id", req.body[0]._id);
  // Dish.findById(req.body[0]._id)
  //   .then((dishToAdd) => {
  //     console.log("Added Dish", dishToAdd);
  console.log("req.body.user", req.body.user._id);
  // Menu.find({ user: req.body.user._id }).then((foundMenu) => {
  // console.log("found this menu", foundMenu);
  Menu.updateOne(
    { user: req.body.user._id },
    { $addToSet: { dishes: req.body.filteredDish[0]._id } },
    { new: true }
  )
    .then((newAndUpdatedMenu) => {
      console.log("This is the updated menu", newAndUpdatedMenu);
      res.json(newAndUpdatedMenu);
    })
    .catch((err) => console.log(err));
  // });
  // });

  // Update the menu object of the user
  // 1st find the menu using the user's id
  // 2nd - findByIdAndUpdate with the dish

  //res.json(createdDish);
});
//

router.get("/getAllDishes", (req, res, next) => {
  Dish.find({}).then((allDishes) => {
    res.json(allDishes);
    // console.log("allDishes", allDishes);
  });
  // Questions.find({}).then(allQuestions=>{
  // console.log("allDishes", allDishes);
  //   res.json(allQuestions);
  // })
});

// Questions.find({}).then(allQuestions=>{

//   res.json(allQuestions);
// })

router.use("/auth", authRoutes);

module.exports = router;
