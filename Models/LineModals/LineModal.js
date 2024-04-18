const references=require ("../../References/customReferences")
const lineSchema=require("../../Schemas/LineSchema/LineSchema")
const line=new references.mongoose.model("lines",lineSchema)
module.exports=line;