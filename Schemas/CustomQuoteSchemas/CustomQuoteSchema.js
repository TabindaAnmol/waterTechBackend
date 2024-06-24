const references=require("../../References/customReferences")
const customQouteSchema=references.mongoose.Schema({
    "status":{type:Number,default:0},//0 Hold ,1 Approved ,2 Decline
    "firstName":{type:String,default:''},
    "lastName":{type:String,default:''},
    "email":{type:String,},
    "phoneNumber":{type:String,default:''},
    "companyName":{type:String,default:''},
    "title":{type:String,default:''},
    "contactedReason":{type:String,},
    "interestedTechnology":{type:String,},
    "message":{type:String,default:''}
   
}, {
    timestamps:{createdAt:'created_at',updatedAt:'updated_at'},
})

module.exports=customQouteSchema;