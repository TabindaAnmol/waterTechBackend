const references=require ("../../References/customReferences")
const adminSchema=require("../../Schemas/UserSchemas/AdminSchema")
const admin=new references.mongoose.model("admins",adminSchema)
module.exports=admin;