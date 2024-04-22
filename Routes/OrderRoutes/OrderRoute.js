const orderController = require("../../Controllers/OrderControllers/OrderController");
const cartController = require("../../Controllers/CartControllers/CartController");
const references = require("../../References/customReferences");
const app = references.express();
const formdata = references.formdata.none();
app.use(references.cors());

app.post("/createNewOrder", formdata, async (req, res) => {
  const { plumberId, totalAmount, subtotalAmount, shippingAddress } = req.body;
  const newOrder = await orderController.createNewOrder({
    plumberId: plumberId,
    totalAmount: totalAmount,
    subtotalAmount: subtotalAmount,
    shippingAddress: shippingAddress,
  });
  if (newOrder) {
    const cartItems = await cartController.updateOrderId({
        plumberId:plumberId,
        orderId:newOrder._id,
        isPurchased: true,
    });
    console.log(cartItems)
    if(cartItems.modifiedCount>0){
        res.send({ added: true });
    }
  } else {
    res.send({ added: false });
  }
});
// app.post("/viewSinglePlumberCartItems", formdata, async (req, res) => {
//     const { plumberId } = req.body;
//     const singlePlumberCartItems = await orderController.viewSinglePlumberCartItems(
//       plumberId
//     );
//     if (singlePlumberCartItems.length>0) {
//       res.send({ singlePlumberCartItems: singlePlumberCartItems });
//     } else {
//       res.send({ singlePlumberCartItems: [] });
//     }
//   });

//   app.post("/updateCartItemQuantity", formdata, async (req, res) => {
//     const { _id,quantity,product } = req.body;
//     const updateItem = await orderController.updateCartItem({
//       _id:_id,
//       quantity:quantity,
//       totalPrice:JSON.parse(product).productId.price*quantity
//     });
//     console.log(updateItem)
//     if (updateItem.modifiedCount>0) {
//       res.send({ updated: true });
//     } else {
//       res.send({ updated: false });
//     }
//   });

module.exports = app;
