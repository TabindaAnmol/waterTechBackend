require("../../Database/dbConfig");
const job = require("../../Models/JobModals/JobModal");
const jobModal = require("../../Models/JobModals/JobModal");

const createJob = async (job) => {
  console.log(job);
  const result = await jobModal.create(job);
  return result;
};
const viewSinglePropertyOwnerJobsWithStatus = async (
  propertyOwnerId,
  jobStatus
) => {
  const result = await jobModal.find({ jobStatus: jobStatus }).populate([
    {
      path: "lineId",
      populate: {
        path: "propertyId",
        populate: { path: "propertyOwnerId", match: { _id: propertyOwnerId } },
      },
    },
    { path: "plumberId" },
  ]);
  return result;
};
const viewJobDetail = async (jobId) => {
  const result = await orderModel.findOne({ _id: jobId }).populate([
    {
      path: "lineId",
      populate: {
        path: "propertyId",
        populate: { path: "propertyOwnerId" },
      },
    },
    { path: "plumberId" },
  ]);
  console.log(result);
  return result;
};

module.exports = {
  createJob,
  viewSinglePropertyOwnerJobsWithStatus,
  viewJobDetail,
};
