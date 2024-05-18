const references=require("../../References/customReferences")
const subscriberSchema=references.mongoose.Schema({
    "status":{type:Number,default:0},//0 Hold ,1 Approved ,2 Decline
    "name":{type:String,default:''},
    "email":{type:String,},
    "phoneNumber":{type:String,default:''},
    "portfolio":[{type:String,default:''}],
    "otherPortfolio":{type:String,default:''},
    "message":{type:String,default:''}
   
}, {
    timestamps:{createdAt:'created_at',updatedAt:'updated_at'},
})

module.exports=subscriberSchema;