const references=require ("../../References/customReferences")
const plumberSchema=require("../../Schemas/UserSchemas/PlumberSchema")
const plumber=new references.mongoose.model("plumbers",plumberSchema)
module.exports=plumber;