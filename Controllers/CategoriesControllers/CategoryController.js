const categoryModel = require("../../Models/CategoryModals/CategoryModal");
require("../../Database/dbConfig")

const addCategories= async (newCategory) => {
  const result=await categoryModel.create(newCategory)
  console.log(result)
  return result;
};
const deleteCategories= async (delId) => {
  const result=await categoryModel.deleteOne(delId)
  console.log(result)
  return result;
};
const updateCategories= async (category) => {
  const result=await categoryModel.updateOne({_id:category._id},{$set:category})
  console.log(result)
  return result;
};
const viewAllCategories= async () => {
  const result=await categoryModel.find().populate("serviceProviders")
  console.log(result)
  return result;
};





module.exports = {
  addCategories:addCategories,
  deleteCategories:deleteCategories,
  updateCategories:updateCategories,
  viewAllCategories:viewAllCategories,
};
