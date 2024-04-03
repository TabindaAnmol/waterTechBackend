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

module.exports = {
  createPlumber,
  plumberLogin,
};
