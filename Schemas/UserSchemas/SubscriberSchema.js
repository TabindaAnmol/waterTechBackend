const references=require("../../References/customReferences")
const subscriberSchema=references.mongoose.Schema({
    "status":{type:Number,default:0},//0 Hold ,1 Approved ,2 Decline
    "name":String,
    "email":String,
    "phoneNumber":String,
    "portfolio":String,
    "message":String
   
}, {
    timestamps:{createdAt:'created_at',updatedAt:'updated_at'},
})

module.exports=subscriberSchema;