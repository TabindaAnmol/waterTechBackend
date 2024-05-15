const references = require("../../References/customReferences");
const app = references.express();
const formdata = references.formdata.none();
const jobController = require("../../Controllers/JobControllers/JobController");
const notificationsController = require("../../Controllers/NotificationControllers/NotificationsController");
const imageUpload = require("../../Middlewares/imageUpload");
app.use(references.cors());

app.post("/postJob", formdata, async (req, res) => {
  console.log(req.body);
  const { lineId, plumberId, date, time, jobInstructions } = { ...req.body };
  console.log(lineId, plumberId, date, time);
  const newJob = await jobController.createJob(req.body);
  console.log(newJob);
  if (newJob) {
    // Send a notification
    const plumberNofication =
      await notificationsController.createPlumberNotification({
        title: "New Job Assigned",
        message: `A new job has been assigned to you on ${newJob.date} at ${newJob.time}.`,
        plumberId: newJob.plumberId,
      });

    res.send({ added: true, newJob: newJob });
  } else {
    res.send({ added: false });
  }
});
app.post("/jobDetail", formdata, async (req, res) => {
  console.log(req.body);
  const { jobId } = req.body;
  const jobDetail = await jobController.viewJobDetail(jobId);
  console.log("..................................");
  console.log(jobDetail);
  console.log("..................................");

  if (jobDetail) {
    res.send({ match: true, jobDetail: jobDetail });
  } else {
    res.send({ match: false });
  }
});
app.post("/singlePropertyOwnerJobsWithStatus", formdata, async (req, res) => {
  console.log(req.body);
  const { propertyOwnerId, jobStatus } = req.body;
  const jobs = await jobController.viewSinglePropertyOwnerJobsWithStatus(
    propertyOwnerId,
    jobStatus
  );
  if (jobs.length > 0) {
    res.send({ match: true, jobs: jobs });
  } else {
    res.send({ match: false, jobs: [] });
  }
});
app.post("/singlePlumberJobsWithStatus", formdata, async (req, res) => {
  console.log(req.body);
  const { plumberId, jobStatus } = req.body;
  const jobs = await jobController.viewSinglePlumberJobsWithStatus(
    plumberId,
    jobStatus
  );
  if (jobs.length > 0) {
    res.send({ match: true, jobs: jobs });
  } else {
    res.send({ match: false, jobs: [] });
  }
});
app.post("/allJobsWithStatus", formdata, async (req, res) => {
  console.log(req.body);
  const {jobStatus } = req.body;
  const jobs = await jobController.viewAllJobsWithStatus(
    jobStatus
  );
  if (jobs.length > 0) {
    res.send({ match: true, jobs: jobs });
  } else {
    res.send({ match: false, jobs: [] });
  }
});
app.post("/updateJobStatus", formdata, async (req, res) => {
  console.log(req.body);
  const { jobId, jobStatus } = req.body;
  const updated = await jobController.updateJobStatus(jobId, jobStatus);
  const jobDetail = await jobController.viewJobDetail(jobId);
  if (updated == 1) {
    // Send a notification
    if (jobStatus == "accepted") {
      const jobAcceptedNofication =
        await notificationsController.createPropertyOwnerNotification({
          title: "Job Accepted",
          message: `Your Job with ID ${jobId} has been accepted by the Plumber`,
          propertyOwnerId: jobDetail.lineId.propertyId.propertyOwnerId,
        });
    }
    if (jobStatus == "cancelled") {
      const jobCancelledNofication =
        await notificationsController.createPlumberNotification({
          title: "Job Cancelled",
          message: "Your Job has been cancelled by the customer",
          plumberId: jobDetail.plumberId,
        });
    }
    if (jobStatus == "rejected") {
      const jobRejectedNotification =
        await notificationsController.createPropertyOwnerNotification({
          title: "Job Rejection",
          message: `The Plumber ${jobDetail.plumberId.name} has rejected your Job request for ${jobDetail.lineId.propertyId.address}.`,
          propertyOwnerId: jobDetail.lineId.propertyId.propertyOwnerId,
        });
    }

    res.send({ updated: true });
  } else {
    res.send({ updated: false });
  }
});
app.post("/propertyOwnerJobStats", formdata, async (req, res) => {
  console.log("/////////////////////propertyOwnerJobStats");
  console.log(req.body);
  const { propertyOwnerId } = req.body;
  console.log(propertyOwnerId);
  const stats = await jobController.propertyOwnerJobStats(propertyOwnerId);
  res.send(stats);
});
app.post("/plumberJobStats", formdata, async (req, res) => {
  console.log("/////////////////////propertyOwnerJobStats");
  console.log(req.body);
  const { plumberId } = req.body;
  const stats = await jobController.plumberJobStats(plumberId);
  res.send(stats);
});

app.post("/uploadJobNotes",imageUpload("JobImages").array("jobImages"),async (req, res) => {
    const { jobId } = req.body;
    var jobImages = [];
    req.files.map((item, index) => {
      jobImages.push("/JobImages/" + item.filename);
    });
    const updatedJobResult = await jobController.updateJobNotes({
      _id:jobId,
      jobImages:jobImages,
      jobStatus: "requesedToComplete",
    });
    console.log(updatedJobResult);
    if (updatedJobResult == 1) {
      res.send({ updated: true });
    } else {
      res.send({ updated: false });
    }
  }
);

module.exports = app;
