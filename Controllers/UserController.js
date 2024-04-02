const userModel = require("../Models/UserModel");
require("../Database/dbConfig")

const createUser= async (user) => {
  const result = await userModel.create(user);
  return result;
};
module.exports = {
  createUser:createUser,
};
