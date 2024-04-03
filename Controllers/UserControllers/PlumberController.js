const plumberModal = require("../../Models/UserModals/PlumberModal");
require("../../Database/dbConfig")

const createPlumber= async (request,response) => {
  console.log('jjjjjjjjjjjjjjjjjj')
  console.log(request.body)
  const result = await plumberModal.create(request.body);
  response.send(result)
};
module.exports = {
  createPlumber,
};
