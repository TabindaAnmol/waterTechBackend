require("../../Database/dbConfig");
const jobModal = require("../../Models/JobModals/JobModal");

const createJob = async (job) => {
  console.log(job);
  const result = await jobModal.create(job);
  return result;
};
const viewJobDetail = async (jobId) => {
  const result = await jobModal.findOne({ _id: jobId }).populate([
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
const updateJobStatus = async (jobId, jobStatus) => {
  const result = await jobModal.updateOne(
    { _id: jobId },
    { $set: { jobStatus: jobStatus } }
  );
  console.log(result.modifiedCount);
  if (result.modifiedCount == 1) {
    return result.modifiedCount;
  } else {
    return 0;
  }
};
const propertyOwnerJobStats = async (propertyOwnerId) => {
  const jobs = await jobModal
    .find({ jobStatus: { $in: ["requested","accepted","completed","cancelled"] } })
    .populate([
      {
        path: "lineId",
        populate: {
          path: "propertyId",
          populate: { path: "propertyOwnerId", match: { _id: propertyOwnerId } },
        },
      }
    ]);

  console.log(jobs);
  const groupedStats = jobs.reduce((acc, job) => {
    if (job.lineId) {
      const status = job.jobStatus;
      acc[status] = (acc[status] || 0) + 1;
    }
    return acc;
  }, {});
  console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
  console.log(groupedStats);
  const result = {
    acceptedOrders: groupedStats.requested || 0,
    acceptedOrders: groupedStats.accepted || 0,
    completedOrders: groupedStats.completed || 0,
    cancelledOrders: groupedStats.cancelled || 0,
  };
  console.log(result);

  return result;
};
const plumberJobStats = async (plumberId) => {
  const jobs = await jobModal
    .find({ jobStatus: { $in: ["requested","accepted","completed","cancelled"] } , plumberId : plumberId})

  console.log(jobs);
  const groupedStats = jobs.reduce((acc, job) => {
    if (job.lineId) {
      const status = job.jobStatus;
      acc[status] = (acc[status] || 0) + 1;
    }
    return acc;
  }, {});
  console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
  console.log(groupedStats);
  const result = {
    acceptedOrders: groupedStats.requested || 0,
    acceptedOrders: groupedStats.accepted || 0,
    completedOrders: groupedStats.completed || 0,
    cancelledOrders: groupedStats.cancelled || 0,
  };
  console.log(result);

  return result;
};


module.exports = {
  createJob,
  viewJobDetail,
  viewSinglePropertyOwnerJobsWithStatus,
  updateJobStatus,
  propertyOwnerJobStats,
  plumberJobStats,
};
