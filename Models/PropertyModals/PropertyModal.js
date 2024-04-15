const references=require ("../../References/customReferences")
const propertySchema=require("../../Schemas/PropertySchemas/PropertySchema")
const property=new references.mongoose.model("properties",propertySchema)
module.exports=property;