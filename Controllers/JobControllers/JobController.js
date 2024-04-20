require("../../Database/dbConfig");
const job = require("../../Models/JobModals/JobModal");
const jobModal = require("../../Models/JobModals/JobModal");

const createJob = async (line) => {
  console.log(line);
  const result = await jobModal.create(line);
  return result;
};
const viewSinglePropertyOwnerJobsWithStatus = async (propertyId) => {
  const result = await jobModal.find({ propertyId: propertyId });
  return result;
};

module.exports = {
  createJob,
  viewSinglePropertyOwnerJobsWithStatus,
};
