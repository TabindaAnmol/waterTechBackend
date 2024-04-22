const references=require ("../../References/customReferences")
const orderSchema=require("../../Schemas/OrdersSchemas/OrderSchema")
const order=new references.mongoose.model("orders",orderSchema)
module.exports=order;