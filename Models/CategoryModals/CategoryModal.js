const references=require ("../../References/customReferences")
const categorySchema=require("../../Schemas/CategorySchemas/CategorySchema")
const category=new references.mongoose.model("Categories",categorySchema)
module.exports=category;


