const references=require("../../References/customReferences")
const employeeSchema=references.mongoose.Schema({
    "status":{type:Number,default:0},//0 Hold ,1 Approved ,2 Decline
    "name":String,
    "email":String,
    "phoneNumber":String,
    "role":String,
    "cv":String, //Property Owner , Property Manager , Agent , Facility Manager ,Cost Savings Company 
   
}, {
    timestamps:{createdAt:'created_at',updatedAt:'updated_at'},
})

module.exports=employeeSchema;