const references=require ("../../References/customReferences")
const employeeSchema=require("../../Schemas/UserSchemas/EmployeeSchema")
const employee=new references.mongoose.model("employees",employeeSchema)
module.exports=employee;