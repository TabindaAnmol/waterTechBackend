const references=require("../../References/customReferences")
const plumberSchema=references.mongoose.Schema({
    "name":String,
    "password":String,
}, {
    timestamps:{createdAt:'created_at',updatedAt:'updated_at'},
})
module.exports=plumberSchema;