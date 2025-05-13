const references=require("../../References/customReferences")
const blogSchema=references.mongoose.Schema({
    "title":String,
    "description":String,
    "keywords":String,
    "blogImage":{type:String,default:null},
}, {
   timestamps:{createdAt:'created_at',updatedAt:'updated_at'},
})

module.exports=blogSchema;