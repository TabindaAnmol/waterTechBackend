const references=require ("../../References/customReferences")
const customQuoteSchema=require("../../Schemas/CustomQuoteSchemas/CustomQuoteSchema")
const customQuote=new references.mongoose.model("customquotes",customQuoteSchema)
module.exports=customQuote;