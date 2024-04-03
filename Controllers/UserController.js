const userModel = require("../Models/UserModel");
require("../Database/dbConfig")

const createUser= async (request,response) => {
  console.log('jjjjjjjjjjjjjjjjjj')
  console.log(request.body)
  const result = await userModel.create(request.body);
  response.send(result)
};
module.exports = {
  createUser:createUser,
};
