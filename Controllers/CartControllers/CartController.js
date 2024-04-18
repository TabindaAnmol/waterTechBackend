const cartModal = require("../../Models/CartModals/CartModal");
require("../../Database/dbConfig");

const addToCart = async (newItem) => {
  const result = await cartModal.create(newItem);
  return result;
};
const deleteFormCart = async (delId) => {
  const result = await cartModal.deleteOne(delId);
  return result;
};
const updateCartItem= async (cart) => {
  const result=await cartModal.updateOne({_id:cart._id},{$set:cart})
  return result;
};
const viewAllCartItems = async () => {
  const result = await cartModal.find();
  return result;
};
const alreadyInCart = async (productId) => {
    const result = await cartModal.findOne({productId:productId,isPurchased:false});
    return result;
  };

module.exports = {
  addToCart: addToCart,
  deleteFormCart: deleteFormCart,
  viewAllCartItems: viewAllCartItems,
  alreadyInCart:alreadyInCart,
  updateCartItem: updateCartItem,
};
