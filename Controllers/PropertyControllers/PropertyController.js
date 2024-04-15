require("../../Database/dbConfig");
const propertyModal = require("../../Models/PropertyModals/PropertyModal");

const addProperty = async (property) => {
  console.log(user);
  const result = await propertyModal.create(property);
  return result;
};

 
module.exports = {
    addProperty
};
