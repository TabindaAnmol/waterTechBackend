const cartController = require("../../Controllers/CartControllers/CartController");
const references = require("../../References/customReferences");
const app = references.express();
const formdata = references.formdata.none();
app.use(references.cors());

app.post("/addToCart", formdata, async (req, res) => {
  const { product, plumberId, quantity } = req.body;
  const alreadyInCartItem = await cartController.alreadyInCart(
    JSON.parse(product)._id
  );
  if (alreadyInCartItem) {
    const updateCartItem = await cartController.updateCartItem({
      _id: alreadyInCartItem._id,
      plumberId: plumberId,
      productId: JSON.parse(product)._id,
      quantity: Number(alreadyInCartItem.quantity) + Number(quantity),
      totalPrice:
        JSON.parse(product).price * (Number(quantity) + Number(alreadyInCartItem.quantity)),
    });
    console.log(updateCartItem);
    if (updateCartItem.modifiedCount>=1) {
      res.send({ added: true });
    } else {
      res.send({ added: false });
    }
  } else {
    const NewCartItem = await cartController.addToCart({
      plumberId: plumberId,
      productId: JSON.parse(product)._id,
      quantity: quantity,
      totalPrice: JSON.parse(product).price * quantity,
    });
    if (NewCartItem) {
      res.send({ added: true });
    } else {
      res.send({ added: false });
    }
  }
});
app.post("/viewSinglePlumberCartItems", formdata, async (req, res) => {
    const { plumberId } = req.body;
    const singlePlumberCartItems = await cartController.viewSinglePlumberCartItems(
      plumberId
    );
    if (singlePlumberCartItems.length>0) {
      res.send({ singlePlumberCartItems: singlePlumberCartItems });
    } else {
      res.send({ singlePlumberCartItems: [] });
    }
  });
  app.post("/deleteCartItem", formdata, async (req, res) => {
    const deletedItem = await cartController.deleteCartItem(req.body);
    console.log(deletedItem)
    if (deletedItem.acknowledged && deletedItem.deletedCount>0) {
      res.send({ deleted: true });
    } else {
      res.send({ deleted: false });
    }
  });  
  app.post("/updateCartItemQuantity", formdata, async (req, res) => {
    const { _id,quantity,product } = req.body;
    const updateItem = await cartController.updateCartItem({
      _id:_id,
      quantity:quantity,
      totalPrice:JSON.parse(product).productId.price*quantity
    });
    console.log(updateItem)
    if (updateItem.modifiedCount>0) {
      res.send({ updated: true });
    } else {
      res.send({ updated: false });
    }
  });  

module.exports = app;
