const productModal = require("../../Models/ProductModals/ProductModal");
require("../../Database/dbConfig");

const addProduct = async (newProduct) => {
  const result = await productModal.create(newProduct);
  return result;
};
const updateProduct = async (product) => {
  const result = await productModal.updateOne(
    { _id: product._id },
    { $set: product }
  );
  return result;
};
const deleteProduct = async (delId) => {
  const result = await productModal.updateOne(
    { _id: delId },
    { $set: { status: "notAvailable" } }
  );
  return result;
};
const viewAllProducts = async (page,pageLimit) => {
  const startIndex = (page - 1) * pageLimit;
  const result = await productModal.find({ status: "available" }).limit(pageLimit).skip(startIndex);
  const count = await productModal.count();
  return {
    result:result,
    count:count
  };
};
const viewSingleCategoryProducts = async (categoryId,page,pageLimit) => {
  const startIndex = (page - 1) * pageLimit;
  const result = await productModal.find({status: "available",categoryId: categoryId}).limit(pageLimit).skip(startIndex);
  const count = await productModal.find({status: "available",categoryId: categoryId}).count();
  return {
    result:result,
    count:count
  };
};
const viewSearchedProducts = async (searchItem) => {
  return await productModal.find({
    $or: [{ title: { $regex: searchItem, $options: "i" } }]
  })
};

module.exports = {
  addProduct: addProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  viewAllProducts: viewAllProducts,
  viewSingleCategoryProducts: viewSingleCategoryProducts,
  viewSearchedProducts: viewSearchedProducts,
};
