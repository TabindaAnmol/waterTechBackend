const adminModal = require("../../Models/UserModals/AdminModal");
require("../../Database/dbConfig");

const createAdmin = async (user) => {
  const result = await adminModal.create(user);
  return await result;
};

const login = async (email) => {
  const result = await adminModal.findOne({ email: email });
  return await result;
};

const updateAdminProfile = async (admin) => {
const result = await adminModal.updateOne({ _id: admin._id }, { $set: admin });
console.log(result);
console.log(result.acknowledged);
console.log(result.modifiedCount);
  return await result.modifiedCount;
};


module.exports = {
  createAdmin,
  login,
  updateAdminProfile,
};
