const references=require ("../../References/customReferences")
const notificationSchema=require("../../Schemas/NotificationSchema/NotificationSchema")
const propertyOwnerNotification=new references.mongoose.model("propertyOwnerNotifications",notificationSchema)
const plumberNotification=new references.mongoose.model("plumberNotifications",notificationSchema)
module.exports={
    propertyOwnerNotification,
    plumberNotification,
}