require("../../Database/dbConfig");
const lineModal = require("../../Models/LineModals/LineModal");

const addNewLine = async (line) => {
  console.log(line);
  const result = await lineModal.create(line);
  return result;
};
const viewSinglePropertyLines = async (propertyId) => {
  const result = await lineModal.find({ propertyId: propertyId }).populate([{path:'propertyId'}]);
  return result;
};

module.exports = {
  addNewLine,
  viewSinglePropertyLines,
};
