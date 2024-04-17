const categoryModel = require("../../Models/CategoryModals/CategoryModal");
require("../../Database/dbConfig")

const addCategories= async (newCategory) => {
  const result=await categoryModel.create(newCategory)
  return result;
};
const deleteCategories= async (delId) => {
  const result=await categoryModel.deleteOne(delId)
  return result;
};
const updateCategories= async (category) => {
  const result=await categoryModel.updateOne({_id:category._id},{$set:category})
  return result;
};
const viewAllCategories= async () => {
  const result=await categoryModel.find()
  return result;
};

module.exports = {
  addCategories:addCategories,
  deleteCategories:deleteCategories,
  updateCategories:updateCategories,
  viewAllCategories:viewAllCategories,
};
