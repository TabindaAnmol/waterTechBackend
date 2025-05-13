const references=require ("../../References/customReferences")
const blogSchema=require("../../Schemas/BlogsSchema/BlogSchema")

const blog=new references.mongoose.model("Blogs",blogSchema)
module.exports=blog;


