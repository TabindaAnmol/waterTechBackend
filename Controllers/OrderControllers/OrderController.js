const orderModal = require("../../Models/OrderModals/OrderModal");
require("../../Database/dbConfig");

const createNewOrder = async (newOrder) => {
  const result = await orderModal.create(newOrder);
  return result;
};

const updateCartItem = async (cart) => {
  const result = await orderModal.updateOne({ _id: cart._id }, { $set: cart });
  return result;
};
const viewAllCartItems = async () => {
  const result = await orderModal.find();
  return result;
};

const viewSinglePlumberCartItems = async (plumberId) => {
  const result = await orderModal
    .find({
      plumberId: plumberId,
      isPurchased: false,
    })
    .populate(["plumberId", "productId"]);
  return result;
};

module.exports = {
  createNewOrder: createNewOrder,
  viewAllCartItems: viewAllCartItems,
  updateCartItem: updateCartItem,
  viewSinglePlumberCartItems: viewSinglePlumberCartItems,
};
