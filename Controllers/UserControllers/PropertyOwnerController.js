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
const viewPropertyOwnerProfile = async (propertyOwnerId) => {
  const result = await propertyOwnerModal.findOne({ _id: propertyOwnerId })
  return result;
};
const updatePropertyOwnerProfile = async (updatedUser) => {
  const result = await propertyOwnerModal.updateOne(
    { _id: updatedUser.id },
    { $set: updatedUser }
  );
  console.log(result);
  console.log(result.acknowledged);
  console.log(result.modifiedCount);
  return result.modifiedCount;
};
module.exports = {
  createPropertyOwner,
  isPropertyOwnerLoggedin,
  viewPropertyOwnerProfile,
  updatePropertyOwnerProfile,
};
