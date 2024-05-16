const references=require ("../../References/customReferences")
const subscriberSchema=require("../../Schemas/UserSchemas/SubscriberSchema")
const subscriber=new references.mongoose.model("subscribers",subscriberSchema)
module.exports=subscriber;