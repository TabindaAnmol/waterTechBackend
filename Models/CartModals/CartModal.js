const references=require ("../../References/customReferences")
const cartSchema=require("../../Schemas/CartSchemas/CartSchema")
const cart=new references.mongoose.model("carts",cartSchema)
module.exports=cart;