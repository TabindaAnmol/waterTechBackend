const references=require ("../../References/customReferences")
const categorySchema=require("../../Schemas/CategorySchemas/CategorySchema")
// serviceSchema.virtual('feedbacks', {
//     ref: 'CustomerFeedback',
//     localField: '_id',
//     foreignField: 'serviceId',
//   });
  
//   serviceSchema.set("toObject", {
//     virtuals: true,
//     transform: function (doc, ret) {
//       delete ret.id;
//     },
//   });
//   serviceSchema.set("toJSON", {
//     virtuals: true,
//     transform: function (doc, ret) {
//       delete ret.id;
//     },
//   });
const category=new references.mongoose.model("Categories",categorySchema)
module.exports=category;


