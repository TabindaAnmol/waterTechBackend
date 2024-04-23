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
const viewSingleOrderDetail = async (orderId) => {
  const result = await orderModal
    .findOne({
      _id: orderId,
    })
    .populate([
      {
        path: "cartItems",
        populate: {
          path: "productId",
          populate: { path: "categoryId" },
        },
      },
      { path: "plumberId" },
    ]);

  return result;
};
const viewPlumberOrders = async (plumberId, status) => {
  const result = await orderModal
    .find({
      plumberId: plumberId,
      status: status,
    })
    .populate([
      {
        path: "cartItems",
        populate: {
          path: "productId",
          populate: { path: "categoryId" },
        },
      },
      { path: "plumberId" },
    ]);

  return result;
};

module.exports = {
  createNewOrder: createNewOrder,
  viewAllCartItems: viewAllCartItems,
  updateCartItem: updateCartItem,
  viewPlumberOrders: viewPlumberOrders,
  viewSingleOrderDetail:viewSingleOrderDetail,
};
