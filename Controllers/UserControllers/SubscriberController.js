require("../../Database/dbConfig");
const subscriberModal = require("../../Models/UserModals/SubscriberModal");

const createSubscriber = async (user) => {
  console.log(user);
  const result = await subscriberModal.create(user);
  return result;
};
const isSubscriberLoggedin = async (user) => {
  console.log(user);
  const subscriber = await subscriberModal.findOne(user);
  return subscriber;
};
const viewAllSubscriberWithStatus = async (status) => {
  const result = await subscriberModal.find({ status: status });
  return await result;
};
const updateSubscriberProfile = async (updatedUser) => {
  const result = await subscriberModal.updateOne(
    { _id: updatedUser._id },
    { $set: updatedUser }
  );
  console.log(result);
  console.log(result.acknowledged);
  console.log(result.modifiedCount);
  return result.modifiedCount;
};
const activeSubscribers = async () => {
  const result = await subscriberModal.find({'status':1}).count();
  return await result;
};
module.exports = {
  createSubscriber,
  isSubscriberLoggedin,
  viewAllSubscriberWithStatus,
updateSubscriberProfile,
activeSubscribers,
};
