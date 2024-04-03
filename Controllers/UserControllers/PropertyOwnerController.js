require("../../Database/dbConfig");
const propertyOwnerModal = require("../../Models/UserModals/PropertyOwnerModal");

const createPropertyOwner = async (user) => {
  console.log(user);
  const result = await propertyOwnerModal.create(user);
  return result;
};
const isPropertyOwnerLoggedin = async (user) => {
  console.log(user);
  const propertyOwner = await propertyOwnerModal.findOne(user);
  return propertyOwner;
};
module.exports = {
  createPropertyOwner,
  isPropertyOwnerLoggedin,
};
