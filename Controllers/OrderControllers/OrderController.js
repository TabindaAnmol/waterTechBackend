const orderModal = require("../../Models/OrderModals/OrderModal");
require("../../Database/dbConfig");

const createNewOrder = async (newOrder) => {
  const result = await orderModal.create(newOrder);
  return result;
};
const updateOrder = async (order) => {
  const result = await orderModal.updateOne(
    { _id: order._id },
    { $set: order }
  );
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
const viewAllOrdersWithStatus = async (status) => {
  const result = await orderModal
    .find({
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
  updateOrder: updateOrder,
  viewPlumberOrders: viewPlumberOrders,
  viewSingleOrderDetail: viewSingleOrderDetail,
  viewAllOrdersWithStatus: viewAllOrdersWithStatus,
};
