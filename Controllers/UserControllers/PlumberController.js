const plumberModal = require("../../Models/UserModals/PlumberModal");
require("../../Database/dbConfig");

const createPlumber = async (user) => {
  const result = await plumberModal.create(user);
  return await result;
};

const plumberLogin = async (email) => {
  const result = await plumberModal.findOne({ email: email });
  return await result;
};

const viewPlumberProfile = async (id) => {
  const result = await plumberModal.findOne({ _id: id });
  return await result;
};

const updatePlumberProfile = async (user) => {
  const result = await plumberModal.updateOne({ _id: user.id }, { $set: user });
  return await result;
};
const viewAllPlumbersWithStatus = async (status) => {
  const result = await plumberModal.find({ status: status });
  return await result;
};
const viewAllPlumbers = async () => {
  const result = await plumberModal.find({'status':1});
  return await result;
};
const activePlumbers = async () => {
  const result = await plumberModal.find({'status':1}).count();
  return await result;
};

module.exports = {
  createPlumber,
  plumberLogin,
  viewPlumberProfile,
  updatePlumberProfile,
  viewAllPlumbersWithStatus,
  viewAllPlumbers,
  activePlumbers
};
