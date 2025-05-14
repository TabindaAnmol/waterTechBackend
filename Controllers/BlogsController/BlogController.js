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
const viewSingleBlogDetail = async (slug) => {
  const result = await blogModel
    .findOne({ slug: slug})
  return result;
};
const updateBlog= async (blog) => {
  const result=await blogModel.updateOne({_id:_id},{$set:blog})
  return result;
};
// const deleteBlog= async (delId) => {
//   const result=await blogModel.deleteOne(delId)
//   return result;
// };

module.exports = {
  viewAllBlogs:viewAllBlogs,
  createBlog:createBlog,
  viewSingleBlogDetail:viewSingleBlogDetail,
  updateBlog:updateBlog,

};
