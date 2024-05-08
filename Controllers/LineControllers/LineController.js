require("../../Database/dbConfig");
const lineModal = require("../../Models/LineModals/LineModal");

const addNewLine = async (line) => {
  console.log(line);
  const result = await lineModal.create(line);
  return result;
};
const viewSinglePropertyLines = async (propertyId) => {
  const result = await lineModal
    .find({ propertyId: propertyId })
    .populate([{ path: "propertyId" }]);
  return result;
};
const lineDetail = async (lineId) => {
  const result = await lineModal
    .findOne({ _id: lineId })
    .populate([{ path: "propertyId" }]);
  return result;
};
const viewPropertyOwnerLines = async (propertyOwnerId) => {
  const result = await lineModal.find().populate([
    {
      path: "propertyId",
      populate: {
        path: "propertyOwnerId",
        match: { _id: propertyOwnerId },
      },
    },
  ]);
  return result;
};
const viewPropertyOwnerLinesCount = async (propertyOwnerId) => {
  const result = await lineModal
    .find()
    .populate([
      {
        path: "propertyId",
        populate: {
          path: "propertyOwnerId",
          match: { _id: propertyOwnerId },
        },
      },
    ])
    .count();
  return result;
};

module.exports = {
  addNewLine,
  viewSinglePropertyLines,
  viewPropertyOwnerLines,
  lineDetail,
  viewPropertyOwnerLinesCount,
};
