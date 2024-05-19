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
      plumberId: plumberId,
      orderId: newOrder._id,
      isPurchased: true,
    });
    console.log(cartItems);
    if (cartItems.modifiedCount > 0) {
      res.send({ added: true });
    }
  } else {
    res.send({ added: false });
  }
});
app.post("/viewPlumberOrders", formdata, async (req, res) => {
  const { plumberId, status } = req.body;
  console.log(req.body);
  const plumberOrders = await orderController.viewPlumberOrders(
    plumberId,
    status
  );
  if (plumberOrders.length > 0) {
    res.send({ plumberOrders: plumberOrders });
  } else {
    res.send({ plumberOrders: [] });
  }
});
app.post("/viewSingleOrderDetail", formdata, async (req, res) => {
  const { orderId } = req.body;
  console.log(req.body);
  const orderDetail = await orderController.viewSingleOrderDetail(orderId);
  if (orderDetail) {
    res.send({ orderDetail: orderDetail });
  } else {
    res.send({ orderDetail: {} });
  }
});
app.post("/viewAllOrdersWithStatus", formdata, async (req, res) => {
  const { status } = req.body;
  console.log(req.body);
  const orders = await orderController.viewAllOrdersWithStatus(status);
  if (orders.length > 0) {
    res.send({ orders: orders });
  } else {
    res.send({ orders: [] });
  }
});
app.post("/updateOrder", formdata, async (req, res) => {
  console.log(req.body);
  const isUpdated = await orderController.updateOrder(req.body);
  if (isUpdated.modifiedCount >= 1) {
    res.send({ updated: true });
  } else {
    res.send({ updated: false });
  }
});

module.exports = app;
