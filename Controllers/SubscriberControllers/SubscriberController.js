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

module.exports = {
  createSubscriber,
  isSubscriberLoggedin,
};
