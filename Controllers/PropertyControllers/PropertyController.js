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
  const result = await propertyModal
    .find({ propertyOwnerId: propertyOwnerId })
    .count();
  return result;
};
const viewPropertiesWithStatus = async (status) => {
  const result = await propertyModal
    .find({ status: status })
    .populate(["lines", "propertyOwnerId"]);
  console.log(result);
  return result;
};
const viewPropertiesWithNewLine = async () => {
  // const result = await propertyModal.find({status:1,'lines': { $exists: true, $ne: [] }}) to check the empty array field
  // OR
  // .find({ status: 1, lines: { $exists: true, $not: { $size: 0 } } })
  const properties = await propertyModal.find({ status: 1 }).populate([
    {
      path: "lines",
      match: { solutions: [] },
    },
    { path: "propertyOwnerId" },
  ]);

  if (properties.length > 0) {
    const result = properties.filter((property) => property.lines.length > 0);
    console.log(result);
    return result;
  } else {
    return [];
  }
};
const viewPropertiesWithSolutionLine = async () => {
  const properties = await propertyModal.find({ status: 1 }).populate([
    {
      path: "lines",
      match: { solutions: { $ne: [] } },
    },
    { path: "propertyOwnerId" },
  ]);
  if (properties.length > 0) {
    const result = properties.filter((property) => property.lines.length > 0);
    console.log(result);
    return result;
  } else {
    return [];
  }
};
const updatePropertiesStatus = async (property) => {
  const result = await propertyModal.updateOne(
    { _id: property._id },
    { $set: property }
  );
  console.log(result);
  return result;
};

module.exports = {
  addProperty,
  viewSingleOwnerProperties,
  viewSinglePropertyDetail,
  viewSingleOwnerPropertiesWithStatus,
  viewSingleOwnerPropertiesCount,
  viewPropertiesWithStatus,
  updatePropertiesStatus,
  viewPropertiesWithNewLine,
  viewPropertiesWithSolutionLine,
};
