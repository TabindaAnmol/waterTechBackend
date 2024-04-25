require("../../Database/dbConfig");
const notificationModal = require("../../Models/NotificationModals/NotificationModal");

const createPropertyOwnerNotification= async (notification) => {
  console.log(notification);
  const result = await notificationModal.propertyOwnerNotification.create(notification);
  return result;
};
const createPlumberNotification= async (notification) => {
  console.log(notification);
  const result = await notificationModal.plumberNotification.create(notification);
  return result;
};
const propertyOwnerNotifications = async (propertyOwnerId) => {
  const result = await notificationModal.propertyOwnerNotification
    .find({ propertyOwnerId: propertyOwnerId })
    .populate(["propertyOwnerId"]);
  console.log(result)
  return result;
};
const plumberNotifications = async (plumberId) => {
  const result = await notificationModal.plumberNotification
    .find({ plumberId: plumberId })
    .populate(["plumberId"]);
  console.log(result)
  return result;
};



module.exports = {
  createPropertyOwnerNotification,
  createPlumberNotification,
  propertyOwnerNotifications,
  plumberNotifications,
};
