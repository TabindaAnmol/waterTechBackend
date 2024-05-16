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
  const result = await plumberModal.updateOne(
    { _id: user._id },
    { $set: user }
  );
  return await result;
};
const viewAllPlumbers = async () => {
  const result = await plumberModal.find();
  return await result;
};

module.exports = {
  createPlumber,
  plumberLogin,
  viewPlumberProfile,
  updatePlumberProfile,
  viewAllPlumbers,
};
