const references=require('../../References/customReferences.js')
const propertyOwnerSchema=references.mongoose.Schema({
    "status":{type:Number,default:0},
    "address":String,
    "country":String,
    "city":String,
    "state":String,
    "zipcode":String,
    "noOfLines":{type:Number,default:0},
    "approvedDate":{type:Date,default:null},  
    "assignedSolutions":String,
    "certificate":{type:String,default:null},
    // "societiesId":[{
    //     type:references.mongoose.Schema.Types.ObjectId,
    //     ref:"Societies",
    //     required:true
    // }],
}, {
    timestamps:{createdAt:'created_at',updatedAt:'updated_at'},
})
module.exports=propertyOwnerSchema;