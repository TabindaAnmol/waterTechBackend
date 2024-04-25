const references = require("../../References/customReferences");
const cartController = require("../../Controllers/CartControllers/CartController");
const app = references.express();
const formdata = references.formdata.none();

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
  const session = await references.stripe.checkout.sessions.create({
    line_items: cartItemForStripe,
    mode: "payment",
    success_url: `http://192.168.1.15:3000/success?sc_checkout=success&sc_sid={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://192.168.1.15:3000/error?sc_checkout=cancel`,
  });
  res.send({ sessionId: session.id });
});

module.exports = app;




 //////////////Aghr kam simple web view ky sath krna h tb yeh code use krna h simply url send krna h
  // res.send({ url: session.url });
  //////////////Aghr kam check out web view ky sath krna h tb yeh code use krna h simply sessionId send krna h
