const express = require("express");
const router = express();
const { resolve } = require("path");
const Order = require("../models/Order.model");
// This is your real test set API key.
const stripe = require("stripe")(
  "sk_test_51Hw8omAFjvuOhmpPSz9t9gPd62wSZU7O2cGW1zDSqTjLTxpNjeaNDgHfLveijeUMRYHZ5dwH0jZ7D4u8oO8ZO8x700LD0irtuI"
);

router.use(express.static("."));
router.use(express.json());

router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  console.log("items in stripe", items);

  Order.find({ table: items })
    .populate("dishesOrdered.dishType")
    .then((Order) => {
      console.log("this is the returned in stripe", Order[0]);
      const total = Order[0].dishesOrdered.reduce((acc, el) => {
        return acc + el.units * el.dishType.price * 100;
      }, 0);
      console.log(total);

      // console.log("total in calulateOrderAmount",total)
      // return total;
      console.log("total outside", total);

      stripe.paymentIntents
        .create({
          amount: total,
          currency: "eur",
        })
        .then((paymentIntent) => {
          res.send({ clientSecret: paymentIntent.client_secret });
        });
    });
});

// ate a PaymentIntent with the order amount and currency

//   const paymentIntent = await stripe.paymentIntents.ate({
//     amount: calculateOrderAmount(items),
//     currency: "eur",

//   });
//   res.send({

// });

module.exports = router;
