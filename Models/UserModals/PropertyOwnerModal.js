const references=require ("../../References/customReferences")
const propertyOwnerSchama=require("../../Schemas/UserSchemas/PropertyOwnerSchama")
const propertyOwner=new references.mongoose.model("propertyOwners",propertyOwnerSchama)
module.exports=propertyOwner;