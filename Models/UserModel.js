const references=require ("../References/customReferences")
const userSchema=require("../Schemas/UserSchema")
const admin=new references.mongoose.model("users",userSchema)
module.exports=admin;