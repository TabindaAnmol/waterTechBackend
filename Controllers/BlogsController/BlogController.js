const blogModel = require("../../Models/BlogModals/BlogModal");
require("../../Database/dbConfig")

const viewAllBlogs= async () => {
  const result=await blogModel.find()
  return result;
};

const createBlog= async (blog) => {
  const result=await blogModel.create(blog)
  return result;
};
// const deleteCategories= async (delId) => {
//   const result=await blogModel.deleteOne(delId)
//   return result;
// };
// const updateCategories= async (category) => {
//   const result=await blogModel.updateOne({_id:category._id},{$set:category})
//   return result;
// };


module.exports = {
  viewAllBlogs:viewAllBlogs,
  createBlog:createBlog,
  // deleteCategories:deleteCategories,
  // updateCategories:updateCategories,
};
