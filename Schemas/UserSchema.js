const references=require("../References/customReferences")
const adminSchema=references.mongoose.Schema({
    "name":String,
    "password":String,
}, {
    timestamps:{createdAt:'created_at',updatedAt:'updated_at'},
})
module.exports=adminSchema;