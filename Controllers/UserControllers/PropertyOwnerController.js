require("../../Database/dbConfig");
const propertyOwnerModal = require("../../Models/UserModals/PropertyOwnerModal");

const createPropertyOwner = async (user) => {
  console.log(user);
  const result = await propertyOwnerModal.create(user);
  return result;
};
const isPropertyOwnerLoggedin = async (user) => {
  console.log(user);
  const propertyOwner = await propertyOwnerModal
    .findOne(user)
    .populate(["properties"]);
  return propertyOwner;
};
const viewPropertyOwnerProfile = async (propertyOwnerId) => {
  const result = await propertyOwnerModal
    .findOne({ _id: propertyOwnerId })
    .populate(["properties"]);
  return result;
};
const updatePropertyOwnerProfile = async (updatedUser) => {
  const result = await propertyOwnerModal.updateOne(
    { _id: updatedUser._id },
    { $set: updatedUser }
  );
  console.log(result);
  console.log(result.acknowledged);
  console.log(result.modifiedCount);
  return result.modifiedCount;
};
const viewAllPropertyOwnerWithStatus = async (status) => {
  const result = await propertyOwnerModal.find({ status: status });
  return await result;
};
module.exports = {
  createPropertyOwner,
  isPropertyOwnerLoggedin,
  viewPropertyOwnerProfile,
  updatePropertyOwnerProfile,
  viewAllPropertyOwnerWithStatus,
};
