const adminModal = require("../../Models/UserModals/AdminModal");
require("../../Database/dbConfig");

// const createAdmin = async (user) => {
//   const result = await plumberModal.create(user);
//   return await result;
// };

const login = async (email) => {
  const result = await adminModal.findOne({ email: email });
  return await result;
};

// const viewPlumberProfile = async (id) => {
//   const result = await plumberModal.findOne({ '_id': id });
//   return await result;
// };

// const updatePlumberProfile = async (user) => {
//   const result = await plumberModal.updateOne(user);
//   return await result;
// };
// const viewAllPlumbers = async () => {
//   const result = await plumberModal.find();
//   return await result;
// };


module.exports = {
  // createPlumber,
  login,
  // viewPlumberProfile,
  // updatePlumberProfile,
  // viewAllPlumbers,
};
