const references=require ("../../References/customReferences")
const ProductSchema=require("../../Schemas/ProductSchemas/ProductSchemas")
const Product=new references.mongoose.model("Products",ProductSchema)
module.exports=Product;