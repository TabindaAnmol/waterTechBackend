const references=require("../../References/customReferences")
const categorySchema=references.mongoose.Schema({
    "title":String,
    "categoryImage":{type:String,default:null},
}, {
   timestamps:{createdAt:'created_at',updatedAt:'updated_at'},
})

module.exports=categorySchema;