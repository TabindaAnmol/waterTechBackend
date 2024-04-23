const references = require("../../References/customReferences");
const cartController = require("../../Controllers/CartControllers/CartController");
const app = references.express();
const formdata = references.formdata.none();

//////////////////////////Payment Using Stripe////////////////////////////////
// app.post("/paymentWithStripe", formdata, async (req, res) => {
//   console.log(req.body.amount);
//   const paymentIntent = await references.stripe.paymentIntents.create({
//     amount: Number(req.body.amount) * 100,
//     currency: "USD",
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });
//   res.send({
//     paymentIntent: paymentIntent.client_secret,
//     publishableKey: references.publishableKey,
//   });
// });

app.post("/paymentWithStripe", formdata, async (req, res) => {
  const { plumberId } = req.body;
  let cartItemForStripe = [];
  const myCartItems = await cartController.viewSinglePlumberCartItems(plumberId);
  console.log(myCartItems)
  myCartItems.map((item) => {
    cartItemForStripe.push({
      price_data: {
        currency: "USD",
        unit_amount: item.productId.price * 100,
        product_data: {
          name: item.productId.title,
        },
      },
      quantity: item.quantity,
    });
  });
  console.log(cartItemForStripe);
  const session = await references.stripe.checkout.sessions.create({
    line_items: cartItemForStripe,
    mode: "payment",
    success_url: `http://localhost:3000/success`,
    cancel_url: `http://localhost:3000/cart`,
  });
//   console.log(session)
  res.send({ url: session.url });
});

module.exports = app;
