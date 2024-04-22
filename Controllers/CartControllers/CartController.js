const cartModal = require("../../Models/CartModals/CartModal");
require("../../Database/dbConfig");

const addToCart = async (newItem) => {
  const result = await cartModal.create(newItem);
  return result;
};
const deleteCartItem = async (delId) => {
  const result = await cartModal.deleteOne(delId);
  return result;
};
const updateCartItem = async (cart) => {
  const result = await cartModal.updateOne({ _id: cart._id }, { $set: cart });
  return result;
};
const updateOrderId = async (cart) => {
  const result = await cartModal.updateMany(
    { plumberId: cart.plumberId, isPurchased: false, orderId: null },
    { $set: cart }
  );
  return result;
};
const viewAllCartItems = async () => {
  const result = await cartModal.find();
  return result;
};
const alreadyInCart = async (productId) => {
  const result = await cartModal.findOne({
    productId: productId,
    isPurchased: false,
    orderId: null
  });
  return result;
};
const viewSinglePlumberCartItems = async (plumberId) => {
  const result = await cartModal
    .find({
      plumberId: plumberId,
      isPurchased: false,
      orderId: null,
    })
    .populate(["plumberId", "productId"]);
  return result;
};

module.exports = {
  addToCart: addToCart,
  deleteCartItem: deleteCartItem,
  viewAllCartItems: viewAllCartItems,
  alreadyInCart: alreadyInCart,
  updateCartItem: updateCartItem,
  viewSinglePlumberCartItems: viewSinglePlumberCartItems,
  updateOrderId:updateOrderId
};
