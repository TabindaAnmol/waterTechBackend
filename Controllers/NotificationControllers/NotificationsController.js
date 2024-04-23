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



module.exports = {
  createPropertyOwnerNotification,
  createPlumberNotification,
};
