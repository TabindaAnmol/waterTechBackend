const references=require ("../../References/customReferences")
const jobSchema=require("../../Schemas/JobSchema/JobSchema")
const job=new references.mongoose.model("jobs",jobSchema)
module.exports=job;