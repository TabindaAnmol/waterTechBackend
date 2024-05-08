require("../../Database/dbConfig");
const propertyModal = require("../../Models/PropertyModals/PropertyModal");

const addProperty = async (property) => {
  console.log(property);
  const result = await propertyModal.create(property);
  return result;
};
const viewSingleOwnerProperties = async (propertyOwnerId) => {
  const result = await propertyModal
    .find({ propertyOwnerId: propertyOwnerId })
    .populate(["lines", "propertyOwnerId"]);
  console.log(result);
  return result;
};
const viewSingleOwnerPropertiesWithStatus = async (propertyOwnerId, status) => {
  const result = await propertyModal
    .find({ propertyOwnerId: propertyOwnerId, status: status })
    .populate(["lines", "propertyOwnerId"]);
  console.log(result);
  return result;
};
const viewSinglePropertyDetail = async (propertyId) => {
  const result = await propertyModal
    .findOne({ _id: propertyId })
    .populate(["lines", "propertyOwnerId"]);
  console.log(result);
  return result;
};
const viewSingleOwnerPropertiesCount = async (propertyOwnerId) => {
  const result = await propertyModal.find({ propertyOwnerId: propertyOwnerId })
    .count();
  return result;
};

module.exports = {
  addProperty,
  viewSingleOwnerProperties,
  viewSinglePropertyDetail,
  viewSingleOwnerPropertiesWithStatus,
  viewSingleOwnerPropertiesCount,
};
